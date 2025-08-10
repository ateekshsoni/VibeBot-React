import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Server, 
  Database, 
  Code, 
  Zap, 
  Shield,
  Globe,
  Copy,
  Terminal,
  FileText,
  Settings,
  CloudArrowUp,
  GitBranch
} from 'lucide-react';
import { cn } from '@/lib/utils';

const BackendIntegrationGuide = () => {
  const [activeTab, setActiveTab] = useState('setup');
  const [copiedCode, setCopiedCode] = useState('');

  const copyToClipboard = (code, id) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(''), 2000);
  };

  const apiExamples = {
    auth: {
      register: {
        request: `POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securePassword123",
  "firstName": "John",
  "lastName": "Doe"
}`,
        response: `{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "64f8c2b8e1a2b3c4d5e6f7g8",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "isEmailVerified": false,
      "createdAt": "2024-08-09T10:30:00Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}`
      },
      login: {
        request: `POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securePassword123"
}`,
        response: `{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "64f8c2b8e1a2b3c4d5e6f7g8",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "instagramConnected": true,
      "subscription": {
        "plan": "premium",
        "status": "active"
      }
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}`
      }
    },
    instagram: {
      connect: {
        request: `GET /api/instagram/auth?userId=64f8c2b8e1a2b3c4d5e6f7g8
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`,
        response: `{
  "success": true,
  "data": {
    "authUrl": "https://api.instagram.com/oauth/authorize?client_id=YOUR_CLIENT_ID&redirect_uri=https://yourapp.com/instagram/callback&scope=user_profile,user_media&response_type=code&state=64f8c2b8e1a2b3c4d5e6f7g8"
  }
}`
      },
      callback: {
        request: `POST /api/instagram/callback
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

{
  "code": "AQDh7-abc123def456ghi789...",
  "state": "64f8c2b8e1a2b3c4d5e6f7g8"
}`,
        response: `{
  "success": true,
  "message": "Instagram account connected successfully",
  "data": {
    "instagram": {
      "userId": "17841405793187218",
      "username": "john_doe_official",
      "accountType": "BUSINESS",
      "mediaCount": 156,
      "followersCount": 2485,
      "followsCount": 198,
      "profilePictureUrl": "https://scontent.cdninstagram.com/...",
      "biography": "Entrepreneur | Content Creator",
      "website": "https://johndoe.com"
    },
    "accessToken": "encrypted_token_here",
    "connectedAt": "2024-08-09T10:45:00Z"
  }
}`
      },
      profile: {
        request: `GET /api/instagram/profile
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`,
        response: `{
  "success": true,
  "data": {
    "profile": {
      "userId": "17841405793187218",
      "username": "john_doe_official",
      "accountType": "BUSINESS",
      "mediaCount": 156,
      "followersCount": 2485,
      "followsCount": 198,
      "biography": "Entrepreneur | Content Creator",
      "website": "https://johndoe.com",
      "lastSyncAt": "2024-08-09T10:30:00Z"
    },
    "recentMedia": [
      {
        "id": "18123456789012345",
        "mediaType": "IMAGE",
        "mediaUrl": "https://scontent.cdninstagram.com/...",
        "caption": "Beautiful sunset today! #nature #photography",
        "timestamp": "2024-08-08T18:30:00Z",
        "likesCount": 245,
        "commentsCount": 23
      }
    ]
  }
}`
      }
    },
    automation: {
      create: {
        request: `POST /api/automations
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

{
  "type": "comment_dm",
  "name": "Welcome New Followers",
  "description": "Send welcome DM to users who comment on recent posts",
  "isActive": true,
  "triggers": {
    "commentKeywords": ["hello", "hi", "interested"],
    "postTypes": ["recent"],
    "timeframe": "24h"
  },
  "actions": {
    "dmTemplate": "Hi {{username}}! Thanks for your interest. Check out our latest products at {{website}}",
    "delay": {
      "min": 5,
      "max": 30,
      "unit": "minutes"
    }
  },
  "limits": {
    "dailyLimit": 50,
    "perUserLimit": 1
  }
}`,
        response: `{
  "success": true,
  "message": "Automation created successfully",
  "data": {
    "automation": {
      "id": "64f8c3d9e1a2b3c4d5e6f7g9",
      "type": "comment_dm",
      "name": "Welcome New Followers",
      "description": "Send welcome DM to users who comment on recent posts",
      "isActive": true,
      "status": "pending_approval",
      "createdAt": "2024-08-09T11:00:00Z",
      "statistics": {
        "totalTriggers": 0,
        "successfulActions": 0,
        "failedActions": 0,
        "lastRun": null
      }
    }
  }
}`
      },
      list: {
        request: `GET /api/automations?page=1&limit=10&status=active
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`,
        response: `{
  "success": true,
  "data": {
    "automations": [
      {
        "id": "64f8c3d9e1a2b3c4d5e6f7g9",
        "type": "comment_dm",
        "name": "Welcome New Followers",
        "isActive": true,
        "status": "running",
        "createdAt": "2024-08-09T11:00:00Z",
        "lastRun": "2024-08-09T14:30:00Z",
        "statistics": {
          "totalTriggers": 45,
          "successfulActions": 42,
          "failedActions": 3,
          "successRate": 93.33
        }
      }
    ],
    "pagination": {
      "total": 5,
      "page": 1,
      "limit": 10,
      "totalPages": 1
    }
  }
}`
      }
    },
    analytics: {
      overview: {
        request: `GET /api/analytics/overview?period=7d
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`,
        response: `{
  "success": true,
  "data": {
    "period": "7d",
    "overview": {
      "totalAutomations": 5,
      "activeAutomations": 3,
      "totalTriggers": 234,
      "successfulActions": 198,
      "failedActions": 36,
      "successRate": 84.62,
      "newFollowers": 67,
      "engagement": {
        "likes": 1245,
        "comments": 89,
        "shares": 23,
        "rate": 5.67
      }
    },
    "dailyStats": [
      {
        "date": "2024-08-03",
        "triggers": 28,
        "actions": 25,
        "followers": 8,
        "engagement": 178
      },
      {
        "date": "2024-08-04",
        "triggers": 35,
        "actions": 32,
        "followers": 12,
        "engagement": 203
      }
    ]
  }
}`
      },
      performance: {
        request: `GET /api/analytics/performance?automationId=64f8c3d9e1a2b3c4d5e6f7g9&period=30d
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`,
        response: `{
  "success": true,
  "data": {
    "automationId": "64f8c3d9e1a2b3c4d5e6f7g9",
    "period": "30d",
    "performance": {
      "totalRuns": 89,
      "successfulRuns": 84,
      "failedRuns": 5,
      "avgResponseTime": 2.3,
      "peakHours": ["10:00", "14:00", "20:00"],
      "conversionRate": 12.5,
      "roi": {
        "cost": 29.99,
        "revenue": 389.50,
        "profit": 359.51,
        "percentage": 1199.34
      }
    },
    "trends": {
      "weekly": [
        {"week": "2024-W31", "triggers": 156, "success": 148},
        {"week": "2024-W32", "triggers": 189, "success": 175}
      ]
    }
  }
}`
      }
    }
  };

  const backendSetupSteps = [
    {
      title: "1. Initialize Node.js Project",
      code: `mkdir vibebot-backend
cd vibebot-backend
npm init -y

# Install dependencies
npm install express mongoose dotenv cors helmet morgan
npm install jsonwebtoken bcryptjs crypto-js
npm install axios node-cron
npm install --save-dev nodemon

# Instagram API
npm install instagram-basic-display-api`,
      language: "bash"
    },
    {
      title: "2. Project Structure",
      code: `vibebot-backend/
├── src/
│   ├── config/
│   │   ├── database.js
│   │   ├── instagram.js
│   │   └── jwt.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── userController.js
│   │   ├── instagramController.js
│   │   ├── automationController.js
│   │   └── analyticsController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   ├── validation.js
│   │   └── rateLimiter.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Automation.js
│   │   └── Analytics.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── users.js
│   │   ├── instagram.js
│   │   ├── automations.js
│   │   └── analytics.js
│   ├── services/
│   │   ├── instagramService.js
│   │   ├── automationService.js
│   │   └── analyticsService.js
│   ├── utils/
│   │   ├── encryption.js
│   │   ├── logger.js
│   │   └── helpers.js
│   └── app.js
├── .env
├── .gitignore
├── package.json
└── server.js`,
      language: "text"
    },
    {
      title: "3. Environment Configuration",
      code: `# .env file
NODE_ENV=development
PORT=3000

# Database
MONGODB_URI=mongodb://localhost:27017/vibebot
MONGODB_TEST_URI=mongodb://localhost:27017/vibebot_test

# JWT
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=7d
JWT_REFRESH_SECRET=your_refresh_token_secret

# Instagram API
INSTAGRAM_CLIENT_ID=your_instagram_client_id
INSTAGRAM_CLIENT_SECRET=your_instagram_client_secret
INSTAGRAM_REDIRECT_URI=http://localhost:3000/api/instagram/callback

# Encryption
ENCRYPTION_KEY=your_32_character_encryption_key_here

# Rate Limiting
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX=100

# CORS
CORS_ORIGIN=http://localhost:5173
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000

# Logging
LOG_LEVEL=info
LOG_FILE=logs/app.log`,
      language: "bash"
    },
    {
      title: "4. Express App Setup",
      code: `// src/app.js
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const connectDB = require('./config/database');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const instagramRoutes = require('./routes/instagram');
const automationRoutes = require('./routes/automations');
const analyticsRoutes = require('./routes/analytics');

const app = express();

// Connect to MongoDB
connectDB();

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || 'http://localhost:5173',
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW) * 60 * 1000,
  max: parseInt(process.env.RATE_LIMIT_MAX)
});
app.use('/api/', limiter);

// Logging
app.use(morgan('combined'));

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/instagram', instagramRoutes);
app.use('/api/automations', automationRoutes);
app.use('/api/analytics', analyticsRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV 
  });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

module.exports = app;`,
      language: "javascript"
    },
    {
      title: "5. Database Configuration",
      code: `// src/config/database.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoURI = process.env.NODE_ENV === 'test' 
      ? process.env.MONGODB_TEST_URI 
      : process.env.MONGODB_URI;

    const conn = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(\`MongoDB Connected: \${conn.connection.host}\`);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;`,
      language: "javascript"
    }
  ];

  const deploymentGuide = [
    {
      title: "Frontend Deployment (Vercel)",
      steps: [
        "1. Build the React app: `npm run build`",
        "2. Install Vercel CLI: `npm i -g vercel`",
        "3. Deploy: `vercel --prod`",
        "4. Configure environment variables in Vercel dashboard",
        "5. Update CORS origins in backend"
      ]
    },
    {
      title: "Backend Deployment (Railway/Render)",
      steps: [
        "1. Create production MongoDB cluster (MongoDB Atlas)",
        "2. Update environment variables for production",
        "3. Deploy to Railway or Render",
        "4. Configure domain and SSL",
        "5. Update frontend API URLs"
      ]
    },
    {
      title: "Instagram App Setup",
      steps: [
        "1. Create Facebook Developer Account",
        "2. Create new Instagram Basic Display App",
        "3. Configure OAuth redirect URIs",
        "4. Add Instagram test users",
        "5. Submit for app review (for production)"
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="setup">Backend Setup</TabsTrigger>
          <TabsTrigger value="api">API Examples</TabsTrigger>
          <TabsTrigger value="integration">Frontend Integration</TabsTrigger>
          <TabsTrigger value="deployment">Deployment</TabsTrigger>
        </TabsList>

        <TabsContent value="setup" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Server className="w-5 h-5 text-green-500" />
                Backend Setup Guide
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {backendSetupSteps.map((step, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-lg">{step.title}</h4>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(step.code, `setup-${index}`)}
                      >
                        {copiedCode === `setup-${index}` ? (
                          <>Copied!</>
                        ) : (
                          <>
                            <Copy className="w-4 h-4 mr-2" />
                            Copy
                          </>
                        )}
                      </Button>
                    </div>
                    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                      <code>{step.code}</code>
                    </pre>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api" className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            {Object.entries(apiExamples).map(([category, endpoints]) => (
              <Card key={category}>
                <CardHeader>
                  <CardTitle className="capitalize">{category} API Examples</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {Object.entries(endpoints).map(([endpoint, data]) => (
                      <div key={endpoint} className="border rounded-lg p-4">
                        <h4 className="font-medium mb-4 capitalize">{endpoint.replace('_', ' ')}</h4>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <h5 className="text-sm font-medium text-green-600">Request</h5>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => copyToClipboard(data.request, `req-${category}-${endpoint}`)}
                              >
                                {copiedCode === `req-${category}-${endpoint}` ? 'Copied!' : <Copy className="w-4 h-4" />}
                              </Button>
                            </div>
                            <pre className="bg-gray-900 text-gray-100 p-3 rounded text-xs overflow-x-auto">
                              <code>{data.request}</code>
                            </pre>
                          </div>
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <h5 className="text-sm font-medium text-blue-600">Response</h5>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => copyToClipboard(data.response, `res-${category}-${endpoint}`)}
                              >
                                {copiedCode === `res-${category}-${endpoint}` ? 'Copied!' : <Copy className="w-4 h-4" />}
                              </Button>
                            </div>
                            <pre className="bg-gray-900 text-gray-100 p-3 rounded text-xs overflow-x-auto">
                              <code>{data.response}</code>
                            </pre>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="integration" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Frontend Integration Code</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium mb-3">API Service Layer</h4>
                  <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                    <code>{`// src/lib/api.js
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  async request(endpoint, options = {}) {
    const url = \`\${this.baseURL}\${endpoint}\`;
    const token = localStorage.getItem('authToken');
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: \`Bearer \${token}\` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'API request failed');
      }
      
      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Auth methods
  async login(credentials) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async register(userData) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  // User methods
  async getUserProfile() {
    return this.request('/users/profile');
  }

  async updateUserProfile(data) {
    return this.request('/users/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // Instagram methods
  async getInstagramAuthUrl() {
    return this.request('/instagram/auth');
  }

  async handleInstagramCallback(code, state) {
    return this.request('/instagram/callback', {
      method: 'POST',
      body: JSON.stringify({ code, state }),
    });
  }

  async getInstagramProfile() {
    return this.request('/instagram/profile');
  }

  // Automation methods
  async getAutomations(params = {}) {
    const query = new URLSearchParams(params).toString();
    return this.request(\`/automations?\${query}\`);
  }

  async createAutomation(automationData) {
    return this.request('/automations', {
      method: 'POST',
      body: JSON.stringify(automationData),
    });
  }

  async updateAutomation(id, data) {
    return this.request(\`/automations/\${id}\`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteAutomation(id) {
    return this.request(\`/automations/\${id}\`, {
      method: 'DELETE',
    });
  }

  // Analytics methods
  async getAnalyticsOverview(period = '7d') {
    return this.request(\`/analytics/overview?period=\${period}\`);
  }

  async getPerformanceAnalytics(automationId, period = '30d') {
    return this.request(\`/analytics/performance?automationId=\${automationId}&period=\${period}\`);
  }
}

export const apiService = new ApiService();`}</code>
                  </pre>
                </div>

                <div>
                  <h4 className="font-medium mb-3">React Hook for API Integration</h4>
                  <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                    <code>{`// src/hooks/useApi.js
import { useState, useEffect } from 'react';
import { apiService } from '@/lib/api';

export const useApi = (endpoint, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiService.request(endpoint, options);
      setData(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (options.immediate !== false) {
      fetchData();
    }
  }, [endpoint]);

  return { 
    data, 
    loading, 
    error, 
    refetch: fetchData 
  };
};

// Usage example:
// const { data: automations, loading, error } = useApi('/automations');`}</code>
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="deployment" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {deploymentGuide.map((guide, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{guide.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {guide.steps.map((step, stepIndex) => (
                      <li key={stepIndex} className="text-sm text-gray-600 dark:text-gray-400">
                        {step}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Environment Variables for Production</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3">Frontend (.env.production)</h4>
                  <pre className="bg-gray-900 text-gray-100 p-3 rounded text-sm">
                    <code>{`VITE_CLERK_PUBLISHABLE_KEY=pk_live_your_production_key
VITE_API_URL=https://your-backend-domain.com/api
VITE_NODE_ENV=production
VITE_APP_NAME=VibeBot
VITE_APP_VERSION=1.0.0`}</code>
                  </pre>
                </div>
                <div>
                  <h4 className="font-medium mb-3">Backend (Production)</h4>
                  <pre className="bg-gray-900 text-gray-100 p-3 rounded text-sm">
                    <code>{`NODE_ENV=production
PORT=3000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/vibebot
JWT_SECRET=your_production_jwt_secret
INSTAGRAM_CLIENT_ID=your_instagram_client_id
INSTAGRAM_CLIENT_SECRET=your_instagram_client_secret
CORS_ORIGIN=https://your-frontend-domain.com
ENCRYPTION_KEY=your_32_char_encryption_key`}</code>
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BackendIntegrationGuide;
