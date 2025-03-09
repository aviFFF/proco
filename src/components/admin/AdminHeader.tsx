'use client';

import NotificationCenter from './NotificationCenter';

interface AdminHeaderProps {
  activeTab: 'inquiries' | 'courses';
  setActiveTab: (tab: 'inquiries' | 'courses') => void;
  onLogout: () => void;
}

export default function AdminHeader({ activeTab, setActiveTab, onLogout }: AdminHeaderProps) {
  return (
    <header className="bg-dark text-white sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold">ProCo Admin</h1>
          </div>
          
          <div className="flex items-center space-x-6">
            <nav className="flex space-x-6">
              <button 
                onClick={() => setActiveTab('inquiries')}
                className={`${activeTab === 'inquiries' ? 'text-primary font-medium' : 'text-white'} hover:text-primary transition-colors`}
              >
                Inquiries
              </button>
              <button 
                onClick={() => setActiveTab('courses')}
                className={`${activeTab === 'courses' ? 'text-primary font-medium' : 'text-white'} hover:text-primary transition-colors`}
              >
                Courses
              </button>
            </nav>
            
            <div className="flex items-center space-x-4">
              <NotificationCenter />
              
              <button 
                onClick={onLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
} 