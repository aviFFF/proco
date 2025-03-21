'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const BrandPopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Show popup after a short delay when the page loads
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const closePopup = () => {
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 p-4">
      <div className="relative bg-white rounded-lg shadow-xl p-4 sm:p-6 max-w-4xl w-full mx-auto animate-fadeIn overflow-y-auto max-h-[90vh]">
        <button 
          onClick={closePopup}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
          aria-label="Close popup"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <h2 className="text-xl sm:text-2xl font-bold text-center mb-4 sm:mb-6 text-blue-600">Welcome to Proco</h2>
        
        <div className="flex flex-col md:flex-row gap-4 sm:gap-6 items-center justify-center">
          <div className="flex-1 flex flex-col items-center w-full">
            <div className="relative w-48 h-48 sm:w-64 sm:h-64">
              <Image 
                src="/proco-software-solutions.jpg" 
                alt="Proco Software Solutions" 
                fill
                style={{ objectFit: 'contain' }}
                sizes="(max-width: 640px) 12rem, 16rem"
              />
            </div>
            <h3 className="mt-3 sm:mt-4 text-lg sm:text-xl font-semibold text-center">Proco Software Solutions</h3>
            <p className="text-center text-gray-600 mt-1 sm:mt-2 text-sm sm:text-base">Custom software development services</p>
          </div>
          
          <div className="flex-1 flex flex-col items-center w-full mt-4 md:mt-0">
            <div className="relative w-48 h-48 sm:w-64 sm:h-64">
              <Image 
                src="/proco-learning-solutions.jpg" 
                alt="Proco Learning Solutions" 
                fill
                style={{ objectFit: 'contain' }}
                sizes="(max-width: 640px) 12rem, 16rem"
              />
            </div>
            <h3 className="mt-3 sm:mt-4 text-lg sm:text-xl font-semibold text-center">Proco Learning Solutions</h3>
            <p className="text-center text-gray-600 mt-1 sm:mt-2 text-sm sm:text-base">Professional tech education and training</p>
          </div>
        </div>
        
        <div className="mt-6 sm:mt-8 text-center">
          <button 
            onClick={closePopup}
            className="px-4 sm:px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm sm:text-base"
          >
            Continue to Website
          </button>
        </div>
      </div>
    </div>
  );
};

export default BrandPopup;
