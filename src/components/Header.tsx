'use client';

import { useState } from 'react';

interface HeaderProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export default function Header({ activeSection, setActiveSection }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'courses', label: 'Courses' },
    { id: 'about', label: 'About Us' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <header className="bg-gray-500 text-white sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            {/* Tech-themed SVG Logo */}
            <div className="flex items-center">
              <svg 
                width="48" 
                height="48" 
                viewBox="0 0 48 48" 
                className="mr-3"
              >
                {/* Background hexagon - representing a code block */}
                <polygon 
                  points="24,4 44,14 44,34 24,44 4,34 4,14" 
                  fill="#4F46E5" 
                  stroke="#ffffff" 
                  strokeWidth="1.5"
                />
                
                {/* Code brackets */}
                <path 
                  d="M16,16 L12,24 L16,32" 
                  stroke="white" 
                  strokeWidth="2.5" 
                  fill="none" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
                <path 
                  d="M32,16 L36,24 L32,32" 
                  stroke="white" 
                  strokeWidth="2.5" 
                  fill="none" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
                
                {/* Slash for coding */}
                <path 
                  d="M28,14 L20,34" 
                  stroke="white" 
                  strokeWidth="2.5" 
                  fill="none" 
                  strokeLinecap="round"
                />
              </svg>
              
              {/* Updated font style for the text logo */}
              <div className="font-inter tracking-tighter">
                <span className="text-3xl border border-white font-extrabold">
                  <span className="text-primary bg-white px-1 ">PRO</span>
                  <span className="text-white mx-1">CO</span>
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            {navItems.map((item) => (
              <button 
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`${activeSection === item.id ? 'text-primary font-medium' : 'text-white'} hover:text-primary transition-colors`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white focus:outline-none"
            onClick={toggleMobileMenu}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 space-y-3">
            {navItems.map((item) => (
              <button 
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`${activeSection === item.id ? 'text-primary font-medium' : 'text-white'} block w-full text-left hover:text-primary transition-colors`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
