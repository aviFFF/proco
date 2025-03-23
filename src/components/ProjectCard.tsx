import React, { useState } from 'react';

interface Project {
  id: number;
  title: string;
  description: string;
  details: string;
  image: string;
  technologies: string[];
}

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  console.log('Rendering ProjectCard with project:', project); // Debugging log

  return (
    <div
      className="project-card bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105"
      onClick={toggleExpand}
    >
      {/* Project Image */}
      {project.image ? (
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-48 object-contain"
        />
      ) : (
        <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
          <span className="text-gray-500">No Image Available</span>
        </div>
      )}

      {/* Project Content */}
      <div className="p-6">
        {/* Technology Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies?.length > 0 ? (
            project.technologies.map((tech, index) => (
              <span
                key={index}
                className="bg-indigo-100 text-indigo-600 text-xs font-medium px-2 py-1 rounded-full"
              >
                {tech}
              </span>
            ))
          ) : (
            <span className="text-gray-500 text-sm">No technologies listed</span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-800">{project.title}</h3>

        {/* Description */}
        <p className="text-gray-600 mt-2">{project.description}</p>
      </div>

      {/* Expanded Details */}
      {isExpanded && (
        <div className="project-details bg-gray-100 text-gray-800 p-4 border-t border-gray-200">
          <p className="text-sm">{project.details}</p>
        </div>
      )}
    </div>
  );
};

export default ProjectCard;