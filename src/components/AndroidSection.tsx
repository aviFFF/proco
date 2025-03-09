'use client';

export default function AndroidSection() {
  const features = [
    'Kotlin Programming Fundamentals',
    'Android UI Design with XML and Jetpack Compose',
    'Working with Android SDK and APIs',
    'Data Storage and Persistence',
    'Networking and API Integration',
    'Publishing Apps to Google Play Store'
  ];

  return (
    <section id="android" className="py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row-reverse items-center">
          <div className="md:w-1/2 mb-10 md:mb-0 md:pl-10">
            <div className="relative">
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-green-200 rounded-lg opacity-50"></div>
              <div className="relative z-10 bg-white p-6 rounded-lg shadow-lg">
                <div className="text-5xl mb-6">📱</div>
                <h2 className="text-3xl font-bold mb-4 text-dark">Android App Development</h2>
                <p className="text-gray-600 mb-6">
                  Build native Android applications using Kotlin and the latest Android development tools. Learn to create beautiful, responsive, and feature-rich mobile applications.
                </p>
                <div className="mb-6">
                  <div className="flex items-center mb-2">
                    <svg className="w-5 h-5 text-yellow-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="font-medium">4.8/5</span>
                    <span className="text-gray-500 ml-2">(95+ reviews)</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>14 weeks (112 hours)</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Mobile</span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Kotlin</span>
                  <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">Intermediate</span>
                </div>
                <button className="btn btn-primary">Enroll Now</button>
              </div>
            </div>
          </div>
          
          <div className="md:w-1/2">
            <h3 className="text-2xl font-bold mb-6 text-dark">What You'll Learn</h3>
            <ul className="space-y-4">
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
            
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h4 className="font-bold">Real-world Projects</h4>
                </div>
                <p className="text-gray-600 text-sm">Build 5+ complete Android applications that you can add to your portfolio.</p>
              </div>
              
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h4 className="font-bold">Latest Technologies</h4>
                </div>
                <p className="text-gray-600 text-sm">Learn modern Android development with Kotlin, Jetpack, and Material Design.</p>
              </div>
              
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h4 className="font-bold">Career Support</h4>
                </div>
                <p className="text-gray-600 text-sm">Get guidance on building your portfolio and preparing for job interviews.</p>
              </div>
              
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mr-3">
                    <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h4 className="font-bold">Monetization</h4>
                </div>
                <p className="text-gray-600 text-sm">Learn strategies to monetize your apps through ads, in-app purchases, and subscriptions.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 