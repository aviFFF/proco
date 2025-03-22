import React, { useEffect, useState } from 'react';
import ProjectCard from './ProjectCard';
import axios from 'axios';

interface Project {
  id: number; // Ensure this matches the backend's `id` type
  title: string;
  description: string;
  details: string;
  image: string;
  technologies: string[];
  published: boolean;
}

const Portfolio: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
  const fetchProjects = async () => {
    try {
      const response = await axios.get('/api/projects');
      console.log('Fetched projects:', response.data.data); // Debugging log
      const publishedProjects = response.data.data.filter(
        (project: Project) => project.published
      );
      console.log('Published projects:', publishedProjects); // Debugging log
      setProjects(publishedProjects);
    } catch (err) {
      console.error('Error fetching projects:', err);
    } finally {
      setIsLoading(false);
    }
  };

  fetchProjects();
}, []);

  return (
    <div className="portfolio p-8 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-start mb-8">My Portfolio</h1>
      {isLoading ? (
        <div className="text-center py-8">
          <div className="inline-block w-8 h-8 border-4 border-gray-200 border-t-primary rounded-full animate-spin"></div>
          <p className="mt-2 text-gray-600">Loading projects...</p>
        </div>
      ) : (
        <div className="project-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Portfolio;