import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Database,
  Users,
  Instagram,
  Bot,
  BarChart3,
  Settings,
  Activity,
  CreditCard,
  Shield,
  ArrowDown,
  ArrowRight,
  Layers
} from 'lucide-react';

const SchemaArchitecture = () => {
  const architectureLayers = [
    {
      title: 'Application Layer',
      color: 'blue',
      components: [
        { name: 'React Frontend', icon: Users, description: 'User interface components' },
        { name: 'Authentication', icon: Shield, description: 'Clerk integration' },
        { name: 'API Routes', icon: Database, description: 'Backend endpoints' }
      ]
    },
    {
      title: 'Business Logic Layer',
      color: 'green',
      components: [
        { name: 'Automation Engine', icon: Bot, description: 'Process automation rules' },
        { name: 'Analytics Processor', icon: BarChart3, description: 'Data aggregation' },
        { name: 'Instagram Integration', icon: Instagram, description: 'Social media API' }
      ]
    },
    {
      title: 'Data Layer',
      color: 'purple',
      components: [
        { name: 'User Schema', icon: Database, description: 'MongoDB document structure' },
        { name: 'Indexes', icon: Layers, description: 'Performance optimization' },
        { name: 'Encryption', icon: Shield, description: 'Token security' }
      ]
    }
  ];

  const dataRelationships = [
    {
      source: 'User',
      target: 'Instagram Accounts',
      relationship: '1:N',
      description: 'One user can have multiple Instagram accounts'
    },
    {
      source: 'Instagram Account',
      target: 'Automation Rules',
      relationship: '1:N',
      description: 'Each account can have multiple automation rules'
    },
    {
      source: 'User',
      target: 'Activity Logs',
      relationship: '1:N',
      description: 'User generates multiple activity entries'
    },
    {
      source: 'User',
      target: 'Analytics Data',
      relationship: '1:N',
      description: 'User has daily analytics metrics'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Architecture Layers */}
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-xl text-white flex items-center">
            <Layers className="w-6 h-6 mr-2 text-blue-400" />
            System Architecture
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {architectureLayers.map((layer, layerIdx) => (
              <div key={layerIdx}>
                <div className={`p-4 rounded-lg bg-${layer.color}-500/20 border border-${layer.color}-500/30`}>
                  <h3 className={`text-lg font-medium text-${layer.color}-400 mb-4`}>
                    {layer.title}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {layer.components.map((component, idx) => {
                      const Icon = component.icon;
                      return (
                        <div key={idx} className="p-3 bg-gray-900 rounded border border-gray-600">
                          <div className="flex items-center space-x-2 mb-2">
                            <Icon className="w-5 h-5 text-white" />
                            <h4 className="text-white font-medium text-sm">
                              {component.name}
                            </h4>
                          </div>
                          <p className="text-gray-400 text-xs">
                            {component.description}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
                {layerIdx < architectureLayers.length - 1 && (
                  <div className="flex justify-center my-4">
                    <ArrowDown className="w-6 h-6 text-gray-400" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Data Relationships Diagram */}
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-xl text-white flex items-center">
            <Database className="w-6 h-6 mr-2 text-purple-400" />
            Entity Relationships
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {dataRelationships.map((rel, idx) => (
              <div key={idx} className="p-4 bg-gray-900 rounded border border-gray-600">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-white font-medium text-sm">{rel.source}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-xs">{rel.relationship}</Badge>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-white font-medium text-sm">{rel.target}</span>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                </div>
                <p className="text-gray-400 text-xs">{rel.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Schema Document Structure */}
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-xl text-white flex items-center">
            <Database className="w-6 h-6 mr-2 text-green-400" />
            Document Structure Example
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-900 p-4 rounded border border-gray-600 overflow-x-auto">
            <pre className="text-sm text-gray-300">
{`{
  "_id": "ObjectId(...)",
  "clerkUserId": "user_123abc...",
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe",
  
  "instagramAccounts": [
    {
      "instagramId": "17841405309213154",
      "username": "johnsbusiness",
      "encryptedAccessToken": "encrypted_token_data...",
      "followers": 15420,
      "businessAccount": true,
      "lastSync": "2024-01-15T10:30:00Z"
    }
  ],
  
  "automations": {
    "commentToDm": {
      "enabled": true,
      "rules": [
        {
          "id": "rule_001",
          "name": "Pricing Inquiry",
          "keywords": ["price", "cost", "buy"],
          "dmTemplate": "Hi! Thanks for your interest! 🎉",
          "triggerCount": 45,
          "successCount": 42
        }
      ]
    },
    "dmAutoReply": {
      "enabled": true,
      "rules": [...]
    }
  },
  
  "analytics": {
    "dailyMetrics": [
      {
        "date": "2024-01-15T00:00:00Z",
        "followers": 15420,
        "engagementRate": 8.7,
        "automationTriggers": 23,
        "dmsSent": 18
      }
    ]
  },
  
  "subscription": {
    "plan": "professional",
    "status": "active",
    "limits": {
      "monthlyAutomations": 10000,
      "automationRules": 50
    }
  },
  
  "activityLog": [
    {
      "id": "log_001",
      "type": "comment_dm_sent",
      "description": "DM sent to @customer for keyword 'price'",
      "status": "success",
      "timestamp": "2024-01-15T14:23:45Z"
    }
  ],
  
  "createdAt": "2024-01-01T12:00:00Z",
  "updatedAt": "2024-01-15T14:23:45Z"
}`}
            </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SchemaArchitecture;
