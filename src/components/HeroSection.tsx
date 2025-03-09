'use client';

import { useState } from 'react';

export default function HeroSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  
  return (
    <section className="relative bg-dark text-white py-20 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-secondary rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-12 md:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Build Your <span className="text-primary">Tech Career</span> With ProCo
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8">
              Master in-demand skills with our industry-focused courses designed to prepare you for the modern tech industry.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="btn btn-primary">
                Explore Courses
              </button>
              <button 
                className="flex items-center text-white hover:text-primary transition-colors"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                <span className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-white mr-3">
                  {isPlaying ? (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <rect x="6" y="4" width="4" height="16" rx="1" />
                      <rect x="14" y="4" width="4" height="16" rx="1" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  )}
                </span>
                Watch Our Story
              </button>
            </div>
            
            <div className="mt-12 flex items-center">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-dark bg-gray-200 flex items-center justify-center overflow-hidden">
                    <span className="text-dark font-bold text-xs">S{i}</span>
                  </div>
                ))}
              </div>
              <div className="ml-4">
                <p className="font-medium">Join 2,000+ students</p>
                <div className="flex text-yellow-400 text-sm mt-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <svg key={i} className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                  <span className="text-gray-300 ml-1">5.0 (300+ reviews)</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="md:w-1/2 md:pl-12">
            <div className="relative">
              <div className="bg-white p-2 rounded-lg shadow-xl">
                <div className="aspect-video bg-gray-200 rounded overflow-hidden relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <img 
                      src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80" 
                      alt="Students learning" 
                      className="w-full h-full object-cover"
                    />
                    {!isPlaying && (
                      <button 
                        className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40"
                        onClick={() => setIsPlaying(true)}
                      >
                        <span className="w-16 h-16 rounded-full bg-primary flex items-center justify-center">
                          <svg className="w-6 h-6 ml-1 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Stats card */}
              <div className="absolute -bottom-10 -left-10 bg-white rounded-lg shadow-lg p-4 w-40">
                <div className="text-center">
                  <p className="text-gray-600 text-sm">Success Rate</p>
                  <p className="text-3xl font-bold text-primary">95%</p>
                  <div className="w-full bg-gray-200 h-2 rounded-full mt-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: '95%' }}></div>
                  </div>
                </div>
              </div>
              
              {/* Experience card */}
              <div className="absolute -top-8 -right-8 bg-white rounded-lg shadow-lg p-4">
                <div className="flex items-center">
                  <div className="bg-blue-100 p-2 rounded-lg mr-3">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-600 text-xs">Experience</p>
                    <p className="font-bold">10+ Years</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 