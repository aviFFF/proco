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
  const [isAddProjectVisible, setIsAddProjectVisible] = useState(false);

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
      setIsAddProjectVisible(false); // Hide the form after adding
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

  const handleToggleAddProject = () => {
    setIsAddProjectVisible(!isAddProjectVisible);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-8">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-extrabold text-gray-800">
            Project Portfolio Admin
          </h1>
          <button
            onClick={handleToggleAddProject}
            className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors shadow-md"
          >
            {isAddProjectVisible ? 'Cancel' : '+ Add Project'}
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-md mb-4 border border-red-400">
            {error}
          </div>
        )}

        {/* Add New Project Form */}
        {isAddProjectVisible && (
          <div className="bg-white shadow-xl rounded-lg p-8 mb-8 border border-gray-300">
            <h2 className="text-2xl font-bold mb-6 text-gray-700">New Project Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Title</label>
                <input
                  type="text"
                  value={newProject.title}
                  onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Image URL</label>
                <input
                  type="text"
                  value={newProject.image}
                  onChange={(e) => setNewProject({ ...newProject, image: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-gray-700 font-medium mb-2">Description</label>
                <textarea
                  value={newProject.description}
                  onChange={(e) =>
                    setNewProject({ ...newProject, description: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
                ></textarea>
              </div>
              <div className="md:col-span-2">
                <label className="block text-gray-700 font-medium mb-2">Details</label>
                <textarea
                  value={newProject.details}
                  onChange={(e) => setNewProject({ ...newProject, details: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
                ></textarea>
              </div>
              <div className="md:col-span-2">
                <label className="block text-gray-700 font-medium mb-2">Technologies</label>
                <input
                  type="text"
                  value={newProject.technologies.join(', ')}
                  onChange={(e) =>
                    setNewProject({
                      ...newProject,
                      technologies: e.target.value.split(', '),
                    })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
                  placeholder="Comma-separated values (e.g., React, Tailwind CSS)"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={handleAddProject}
                className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors shadow-md"
              >
                Create Project
              </button>
            </div>
          </div>
        )}

        {/* Project List */}
        <div className="bg-white shadow-xl rounded-lg p-8 border border-gray-300">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="inline-block w-10 h-10 border-4 border-gray-300 border-t-primary rounded-full animate-spin"></div>
              <p className="mt-3 text-gray-600">Loading projects...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="bg-white shadow-md rounded-lg p-5 border border-gray-200 hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="relative">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-40 object-cover rounded-md mb-4"
                    />
                     <div className="absolute top-2 right-2 flex space-x-2">
                      <button
                        onClick={() => handleTogglePublish(project.id, project.published)}
                        className={`px-3 py-1 rounded-full text-white text-xs font-semibold ${
                          project.published ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-500 hover:bg-gray-600'
                        } transition-colors`}
                      >
                        {project.published ? 'Published' : 'Draft'}
                      </button>
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{project.title}</h3>
                  <p className="text-gray-600 mb-3 line-clamp-3">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="bg-indigo-100 text-indigo-600 text-xs font-medium px-2 py-1 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-end space-x-2">
                   
                    <button
                      onClick={() => handleDeleteProject(project.id)}
                      className="text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
          {projects.length === 0 && !isLoading && (
            <div className="text-center py-12">
              <p className="text-gray-600"> No projects found. Add one now!.</p>
            </div>
          )

          }
        </div>
      </div>
    </div>
  );
};

export default AdminProjectsPage;
