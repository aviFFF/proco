'use client';

import { useState } from 'react';

interface Course {
  id: number;
  title: string;
  description: string;
  icon: string;
  features: string[];
}

export default function CourseSection() {
  const courses: Course[] = [
    {
      id: 1,
      title: 'JavaScript Development',
      description: 'Master modern JavaScript from basics to advanced concepts like ES6+, async/await, and frameworks.',
      icon: '💻',
      features: ['ES6+ Syntax', 'DOM Manipulation', 'Async Programming', 'Modern Frameworks', 'Real-world Projects']
    },
    {
      id: 2,
      title: 'Android App Development',
      description: 'Build native Android applications using Kotlin and the latest Android development tools.',
      icon: '📱',
      features: ['Kotlin Programming', 'UI/UX Design', 'API Integration', 'Database Management', 'App Publishing']
    },
    {
      id: 3,
      title: 'MERN Stack Development',
      description: 'Become a full-stack developer with MongoDB, Express, React, and Node.js.',
      icon: '🌐',
      features: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'Full-stack Projects']
    },
    {
      id: 4,
      title: 'Software Testing',
      description: 'Learn comprehensive testing methodologies including manual and automated testing.',
      icon: '🧪',
      features: ['Manual Testing', 'Automated Testing', 'Test Planning', 'Bug Tracking', 'Performance Testing']
    },
    {
      id: 5,
      title: 'Graphic Designing',
      description: 'Master graphic design principles and tools to create stunning visual content.',
      icon: '🎨',
      features: ['Adobe Photoshop', 'Illustrator', 'UI/UX Design', 'Typography', 'Brand Identity']
    },
    {
      id: 6,
      title: 'AI-Powered Development',
      description: 'Learn to leverage AI tools to enhance your coding and development workflow.',
      icon: '🤖',
      features: ['AI Coding Assistants', 'Prompt Engineering', 'AI Integration', 'Automated Testing', 'Smart Development']
    }
  ];

  const [expandedCourse, setExpandedCourse] = useState<number | null>(null);

  const toggleCourse = (courseId: number) => {
    if (expandedCourse === courseId) {
      setExpandedCourse(null);
    } else {
      setExpandedCourse(courseId);
    }
  };

  return (
    <section className="py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-dark mb-4">Our Skill-Based Courses</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Gain practical skills with our industry-focused courses designed to prepare you for real-world challenges and opportunities.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div key={course.id} className="card hover:shadow-lg transition-shadow">
            <div className="flex items-start">
              <span className="text-4xl mr-4">{course.icon}</span>
              <div>
                <h3 className="text-xl font-bold text-dark">{course.title}</h3>
                <p className="text-gray-600 mt-2">{course.description}</p>
              </div>
            </div>
            
            <button 
              onClick={() => toggleCourse(course.id)}
              className="mt-4 text-primary font-medium flex items-center"
            >
              {expandedCourse === course.id ? 'Show Less' : 'Learn More'}
              <svg 
                className={`w-4 h-4 ml-1 transition-transform ${expandedCourse === course.id ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {expandedCourse === course.id && (
              <div className="mt-4 pt-4 border-t">
                <h4 className="font-medium text-dark mb-2">What you'll learn:</h4>
                <ul className="space-y-1">
                  {course.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-600">
                      <svg className="w-4 h-4 mr-2 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className="btn btn-primary mt-4">Enroll Now</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
} 