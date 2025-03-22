import React from 'react';
import ProjectCard from './ProjectCard';

interface Project {
  id: number;
  title: string;
  description: string;
  details: string;
  image: string; // Added image property
  technologies: string[]; // Added technologies property
}

// filepath: /Users/aviralshukla/Documents/proco/src/components/portfolio.tsx
const projects: Project[] = [
  {
    id: 1,
    title: 'Project One',
    description: 'A brief description of Project One.',
    details: 'Detailed information about Project One.',
    image: 'https://via.placeholder.com/300x200', // Replace with actual image URL
    technologies: ['React', 'Tailwind CSS', 'TypeScript'], // Ensure this is defined
  },
  {
    id: 2,
    title: 'Project Two',
    description: 'A brief description of Project Two.',
    details: 'Detailed information about Project Two.',
    image: 'https://via.placeholder.com/300x200', // Replace with actual image URL
    technologies: ['Node.js', 'Express', 'MongoDB'], // Ensure this is defined
  },
  {
    id: 3,
    title: 'Project Three',
    description: 'A brief description of Project Three.',
    details: 'Detailed information about Project Three.',
    image: 'https://via.placeholder.com/300x200', // Replace with actual image URL
    technologies: ['Android', 'Kotlin', 'Firebase'], // Ensure this is defined
  },
];

const Portfolio: React.FC = () => {
  return (
    <div className="portfolio p-8 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-start mb-8">My Portfolio</h1>
      <div className="project-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};

export default Portfolio;