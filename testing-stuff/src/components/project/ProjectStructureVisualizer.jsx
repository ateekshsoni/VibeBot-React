import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Folder, 
  FileText, 
  Code, 
  Layers, 
  Zap, 
  Database,
  Server,
  Globe,
  Settings,
  Shield,
  Palette,
  Layout,
  Package,
  GitBranch,
  Cloud,
  ArrowRight,
  ChevronRight,
  ChevronDown,
  Eye,
  EyeOff
} from 'lucide-react';
import { cn } from '@/lib/utils';

const ProjectStructureVisualizer = () => {
  const [activeTab, setActiveTab] = useState('structure');
  const [expandedFolders, setExpandedFolders] = useState({
    src: true,
    components: true,
    pages: true,
    hooks: true,
    lib: true
  });

  const toggleFolder = (folderName) => {
    setExpandedFolders(prev => ({
      ...prev,
      [folderName]: !prev[folderName]
    }));
  };

  const projectStructure = {
    'frontend-test/': {
      type: 'folder',
      icon: Folder,
      color: 'blue',
      description: 'Main React application root',
      children: {
        'src/': {
          type: 'folder',
          icon: Folder,
          color: 'green',
          description: 'Source code directory',
          children: {
            'components/': {
              type: 'folder',
              icon: Layout,
              color: 'purple',
              description: 'Reusable UI components',
              children: {
                'ui/': {
                  type: 'folder',
                  icon: Palette,
                  color: 'pink',
                  description: 'shadcn/ui components',
                  files: ['button.jsx', 'card.jsx', 'input.jsx', 'badge.jsx', 'tabs.jsx', 'progress.jsx']
                },
                'layout/': {
                  type: 'folder',
                  icon: Layout,
                  color: 'indigo',
                  description: 'Layout components',
                  files: ['DashboardLayout.jsx', 'Sidebar.jsx', 'Header.jsx']
                },
                'automation/': {
                  type: 'folder',
                  icon: Zap,
                  color: 'yellow',
                  description: 'Automation components',
                  files: ['AutomationCard.jsx', 'ConfigModals/', 'AutomationStats.jsx']
                },
                'analytics/': {
                  type: 'folder',
                  icon: Database,
                  color: 'blue',
                  description: 'Analytics components',
                  files: ['OverviewDashboard.jsx', 'AutomationAnalytics.jsx', 'AudienceInsights.jsx']
                },
                'schema/': {
                  type: 'folder',
                  icon: Database,
                  color: 'green',
                  description: 'Schema visualization',
                  files: ['SchemaVisualizer.jsx', 'SchemaDataFlow.jsx', 'SchemaArchitecture.jsx']
                },
                'project/': {
                  type: 'folder',
                  icon: GitBranch,
                  color: 'orange',
                  description: 'Project documentation',
                  files: ['ProjectStructureVisualizer.jsx', 'BackendIntegration.jsx', 'TechStack.jsx']
                }
              }
            },
            'pages/': {
              type: 'folder',
              icon: FileText,
              color: 'cyan',
              description: 'Application pages',
              children: {
                'auth/': {
                  type: 'folder',
                  icon: Shield,
                  color: 'red',
                  description: 'Authentication pages',
                  files: ['LoginPage.jsx', 'SignupPage.jsx']
                }
              },
              files: ['DashboardOverview.jsx', 'AutomationPage.jsx', 'AnalyticsPage.jsx', 'LandingPage.jsx', 'TestPage.jsx']
            },
            'hooks/': {
              type: 'folder',
              icon: Code,
              color: 'violet',
              description: 'Custom React hooks',
              files: ['useUserData.js', 'useUserSync.js', 'useInstagram.js', 'useAutomation.js']
            },
            'lib/': {
              type: 'folder',
              icon: Package,
              color: 'amber',
              description: 'Utility libraries',
              files: ['utils.js', 'api.js', 'instagram.js', 'constants.js', 'auth.js']
            },
            'styles/': {
              type: 'folder',
              icon: Palette,
              color: 'rose',
              description: 'Styling files',
              files: ['index.css', 'globals.css']
            }
          },
          files: ['App.jsx', 'main.jsx']
        },
        'public/': {
          type: 'folder',
          icon: Globe,
          color: 'gray',
          description: 'Static assets',
          files: ['index.html', 'favicon.ico', 'manifest.json']
        },
        'config/': {
          type: 'folder',
          icon: Settings,
          color: 'slate',
          description: 'Configuration files',
          files: ['vite.config.js', 'tailwind.config.js', 'components.json', 'jsconfig.json']
        }
      },
      files: ['package.json', '.env', '.env.example', '.gitignore', 'README.md']
    }
  };

  const techStack = {
    frontend: {
      title: 'Frontend Technologies',
      color: 'blue',
      technologies: [
        { name: 'React 18', description: 'Latest React with concurrent features', icon: Code },
        { name: 'Vite', description: 'Fast build tool with HMR', icon: Zap },
        { name: 'Tailwind CSS v4', description: 'Utility-first CSS framework', icon: Palette },
        { name: 'shadcn/ui', description: 'High-quality component library', icon: Layout },
        { name: 'Framer Motion', description: 'Animation library', icon: Zap },
        { name: 'React Router v6', description: 'Client-side routing', icon: GitBranch },
        { name: 'Clerk Auth', description: 'Authentication platform', icon: Shield },
        { name: 'Lucide React', description: 'Icon library', icon: Eye }
      ]
    },
    architecture: {
      title: 'Architecture Patterns',
      color: 'green',
      technologies: [
        { name: 'Component-Based', description: 'Modular component architecture', icon: Layout },
        { name: 'Custom Hooks', description: 'Reusable business logic', icon: Code },
        { name: 'Protected Routes', description: 'Authentication-based routing', icon: Shield },
        { name: 'Responsive Design', description: 'Mobile-first approach', icon: Globe },
        { name: 'State Management', description: 'React hooks + context', icon: Database },
        { name: 'Error Boundaries', description: 'Graceful error handling', icon: Shield }
      ]
    }
  };

  const renderFileTree = (structure, level = 0, parentKey = '') => {
    return Object.entries(structure).map(([name, item]) => {
      const key = `${parentKey}-${name}`;
      const isFolder = item.type === 'folder';
      const isExpanded = expandedFolders[name] || expandedFolders[key];
      const Icon = item.icon || FileText;
      
      return (
        <div key={key} className={cn('ml-4', level === 0 && 'ml-0')}>
          <div 
            className={cn(
              'flex items-center gap-2 py-1 px-2 rounded cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800',
              isFolder && 'font-medium'
            )}
            onClick={() => isFolder && toggleFolder(name)}
          >
            {isFolder && (
              isExpanded ? 
                <ChevronDown className="w-4 h-4 text-gray-500" /> : 
                <ChevronRight className="w-4 h-4 text-gray-500" />
            )}
            <Icon className={cn('w-4 h-4', `text-${item.color}-500`)} />
            <span className={cn(isFolder ? 'text-gray-900 dark:text-gray-100' : 'text-gray-600 dark:text-gray-400')}>
              {name}
            </span>
            {item.color && (
              <Badge variant="outline" className={cn(`border-${item.color}-200 text-${item.color}-700`)}>
                {item.type}
              </Badge>
            )}
          </div>
          
          {item.description && (
            <div className="ml-6 text-xs text-gray-500 mb-1">
              {item.description}
            </div>
          )}
          
          {isFolder && isExpanded && item.children && (
            <div className="ml-4">
              {renderFileTree(item.children, level + 1, key)}
            </div>
          )}
          
          {isFolder && isExpanded && item.files && (
            <div className="ml-6">
              {item.files.map(file => (
                <div key={file} className="flex items-center gap-2 py-1 px-2 text-sm text-gray-600 dark:text-gray-400">
                  <FileText className="w-3 h-3" />
                  {file}
                </div>
              ))}
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          VibeBot Project Structure
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Complete project documentation including file structure, technology stack, and backend integration guide
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="structure">File Structure</TabsTrigger>
          <TabsTrigger value="techstack">Tech Stack</TabsTrigger>
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="backend">Backend Guide</TabsTrigger>
        </TabsList>

        <TabsContent value="structure" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Folder className="w-5 h-5 text-blue-500" />
                Project File Structure
              </CardTitle>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Click on folders to expand and explore the complete project structure
              </p>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg font-mono text-sm">
                {renderFileTree(projectStructure)}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="techstack" className="space-y-6">
          {Object.entries(techStack).map(([category, data]) => (
            <Card key={category}>
              <CardHeader>
                <CardTitle className={cn('flex items-center gap-2 text-', data.color, '-600')}>
                  <Layers className="w-5 h-5" />
                  {data.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {data.technologies.map((tech, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <tech.icon className={cn('w-5 h-5 mt-0.5 text-', data.color, '-500')} />
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-gray-100">{tech.name}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{tech.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="features" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Authentication System',
                icon: Shield,
                color: 'red',
                features: ['Clerk Integration', 'Protected Routes', 'User Management', 'Session Handling']
              },
              {
                title: 'Automation Center',
                icon: Zap,
                color: 'yellow',
                features: ['6 Automation Types', 'Configuration Modals', 'Real-time Status', 'Schedule Management']
              },
              {
                title: 'Analytics Dashboard',
                icon: Database,
                color: 'blue',
                features: ['Performance Metrics', 'Audience Insights', 'Content Analysis', 'Live Monitoring']
              },
              {
                title: 'Instagram Integration',
                icon: Globe,
                color: 'pink',
                features: ['OAuth Flow', 'Profile Sync', 'Media Management', 'API Integration']
              },
              {
                title: 'UI/UX Design',
                icon: Palette,
                color: 'purple',
                features: ['Responsive Design', 'Dark Mode', 'Animations', 'Accessibility']
              },
              {
                title: 'Developer Experience',
                icon: Code,
                color: 'green',
                features: ['Hot Reload', 'Type Safety', 'ESLint', 'Component Library']
              }
            ].map((feature, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className={cn('flex items-center gap-2 text-', feature.color, '-600')}>
                    <feature.icon className="w-5 h-5" />
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {feature.features.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm">
                        <div className={cn('w-2 h-2 rounded-full bg-', feature.color, '-500')} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="backend" className="space-y-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              Backend Integration Guide
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Complete guide for creating and integrating the backend API
            </p>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Server className="w-5 h-5 text-green-500" />
                Recommended Backend Stack
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3">Technology Stack</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <Badge variant="outline">Node.js</Badge>
                      Runtime environment
                    </li>
                    <li className="flex items-center gap-2">
                      <Badge variant="outline">Express.js</Badge>
                      Web framework
                    </li>
                    <li className="flex items-center gap-2">
                      <Badge variant="outline">MongoDB</Badge>
                      Database
                    </li>
                    <li className="flex items-center gap-2">
                      <Badge variant="outline">Mongoose</Badge>
                      ODM for MongoDB
                    </li>
                    <li className="flex items-center gap-2">
                      <Badge variant="outline">JWT</Badge>
                      Authentication
                    </li>
                    <li className="flex items-center gap-2">
                      <Badge variant="outline">Instagram API</Badge>
                      Social integration
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-3">Key Features</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• RESTful API design</li>
                    <li>• Authentication middleware</li>
                    <li>• Instagram OAuth integration</li>
                    <li>• Automation job scheduling</li>
                    <li>• Real-time analytics</li>
                    <li>• Error handling & logging</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>API Endpoints Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    category: 'Authentication',
                    color: 'red',
                    endpoints: [
                      { method: 'POST', path: '/api/auth/register', description: 'User registration' },
                      { method: 'POST', path: '/api/auth/login', description: 'User login' },
                      { method: 'POST', path: '/api/auth/logout', description: 'User logout' },
                      { method: 'GET', path: '/api/auth/me', description: 'Get current user' }
                    ]
                  },
                  {
                    category: 'User Management',
                    color: 'blue',
                    endpoints: [
                      { method: 'GET', path: '/api/users/profile', description: 'Get user profile' },
                      { method: 'PUT', path: '/api/users/profile', description: 'Update user profile' },
                      { method: 'DELETE', path: '/api/users/account', description: 'Delete user account' },
                      { method: 'GET', path: '/api/users/stats', description: 'Get user statistics' }
                    ]
                  },
                  {
                    category: 'Instagram Integration',
                    color: 'pink',
                    endpoints: [
                      { method: 'GET', path: '/api/instagram/auth', description: 'Instagram OAuth URL' },
                      { method: 'POST', path: '/api/instagram/callback', description: 'OAuth callback' },
                      { method: 'GET', path: '/api/instagram/profile', description: 'Get Instagram profile' },
                      { method: 'POST', path: '/api/instagram/disconnect', description: 'Disconnect Instagram' }
                    ]
                  },
                  {
                    category: 'Automation',
                    color: 'yellow',
                    endpoints: [
                      { method: 'GET', path: '/api/automations', description: 'List automations' },
                      { method: 'POST', path: '/api/automations', description: 'Create automation' },
                      { method: 'PUT', path: '/api/automations/:id', description: 'Update automation' },
                      { method: 'DELETE', path: '/api/automations/:id', description: 'Delete automation' }
                    ]
                  },
                  {
                    category: 'Analytics',
                    color: 'green',
                    endpoints: [
                      { method: 'GET', path: '/api/analytics/overview', description: 'Dashboard overview' },
                      { method: 'GET', path: '/api/analytics/performance', description: 'Performance metrics' },
                      { method: 'GET', path: '/api/analytics/audience', description: 'Audience insights' },
                      { method: 'GET', path: '/api/analytics/content', description: 'Content analytics' }
                    ]
                  }
                ].map((category, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <h4 className={cn('font-medium mb-3 flex items-center gap-2 text-', category.color, '-600')}>
                      <div className={cn('w-3 h-3 rounded-full bg-', category.color, '-500')} />
                      {category.category}
                    </h4>
                    <div className="space-y-2">
                      {category.endpoints.map((endpoint, idx) => (
                        <div key={idx} className="flex items-center gap-3 text-sm">
                          <Badge 
                            variant={endpoint.method === 'GET' ? 'default' : endpoint.method === 'POST' ? 'destructive' : 'secondary'}
                            className="min-w-[60px] justify-center"
                          >
                            {endpoint.method}
                          </Badge>
                          <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-xs">
                            {endpoint.path}
                          </code>
                          <span className="text-gray-600 dark:text-gray-400">{endpoint.description}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProjectStructureVisualizer;
