import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import SchemaDataFlow from './SchemaDataFlow';
import {
  User,
  Instagram,
  Settings,
  BarChart3,
  Activity,
  CreditCard,
  Shield,
  Database,
  Key,
  Users,
  Bot,
  MessageSquare,
  Heart,
  Hash,
  Calendar,
  ChevronDown,
  ChevronRight,
  Eye,
  EyeOff,
  Lock,
  Zap,
  Globe,
  Star,
  Crown,
  CheckCircle,
  Circle,
  GitBranch
} from 'lucide-react';

const SchemaVisualizer = () => {
  const [expandedSections, setExpandedSections] = useState({
    user: true,
    instagram: false,
    automations: false,
    analytics: false,
    subscription: false,
    preferences: false,
    activity: false,
    security: false
  });

  const [selectedSection, setSelectedSection] = useState('user');
  const [activeTab, setActiveTab] = useState('structure');

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const schemaStructure = {
    user: {
      title: 'Core User Information',
      icon: User,
      color: 'blue',
      description: 'Basic user data and Clerk authentication',
      fields: [
        { name: 'clerkUserId', type: 'String', required: true, unique: true, description: 'Clerk authentication ID' },
        { name: 'email', type: 'String', required: true, unique: true, description: 'User email with validation' },
        { name: 'firstName', type: 'String', maxLength: 50, description: 'First name' },
        { name: 'lastName', type: 'String', maxLength: 50, description: 'Last name' },
        { name: 'username', type: 'String', unique: true, description: 'Optional username' },
        { name: 'profileImageUrl', type: 'String', description: 'Profile picture URL' },
        { name: 'status', type: 'Enum', options: ['active', 'suspended', 'deleted'], description: 'Account status' }
      ]
    },
    instagram: {
      title: 'Instagram Accounts',
      icon: Instagram,
      color: 'pink',
      description: 'Multi-account Instagram connections with encrypted tokens',
      isArray: true,
      fields: [
        { name: 'instagramId', type: 'String', required: true, description: 'Instagram account ID' },
        { name: 'username', type: 'String', required: true, description: 'Instagram username' },
        { name: 'displayName', type: 'String', description: 'Display name' },
        { name: 'encryptedAccessToken', type: 'String', encrypted: true, description: 'Encrypted access token' },
        { name: 'encryptedRefreshToken', type: 'String', encrypted: true, description: 'Encrypted refresh token' },
        { name: 'followers', type: 'Number', description: 'Follower count' },
        { name: 'following', type: 'Number', description: 'Following count' },
        { name: 'businessAccount', type: 'Boolean', description: 'Is business account' },
        { name: 'lastSync', type: 'Date', description: 'Last sync timestamp' }
      ]
    },
    automations: {
      title: 'Automation Settings',
      icon: Bot,
      color: 'green',
      description: 'All 6 automation types with rules and configurations',
      subsections: {
        commentToDm: {
          title: 'Comment-to-DM',
          icon: MessageSquare,
          fields: [
            { name: 'enabled', type: 'Boolean', description: 'Automation enabled' },
            { name: 'rules', type: 'Array', description: 'DM automation rules' }
          ]
        },
        dmAutoReply: {
          title: 'DM Auto-Reply',
          icon: Bot,
          fields: [
            { name: 'enabled', type: 'Boolean', description: 'Auto-reply enabled' },
            { name: 'rules', type: 'Array', description: 'Reply rules with priority' }
          ]
        },
        storyMention: {
          title: 'Story Mentions',
          icon: Users,
          fields: [
            { name: 'enabled', type: 'Boolean', description: 'Story automation enabled' },
            { name: 'rules', type: 'Array', description: 'Story mention actions' }
          ]
        },
        welcomeMessage: {
          title: 'Welcome Messages',
          icon: Heart,
          fields: [
            { name: 'isEnabled', type: 'Boolean', description: 'Welcome automation' },
            { name: 'template', type: 'String', description: 'Welcome message template' }
          ]
        },
        hashtagMonitoring: {
          title: 'Hashtag Monitoring',
          icon: Hash,
          fields: [
            { name: 'isEnabled', type: 'Boolean', description: 'Hashtag monitoring' },
            { name: 'hashtags', type: 'Array', description: 'Monitored hashtags' }
          ]
        },
        scheduledPosts: {
          title: 'Scheduled Posts',
          icon: Calendar,
          fields: [
            { name: 'enabled', type: 'Boolean', description: 'Post scheduling enabled' },
            { name: 'posts', type: 'Array', description: 'Scheduled posts queue' }
          ]
        }
      }
    },
    analytics: {
      title: 'Analytics & Metrics',
      icon: BarChart3,
      color: 'purple',
      description: 'Daily metrics, performance tracking, and insights',
      fields: [
        { name: 'dailyMetrics', type: 'Array', description: 'Daily performance metrics' },
        { name: 'lastSyncDate', type: 'Date', description: 'Last analytics sync' },
        { name: 'retentionDays', type: 'Number', default: 90, description: 'Data retention period' }
      ]
    },
    activity: {
      title: 'Activity Logs',
      icon: Activity,
      color: 'orange',
      description: 'Automation triggers, errors, and user actions',
      fields: [
        { name: 'id', type: 'String', description: 'Unique log ID' },
        { name: 'type', type: 'Enum', description: 'Activity type' },
        { name: 'description', type: 'String', description: 'Activity description' },
        { name: 'automation', type: 'String', description: 'Related automation' },
        { name: 'status', type: 'Enum', options: ['success', 'error', 'warning'], description: 'Activity status' },
        { name: 'timestamp', type: 'Date', description: 'When activity occurred' }
      ]
    },
    subscription: {
      title: 'Subscription & Billing',
      icon: CreditCard,
      color: 'yellow',
      description: 'Plan management, usage limits, and billing',
      fields: [
        { name: 'plan', type: 'Enum', options: ['free', 'starter', 'professional', 'enterprise'], description: 'Subscription plan' },
        { name: 'status', type: 'Enum', options: ['active', 'cancelled', 'past_due'], description: 'Subscription status' },
        { name: 'stripeCustomerId', type: 'String', description: 'Stripe customer ID' },
        { name: 'limits', type: 'Object', description: 'Plan usage limits' },
        { name: 'usage', type: 'Object', description: 'Current month usage' }
      ]
    },
    preferences: {
      title: 'User Preferences',
      icon: Settings,
      color: 'gray',
      description: 'UI settings, notifications, and analytics preferences',
      fields: [
        { name: 'theme', type: 'Enum', options: ['light', 'dark', 'auto'], description: 'UI theme preference' },
        { name: 'language', type: 'String', default: 'en', description: 'Language setting' },
        { name: 'timezone', type: 'String', description: 'User timezone' },
        { name: 'notifications', type: 'Object', description: 'Notification preferences' },
        { name: 'analytics', type: 'Object', description: 'Analytics preferences' }
      ]
    },
    security: {
      title: 'Security & Compliance',
      icon: Shield,
      color: 'red',
      description: 'Login history, 2FA, and security features',
      fields: [
        { name: 'lastPasswordChange', type: 'Date', description: 'Last password change' },
        { name: 'twoFactorEnabled', type: 'Boolean', description: '2FA status' },
        { name: 'loginHistory', type: 'Array', description: 'Recent login attempts' },
        { name: 'deletedAt', type: 'Date', description: 'Soft delete timestamp' }
      ]
    }
  };

  const getColorClasses = (color) => {
    const colors = {
      blue: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      pink: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
      green: 'bg-green-500/20 text-green-400 border-green-500/30',
      purple: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      orange: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      yellow: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      gray: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
      red: 'bg-red-500/20 text-red-400 border-red-500/30'
    };
    return colors[color] || colors.blue;
  };

  const renderFieldBadges = (field) => {
    const badges = [];
    
    if (field.required) badges.push(<Badge key="req" variant="destructive" className="text-xs">Required</Badge>);
    if (field.unique) badges.push(<Badge key="uniq" variant="outline" className="text-xs">Unique</Badge>);
    if (field.encrypted) badges.push(<Badge key="enc" variant="secondary" className="text-xs"><Lock className="w-3 h-3 mr-1" />Encrypted</Badge>);
    if (field.default !== undefined) badges.push(<Badge key="def" variant="outline" className="text-xs">Default: {String(field.default)}</Badge>);
    
    return badges;
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            VibeBot User Schema Structure
          </h1>
          <p className="text-gray-400 text-lg">
            Interactive visualization of the complete MongoDB User schema
          </p>
          <div className="flex items-center justify-center space-x-4">
            <Badge variant="outline" className="text-green-400 border-green-500/30">
              <Database className="w-4 h-4 mr-1" />
              MongoDB Schema
            </Badge>
            <Badge variant="outline" className="text-blue-400 border-blue-500/30">
              <Shield className="w-4 h-4 mr-1" />
              Security Enhanced
            </Badge>
            <Badge variant="outline" className="text-purple-400 border-purple-500/30">
              <Zap className="w-4 h-4 mr-1" />
              Production Ready
            </Badge>
          </div>

          {/* Tab Navigation */}
          <div className="flex justify-center space-x-2">
            <Button
              variant={activeTab === 'structure' ? 'default' : 'outline'}
              onClick={() => setActiveTab('structure')}
              size="sm"
            >
              <Database className="w-4 h-4 mr-2" />
              Schema Structure
            </Button>
            <Button
              variant={activeTab === 'dataflow' ? 'default' : 'outline'}
              onClick={() => setActiveTab('dataflow')}
              size="sm"
            >
              <GitBranch className="w-4 h-4 mr-2" />
              Data Flow & Relationships
            </Button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'dataflow' ? (
          <SchemaDataFlow />
        ) : (
          <>
        {/* Schema Overview */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-xl text-white flex items-center">
              <Database className="w-6 h-6 mr-2 text-blue-400" />
              Schema Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(schemaStructure).map(([key, section]) => {
                const Icon = section.icon;
                return (
                  <div
                    key={key}
                    onClick={() => {
                      setSelectedSection(key);
                      toggleSection(key);
                    }}
                    className={`p-4 rounded-lg border cursor-pointer transition-all hover:scale-105 ${
                      selectedSection === key 
                        ? getColorClasses(section.color)
                        : 'bg-gray-800 border-gray-600 hover:border-gray-500'
                    }`}
                  >
                    <div className="flex items-center space-x-2 mb-2">
                      <Icon className="w-5 h-5" />
                      <h3 className="font-medium text-sm">{section.title}</h3>
                    </div>
                    <p className="text-xs text-gray-400">{section.description}</p>
                    {section.isArray && (
                      <Badge variant="outline" className="mt-2 text-xs">
                        Array
                      </Badge>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Detailed Section View */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Section List */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white">Schema Sections</h2>
            {Object.entries(schemaStructure).map(([key, section]) => {
              const Icon = section.icon;
              const isExpanded = expandedSections[key];
              
              return (
                <Card key={key} className="bg-gray-800/50 border-gray-700">
                  <CardHeader 
                    className="cursor-pointer"
                    onClick={() => toggleSection(key)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Icon className={`w-5 h-5 text-${section.color}-400`} />
                        <CardTitle className="text-white text-sm">{section.title}</CardTitle>
                      </div>
                      {isExpanded ? (
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                      )}
                    </div>
                  </CardHeader>
                  
                  {isExpanded && (
                    <CardContent className="pt-0">
                      <p className="text-gray-400 text-sm mb-4">{section.description}</p>
                      
                      {section.subsections ? (
                        <div className="space-y-3">
                          {Object.entries(section.subsections).map(([subKey, subsection]) => {
                            const SubIcon = subsection.icon;
                            return (
                              <div key={subKey} className="p-3 bg-gray-900 rounded border border-gray-600">
                                <div className="flex items-center space-x-2 mb-2">
                                  <SubIcon className="w-4 h-4 text-green-400" />
                                  <h4 className="text-white text-sm font-medium">{subsection.title}</h4>
                                </div>
                                <div className="space-y-1">
                                  {subsection.fields.map((field, idx) => (
                                    <div key={idx} className="flex items-center justify-between text-xs">
                                      <span className="text-gray-300">{field.name}</span>
                                      <Badge variant="outline" className="text-xs">
                                        {field.type}
                                      </Badge>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="space-y-2">
                          {section.fields.slice(0, 4).map((field, idx) => (
                            <div key={idx} className="flex items-center justify-between">
                              <span className="text-gray-300 text-sm">{field.name}</span>
                              <Badge variant="outline" className="text-xs">
                                {field.type}
                              </Badge>
                            </div>
                          ))}
                          {section.fields.length > 4 && (
                            <p className="text-gray-400 text-xs">
                              +{section.fields.length - 4} more fields...
                            </p>
                          )}
                        </div>
                      )}
                    </CardContent>
                  )}
                </Card>
              );
            })}
          </div>

          {/* Detailed Field View */}
          <div className="lg:col-span-2">
            {selectedSection && schemaStructure[selectedSection] && (
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    {React.createElement(schemaStructure[selectedSection].icon, {
                      className: `w-6 h-6 text-${schemaStructure[selectedSection].color}-400`
                    })}
                    <CardTitle className="text-xl text-white">
                      {schemaStructure[selectedSection].title}
                    </CardTitle>
                  </div>
                  <p className="text-gray-400">
                    {schemaStructure[selectedSection].description}
                  </p>
                </CardHeader>
                <CardContent>
                  {schemaStructure[selectedSection].subsections ? (
                    <div className="space-y-6">
                      {Object.entries(schemaStructure[selectedSection].subsections).map(([subKey, subsection]) => {
                        const SubIcon = subsection.icon;
                        return (
                          <div key={subKey} className="space-y-4">
                            <div className="flex items-center space-x-2 border-b border-gray-600 pb-2">
                              <SubIcon className="w-5 h-5 text-green-400" />
                              <h3 className="text-lg font-medium text-white">{subsection.title}</h3>
                            </div>
                            <div className="grid gap-3">
                              {subsection.fields.map((field, idx) => (
                                <div key={idx} className="p-3 bg-gray-900 rounded border border-gray-600">
                                  <div className="flex items-start justify-between mb-2">
                                    <div>
                                      <h4 className="text-white font-medium">{field.name}</h4>
                                      <p className="text-gray-400 text-sm">{field.description}</p>
                                    </div>
                                    <Badge variant="outline" className="ml-2">
                                      {field.type}
                                    </Badge>
                                  </div>
                                  <div className="flex flex-wrap gap-2">
                                    {renderFieldBadges(field)}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {schemaStructure[selectedSection].fields.map((field, idx) => (
                        <div key={idx} className="p-4 bg-gray-900 rounded border border-gray-600">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <h3 className="text-white font-medium flex items-center">
                                {field.name}
                                {field.encrypted && <Lock className="w-4 h-4 ml-2 text-red-400" />}
                              </h3>
                              <p className="text-gray-400 text-sm mt-1">{field.description}</p>
                              {field.options && (
                                <div className="mt-2">
                                  <p className="text-gray-300 text-xs mb-1">Options:</p>
                                  <div className="flex flex-wrap gap-1">
                                    {field.options.map((option, optIdx) => (
                                      <Badge key={optIdx} variant="outline" className="text-xs">
                                        {option}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                            <Badge variant="outline" className="ml-4">
                              {field.type}
                            </Badge>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {renderFieldBadges(field)}
                            {field.maxLength && (
                              <Badge variant="outline" className="text-xs">
                                Max: {field.maxLength}
                              </Badge>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Schema Benefits */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-xl text-white flex items-center">
              <Star className="w-6 h-6 mr-2 text-yellow-400" />
              Schema Benefits & Features
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-white flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-blue-400" />
                  Security Features
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-gray-300 text-sm">Token Encryption (AES)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-gray-300 text-sm">Field-level Security</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-gray-300 text-sm">Soft Delete Support</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-gray-300 text-sm">Login History Tracking</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-white flex items-center">
                  <Zap className="w-5 h-5 mr-2 text-purple-400" />
                  Performance
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-gray-300 text-sm">Strategic Indexing</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-gray-300 text-sm">Compound Indexes</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-gray-300 text-sm">Selective Field Loading</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-gray-300 text-sm">Virtual Properties</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-white flex items-center">
                  <Globe className="w-5 h-5 mr-2 text-green-400" />
                  Scalability
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-gray-300 text-sm">Multi-Platform Ready</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-gray-300 text-sm">Feature Flags</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-gray-300 text-sm">Multi-Account Support</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-gray-300 text-sm">Flexible Metadata</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        </>
        )}
      </div>
    </div>
  );
};

export default SchemaVisualizer;
