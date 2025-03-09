'use client';

export default function MernSection() {
  const features = [
    'MongoDB Database Design and Operations',
    'Express.js Server and API Development',
    'React.js Frontend with Hooks and Context API',
    'Node.js Backend Development',
    'Authentication and Authorization',
    'Deployment and DevOps Basics'
  ];

  return (
    <section id="mern" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-blue-200 rounded-lg opacity-50"></div>
              <div className="relative z-10 bg-white p-6 rounded-lg shadow-lg">
                <div className="text-5xl mb-6">🌐</div>
                <h2 className="text-3xl font-bold mb-4 text-dark">MERN Stack Development</h2>
                <p className="text-gray-600 mb-6">
                  Become a full-stack developer with MongoDB, Express, React, and Node.js. Learn to build complete web applications from database to frontend.
                </p>
                <div className="mb-6">
                  <div className="flex items-center mb-2">
                    <svg className="w-5 h-5 text-yellow-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="font-medium">4.9/5</span>
                    <span className="text-gray-500 ml-2">(150+ reviews)</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>16 weeks (128 hours)</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Full-Stack</span>
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">JavaScript</span>
                  <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">Advanced</span>
                </div>
                <button className="btn btn-primary">Enroll Now</button>
              </div>
            </div>
          </div>
          
          <div className="md:w-1/2">
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
              <h3 className="text-2xl font-bold mb-4 text-dark">Stack Components</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center mb-2">
                    <span className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white font-bold mr-2">M</span>
                    <h4 className="font-bold">MongoDB</h4>
                  </div>
                  <p className="text-sm text-gray-600">NoSQL database for storing application data in JSON-like documents.</p>
                </div>
                
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center mb-2">
                    <span className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-white font-bold mr-2">E</span>
                    <h4 className="font-bold">Express.js</h4>
                  </div>
                  <p className="text-sm text-gray-600">Backend web application framework for building APIs with Node.js.</p>
                </div>
                
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center mb-2">
                    <span className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold mr-2">R</span>
                    <h4 className="font-bold">React.js</h4>
                  </div>
                  <p className="text-sm text-gray-600">Frontend JavaScript library for building user interfaces and components.</p>
                </div>
                
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center mb-2">
                    <span className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white font-bold mr-2">N</span>
                    <h4 className="font-bold">Node.js</h4>
                  </div>
                  <p className="text-sm text-gray-600">JavaScript runtime environment for executing server-side code.</p>
                </div>
              </div>
            </div>
            
            <h3 className="text-2xl font-bold mb-4 text-dark">What You'll Learn</h3>
            <ul className="space-y-3">
              {features.map((feature, index) => (
                <li key={index} className="flex">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-1">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
            
            <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-dark mb-1">Capstone Project</h4>
                  <p className="text-sm text-gray-600">
                    Complete the course by building a full-featured web application from scratch, deploying it to the cloud, and adding it to your professional portfolio.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 