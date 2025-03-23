'use client';

import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import AdminHeader from '@/components/admin/AdminHeader';
import InquiriesTable from '@/components/admin/InquiriesTable';
import CoursesTable from '@/components/admin/CoursesTable';
import PortfolioAdmin from './_components/Admin-Portfolio';

interface Inquiry {
  _id: string;
  name: string;
  email: string;
  phone: string;
  course: string;
  message: string;
  status: 'new' | 'pending' | 'completed';
  createdAt: string;
  updatedAt: string;
}

interface Course {
  id: number;
  title: string;
  description: string;
  icon: string;
  features: string[];
}

const navItems = [
  { id: 'inquiries', label: 'Inquiries' },
  { id: 'courses', label: 'Courses' },
  { id: 'portfolio', label: 'Portfolio' }, // Portfolio tab
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'inquiries' | 'courses' | 'portfolio'>('inquiries');
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [apiConnected, setApiConnected] = useState(false);
  const router = useRouter();

  // Simple authentication for demo purposes
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Demo password is "admin123"
    if (password === 'MyAdminPassword') {
      setIsAuthenticated(true);
      localStorage.setItem('admin-authenticated', 'true');
    } else {
      setError('Invalid password');
    }
  };

  // Check API connection
  const checkApiConnection = useCallback(async () => {
    try {
      await axios.get('/api/health');
      setApiConnected(true);
      return true;
    } catch (err) {
      console.error('API connection check failed:', err);
      setApiConnected(false);
      return false;
    }
  }, []);

  // Fetch inquiries function (memoized with useCallback)
  const fetchInquiries = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('/api/inquiries');
      setInquiries(response.data.data);
      setLastUpdate(new Date());
      setError(null);
      setApiConnected(true);
    } catch (err) {
      console.error('Error fetching inquiries:', err);
      setError('Failed to load inquiries. Please check your connection and try again.');
      setApiConnected(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch courses function
  const fetchCourses = useCallback(async () => {
    try {
      const response = await axios.get('/api/courses');
      setCourses(response.data.data);
      setApiConnected(true);
    } catch (err) {
      console.error('Error fetching courses:', err);
      setApiConnected(false);
    }
  }, []);

  useEffect(() => {
    // Check if user is already authenticated
    const auth = localStorage.getItem('admin-authenticated');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return;

    // Check API connection first
    checkApiConnection().then(connected => {
      if (connected) {
        // Initial data fetch
        fetchInquiries();
        fetchCourses();

        // Set up SSE for real-time updates
        let eventSource: EventSource | null = null;
        try {
          eventSource = new EventSource('/api/notifications/subscribe');
          
          eventSource.onopen = () => {
            console.log('SSE connection established');
            setApiConnected(true);
          };
          
          eventSource.onmessage = (event) => {
            try {
              const data = JSON.parse(event.data);
              
              if (data.type === 'CONNECTED') {
                console.log('Connected to SSE stream');
                setApiConnected(true);
                return;
              }
              
              // Handle new inquiry
              if (data.type === 'NEW_INQUIRY') {
                setInquiries(prevInquiries => {
                  // Check if this inquiry already exists
                  const exists = prevInquiries.some(inquiry => inquiry._id === data.data._id);
                  if (exists) return prevInquiries;
                  
                  // Add the new inquiry at the beginning of the array
                  return [data.data, ...prevInquiries];
                });
                setLastUpdate(new Date());
              }
              
              // Handle status update
              if (data.type === 'STATUS_UPDATED') {
                setInquiries(prevInquiries => 
                  prevInquiries.map(inquiry => 
                    inquiry._id === data.data._id ? data.data : inquiry
                  )
                );
                setLastUpdate(new Date());
              }
              
              // Handle deleted inquiry
              if (data.type === 'INQUIRY_DELETED') {
                setInquiries(prevInquiries => 
                  prevInquiries.filter(inquiry => inquiry._id !== data.data._id)
                );
                setLastUpdate(new Date());
              }
            } catch (error) {
              console.error('Error handling SSE message:', error);
            }
          };
          
          eventSource.onerror = (err) => {
            console.error('SSE connection error:', err);
            setApiConnected(false);
            
            // Close the connection and try to reconnect after a delay
            if (eventSource) {
              eventSource.close();
              setTimeout(() => {
                checkApiConnection();
              }, 5000);
            }
          };
        } catch (error) {
          console.error('Error setting up SSE:', error);
          setApiConnected(false);
        }
        
        // Set up polling as a fallback
        const intervalId = setInterval(() => {
          checkApiConnection().then(connected => {
            if (connected) {
              fetchInquiries();
            }
          });
        }, 30000); // Poll every 30 seconds
        
        return () => {
          if (eventSource) {
            eventSource.close();
          }
          clearInterval(intervalId);
        };
      } else {
        // If API is not connected, set up polling to check connection
        const intervalId = setInterval(() => {
          checkApiConnection().then(connected => {
            if (connected) {
              fetchInquiries();
              fetchCourses();
            }
          });
        }, 5000); // Check every 5 seconds
        
        return () => clearInterval(intervalId);
      }
    });
  }, [isAuthenticated, fetchInquiries, fetchCourses, checkApiConnection]);

  const handleStatusChange = async (id: string, status: 'new' | 'pending' | 'completed') => {
    try {
      const response = await axios.patch(`/api/inquiries/${id}/status`, { status });
      
      // Update the inquiry in the local state (this will be overridden by SSE if it's working)
      setInquiries(prevInquiries => 
        prevInquiries.map(inquiry => 
          inquiry._id === id ? { ...inquiry, ...response.data.data } : inquiry
        )
      );
      
      setApiConnected(true);
      return response.data;
    } catch (err) {
      console.error('Error updating inquiry status:', err);
      setError('Failed to update inquiry status. Please try again later.');
      setApiConnected(false);
      throw err;
    }
  };

  const handleDeleteInquiry = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this inquiry?')) {
      try {
        await axios.delete(`/api/inquiries/${id}`);
        
        // Update the local state (this will be overridden by SSE if it's working)
        setInquiries(prevInquiries => prevInquiries.filter(inquiry => inquiry._id !== id));
        setApiConnected(true);
      } catch (err) {
        console.error('Error deleting inquiry:', err);
        setError('Failed to delete inquiry. Please try again later.');
        setApiConnected(false);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin-authenticated');
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold text-center mb-6">Admin Login</h1>
          
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-md mb-4">
              {error}
            </div>
          )}
          
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter admin password"
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
            >
              Login
            </button>
          </form>
          
          <div className="mt-4 text-center text-sm text-gray-500">
            <p>Demo password: "admin123"</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminHeader activeTab={activeTab} setActiveTab={setActiveTab} onLogout={handleLogout} />
      
      <main className="container mx-auto px-4 py-8">
        {!apiConnected && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  Connection to API server lost. Trying to reconnect... Data may not be up to date.
                </p>
              </div>
            </div>
          </div>
        )}
        
        <div className="bg-white rounded-lg shadow-md p-6">
          {activeTab === 'inquiries' && (
            <>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Student Inquiries</h2>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <span className="flex items-center">
                      <span className="w-3 h-3 rounded-full bg-blue-500 mr-1"></span>
                      New: {inquiries.filter(i => i.status === 'new').length}
                    </span>
                    <span className="flex items-center">
                      <span className="w-3 h-3 rounded-full bg-yellow-500 mr-1"></span>
                      Pending: {inquiries.filter(i => i.status === 'pending').length}
                    </span>
                    <span className="flex items-center">
                      <span className="w-3 h-3 rounded-full bg-green-500 mr-1"></span>
                      Completed: {inquiries.filter(i => i.status === 'completed').length}
                    </span>
                  </div>
                  <div className="text-xs text-gray-400">
                    Last updated: {lastUpdate.toLocaleTimeString()}
                  </div>
                </div>
              </div>
              
              {isLoading ? (
                <div className="text-center py-8">
                  <div className="inline-block w-8 h-8 border-4 border-gray-200 border-t-primary rounded-full animate-spin"></div>
                  <p className="mt-2 text-gray-600">Loading inquiries...</p>
                </div>
              ) : error ? (
                <div className="text-center py-8 text-red-500">
                  <p>{error}</p>
                  <button 
                    onClick={fetchInquiries}
                    className="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-blue-600 transition-colors"
                  >
                    Try Again
                  </button>
                </div>
              ) : inquiries.length > 0 ? (
                <InquiriesTable 
                  inquiries={inquiries} 
                  onStatusChange={handleStatusChange}
                  onDelete={handleDeleteInquiry} 
                />
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No inquiries found.
                </div>
              )}
            </>
          )}
          
          {activeTab === 'courses' && (
            <>
              <h2 className="text-2xl font-bold mb-6">Courses</h2>
              {courses.length > 0 ? (
                <CoursesTable courses={courses} />
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No courses found.
                </div>
              )}
            </>
          )}

          {activeTab === 'portfolio' && <PortfolioAdmin />}
        </div>
      </main>
      
    </div>
  );
}