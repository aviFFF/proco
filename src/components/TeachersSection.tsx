// 'use client';

// export default function TeachersSection() {
//   const teachers = [
//     {
//       name: 'Dr. Sarah Johnson',
//       role: 'JavaScript & Frontend Expert',
//       image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
//       bio: '10+ years of industry experience with companies like Google and Microsoft. Specializes in modern JavaScript frameworks and frontend development.',
//       social: {
//         linkedin: '#',
//         twitter: '#',
//         github: '#'
//       }
//     },
//     {
//       name: 'Alex Rodriguez',
//       role: 'Mobile Development Lead',
//       image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
//       bio: 'Former Android developer at Uber with extensive experience in Kotlin and Java. Has published multiple apps with millions of downloads.',
//       social: {
//         linkedin: '#',
//         twitter: '#',
//         github: '#'
//       }
//     },
//     {
//       name: 'Priya Patel',
//       role: 'Full-Stack Developer',
//       image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
//       bio: 'MERN stack specialist with a background in enterprise applications. Passionate about teaching and mentoring new developers.',
//       social: {
//         linkedin: '#',
//         twitter: '#',
//         github: '#'
//       }
//     },
//     {
//       name: 'Michael Chen',
//       role: 'AI & Machine Learning Expert',
//       image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
//       bio: 'PhD in Computer Science with a focus on AI. Has worked on cutting-edge projects at research labs and tech startups.',
//       social: {
//         linkedin: '#',
//         twitter: '#',
//         github: '#'
//       }
//     }
//   ];

//   return (
//     <section className="py-20">
//       <div className="container mx-auto px-4">
//         <div className="text-center mb-16">
//           <h2 className="text-3xl md:text-4xl font-bold mb-4 text-dark">Meet Our Expert Instructors</h2>
//           <p className="max-w-2xl mx-auto text-gray-600">
//             Learn from industry professionals with years of real-world experience who are passionate about sharing their knowledge.
//           </p>
//         </div>
        
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//           {teachers.map((teacher, index) => (
//             <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
//               <div className="h-64 overflow-hidden">
//                 <img 
//                   src={teacher.image} 
//                   alt={teacher.name} 
//                   className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
//                 />
//               </div>
//               <div className="p-6">
//                 <h3 className="text-xl font-bold text-dark mb-1">{teacher.name}</h3>
//                 <p className="text-primary font-medium mb-3">{teacher.role}</p>
//                 <p className="text-gray-600 text-sm mb-4">{teacher.bio}</p>
//                 <div className="flex space-x-3">
//                   <a href={teacher.social.linkedin} className="text-gray-500 hover:text-primary transition-colors">
//                     <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
//                       <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
//                     </svg>
//                   </a>
//                   <a href={teacher.social.twitter} className="text-gray-500 hover:text-primary transition-colors">
//                     <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
//                       <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
//                     </svg>
//                   </a>
//                   <a href={teacher.social.github} className="text-gray-500 hover:text-primary transition-colors">
//                     <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
//                       <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
//                     </svg>
//                   </a>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
        
//         <div className="mt-16 bg-gray-50 rounded-lg p-8 md:p-12">
//           <div className="flex flex-col md:flex-row items-center">
//             <div className="md:w-2/3 mb-8 md:mb-0 md:pr-12">
//               <h3 className="text-2xl md:text-3xl font-bold mb-4 text-dark">Join Our Teaching Team</h3>
//               <p className="text-gray-600 mb-6">
//                 Are you an experienced professional looking to share your knowledge? We're always looking for passionate instructors to join our team.
//               </p>
//               <ul className="space-y-3 mb-6">
//                 <li className="flex items-start">
//                   <svg className="w-5 h-5 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                   </svg>
//                   <span>Flexible teaching schedule</span>
//                 </li>
//                 <li className="flex items-start">
//                   <svg className="w-5 h-5 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                   </svg>
//                   <span>Competitive compensation</span>
//                 </li>
//                 <li className="flex items-start">
//                   <svg className="w-5 h-5 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                   </svg>
//                   <span>Opportunity to shape the next generation of tech talent</span>
//                 </li>
//               </ul>
//               <button className="btn btn-primary">Apply to Teach</button>
//             </div>
//             <div className="md:w-1/3">
//               <div className="bg-white p-6 rounded-lg shadow-md">
//                 <div className="flex items-center mb-4">
//                   <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white mr-4">
//                     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//                     </svg>
//                   </div>
//                   <div>
//                     <h4 className="font-bold text-dark">Teacher Requirements</h4>
//                     <p className="text-sm text-gray-500">What we look for in instructors</p>
//                   </div>
//                 </div>
//                 <ul className="space-y-2 text-sm text-gray-600">
//                   <li className="flex items-center">
//                     <svg className="w-4 h-4 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                     </svg>
//                     <span>Minimum 3 years industry experience</span>
//                   </li>
//                   <li className="flex items-center">
//                     <svg className="w-4 h-4 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                     </svg>
//                     <span>Strong communication skills</span>
//                   </li>
//                   <li className="flex items-center">
//                     <svg className="w-4 h-4 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                     </svg>
//                     <span>Passion for teaching and mentoring</span>
//                   </li>
//                   <li className="flex items-center">
//                     <svg className="w-4 h-4 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                     </svg>
//                     <span>Up-to-date with industry trends</span>
//                   </li>
//                 </ul>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// } 