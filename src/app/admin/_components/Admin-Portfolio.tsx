'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Project {
  id: string;
  title: string;
  description: string;
  details: string;
  image: string;
  technologies: string[];
  published: boolean;
}

const AdminProjectsPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [newProject, setNewProject] = useState<Project>({
    id: '',
    title: '',
    description: '',
    details: '',
    image: '',
    technologies: [],
    published: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch projects from the API
  const fetchProjects = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('/api/projects');
      setProjects(response.data.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching projects:', err);
      setError('Failed to load projects. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Add a new project
  const handleAddProject = async () => {
    try {
      const response = await axios.post('/api/projects', newProject);
      setProjects([...projects, response.data.data]);
      setNewProject({
        id: '',
        title: '',
        description: '',
        details: '',
        image: '',
        technologies: [],
        published: false,
      });
    } catch (err) {
      console.error('Error adding project:', err);
      setError('Failed to add project. Please try again.');
    }
  };

  // Delete a project
  const handleDeleteProject = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await axios.delete(`/api/projects/${id}`);
        setProjects(projects.filter((project) => project.id !== id));
      } catch (err) {
        console.error('Error deleting project:', err);
        setError('Failed to delete project. Please try again.');
      }
    }
  };

  // Toggle project publish status
  const handleTogglePublish = async (id: string, published: boolean) => {
    try {
      const response = await axios.patch(`/api/projects/${id}`, { published: !published });
      setProjects(
        projects.map((project) =>
          project.id === id ? { ...project, published: response.data.data.published } : project
        )
      );
    } catch (err) {
      console.error('Error toggling publish status:', err);
      setError('Failed to update project. Please try again.');
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6">Manage Projects</h1>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-md mb-4">
          {error}
        </div>
      )}

      {/* Add New Project */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">Add New Project</h2>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Title</label>
          <input
            type="text"
            value={newProject.title}
            onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Description</label>
          <textarea
            value={newProject.description}
            onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Details</label>
          <textarea
            value={newProject.details}
            onChange={(e) => setNewProject({ ...newProject, details: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Image URL</label>
          <input
            type="text"
            value={newProject.image}
            onChange={(e) => setNewProject({ ...newProject, image: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Technologies</label>
          <input
            type="text"
            value={newProject.technologies.join(', ')}
            onChange={(e) =>
              setNewProject({ ...newProject, technologies: e.target.value.split(', ') })
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Comma-separated values (e.g., React, Tailwind CSS)"
          />
        </div>
        <button
          onClick={handleAddProject}
          className="bg-primary text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          Add Project
        </button>
      </div>

      {/* Published Projects */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Published Projects</h2>
        {isLoading ? (
          <div className="text-center py-8">
            <div className="inline-block w-8 h-8 border-4 border-gray-200 border-t-primary rounded-full animate-spin"></div>
            <p className="mt-2 text-gray-600">Loading projects...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div key={project.id} className="bg-white shadow-md rounded-lg p-4">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-32 object-cover rounded-md mb-4"
                />
                <h3 className="text-xl font-bold">{project.title}</h3>
                <p className="text-gray-600 mt-2">{project.description}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="bg-indigo-100 text-indigo-600 text-xs font-medium px-2 py-1 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="mt-4 flex justify-between">
                  <button
                    onClick={() => handleDeleteProject(project.id)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleTogglePublish(project.id, project.published)}
                    className={`${
                      project.published ? 'text-green-500' : 'text-gray-500'
                    } hover:underline`}
                  >
                    {project.published ? 'Unpublish' : 'Publish'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProjectsPage;