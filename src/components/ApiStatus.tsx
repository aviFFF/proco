'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

interface ApiStatusData {
  status: string;
  mongodb: 'connected' | 'disconnected';
  mode: 'mongodb' | 'demo';
}

export default function ApiStatus() {
  const [status, setStatus] = useState<'loading' | 'online' | 'offline'>('loading');
  const [statusData, setStatusData] = useState<ApiStatusData | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const checkApiStatus = async () => {
      try {
        const response = await axios.get('/api/health');
        if (response.status === 200) {
          setStatus('online');
          setStatusData(response.data);
          setRetryCount(0); // Reset retry count on success
        } else {
          setStatus('offline');
        }
      } catch (error) {
        console.error('API status check failed:', error);
        setStatus('offline');
        
        // Increment retry count
        setRetryCount(prev => prev + 1);
      }
    };

    checkApiStatus();
    
    // Check status every 30 seconds, or more frequently if we're having connection issues
    const interval = setInterval(
      checkApiStatus, 
      retryCount > 3 ? 5000 : 30000 // Check more frequently if we've had multiple failures
    );
    
    return () => clearInterval(interval);
  }, [retryCount]);

  return (
    <div className="fixed bottom-4 right-4 z-50 group">
      <div className="bg-white rounded-full shadow-md px-4 py-2 flex items-center cursor-pointer">
        <span className="text-sm mr-2">API:</span>
        {status === 'loading' && (
          <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
        )}
        {status === 'online' && (
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        )}
        {status === 'offline' && (
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
        )}
        
        {/* Tooltip with more details */}
        <div className="absolute bottom-full right-0 mb-2 w-48 bg-white rounded-md shadow-lg p-3 text-sm opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
          <p className="font-medium mb-1">API Status: {status}</p>
          {statusData ? (
            <>
              <p className="flex items-center">
                <span className="mr-2">MongoDB:</span>
                {statusData.mongodb === 'connected' ? (
                  <span className="text-green-500 flex items-center">
                    <span className="w-2 h-2 rounded-full bg-green-500 mr-1"></span>
                    Connected
                  </span>
                ) : (
                  <span className="text-red-500 flex items-center">
                    <span className="w-2 h-2 rounded-full bg-red-500 mr-1"></span>
                    Disconnected
                  </span>
                )}
              </p>
              <p className="mt-1">Mode: {statusData.mode === 'mongodb' ? 'MongoDB' : 'Demo'}</p>
            </>
          ) : (
            <p className="text-red-500">
              {retryCount > 0 ? `Connection failed (retry ${retryCount})` : 'No connection to API'}
            </p>
          )}
        </div>
      </div>
    </div>
  );
} 