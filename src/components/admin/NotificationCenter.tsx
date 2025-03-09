'use client';

import { useState, useEffect } from 'react';

interface Notification {
  id: string;
  type: string;
  message: string;
  time: Date;
  read: boolean;
}

export default function NotificationCenter() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    // Connect to the server-sent events endpoint
    const eventSource = new EventSource('/api/notifications/subscribe');
    
    eventSource.onopen = () => {
      setConnected(true);
    };
    
    eventSource.onerror = () => {
      setConnected(false);
    };
    
    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        
        if (data.type === 'CONNECTED') {
          setConnected(true);
          return;
        }
        
        let message = '';
        
        if (data.type === 'NEW_INQUIRY') {
          message = `New inquiry from ${data.data.name} for ${data.data.course}`;
          // Play notification sound
          const audio = new Audio('/notification.mp3');
          audio.play().catch(e => console.log('Audio play failed:', e));
          
          // Show browser notification if supported
          if ('Notification' in window && Notification.permission === 'granted') {
            new Notification('New Inquiry', {
              body: message,
              icon: '/favicon.ico'
            });
          }
        } else if (data.type === 'STATUS_UPDATED') {
          message = `Inquiry from ${data.data.name} status updated to ${data.data.status}`;
        }
        
        if (message) {
          const newNotification: Notification = {
            id: Date.now().toString(),
            type: data.type,
            message,
            time: new Date(),
            read: false
          };
          
          setNotifications(prev => [newNotification, ...prev].slice(0, 50));
          setUnreadCount(prev => prev + 1);
        }
      } catch (error) {
        console.error('Error parsing notification:', error);
      }
    };
    
    // Request notification permission
    if ('Notification' in window && Notification.permission !== 'denied') {
      Notification.requestPermission();
    }
    
    return () => {
      eventSource.close();
    };
  }, []);
  
  const toggleNotifications = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      // Mark all as read when opening
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
      setUnreadCount(0);
    }
  };
  
  const clearNotifications = () => {
    setNotifications([]);
    setUnreadCount(0);
  };
  
  return (
    <div className="relative">
      <button 
        className="relative p-2 text-gray-600 hover:text-primary transition-colors"
        onClick={toggleNotifications}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg z-50 overflow-hidden">
          <div className="p-3 bg-gray-100 border-b flex justify-between items-center">
            <h3 className="font-medium">Notifications</h3>
            <div className="flex items-center space-x-2">
              <span className={`w-2 h-2 rounded-full ${connected ? 'bg-green-500' : 'bg-red-500'}`}></span>
              <button 
                onClick={clearNotifications}
                className="text-xs text-gray-500 hover:text-gray-700"
              >
                Clear All
              </button>
            </div>
          </div>
          
          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                No notifications
              </div>
            ) : (
              <ul>
                {notifications.map(notification => (
                  <li 
                    key={notification.id} 
                    className={`p-3 border-b hover:bg-gray-50 ${notification.read ? '' : 'bg-blue-50'}`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm">{notification.message}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(notification.time).toLocaleTimeString()}
                        </p>
                      </div>
                      {!notification.read && (
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
} 