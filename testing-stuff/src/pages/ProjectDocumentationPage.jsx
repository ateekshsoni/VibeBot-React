import React from 'react';
import ProjectStructureVisualizer from '@/components/project/ProjectStructureVisualizer';

const ProjectDocumentationPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <ProjectStructureVisualizer />
      </div>
    </div>
  );
};

export default ProjectDocumentationPage;
