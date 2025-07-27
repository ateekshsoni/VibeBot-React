// Static data for dashboard until backend is implemented

// Dashboard Stats
export const dashboardStats = {
  messagesSent: {
    value: 2543,
    change: 12,
    trend: 'up'
  },
  engagementRate: {
    value: 94.2,
    change: 2.1,
    trend: 'up'
  },
  followers: {
    value: 2340,
    change: 8.3,
    trend: 'up'
  },
  activeCampaigns: {
    value: 3,
    change: 1,
    trend: 'up'
  }
};

// User Profile Data
export const userProfile = {
  name: "Alex Johnson",
  email: "alex.johnson@example.com",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  joinDate: "2024-01-15",
  plan: "Pro",
  instagramAccount: "@alexjohnson_official",
  instagramFollowers: 15420,
  instagramConnected: true
};

// Instagram Account Data
export const instagramAccounts = [
  {
    id: 1,
    username: "@alexjohnson_official",
    displayName: "Alex Johnson",
    followers: 15420,
    following: 892,
    posts: 124,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    isConnected: true,
    connectionDate: "2024-01-20"
  },
  {
    id: 2,
    username: "@business_alex",
    displayName: "Alex Business",
    followers: 8250,
    following: 445,
    posts: 89,
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face",
    isConnected: false,
    connectionDate: null
  }
];

// Campaign Data
export const campaigns = [
  {
    id: 1,
    name: "Welcome New Followers",
    description: "Automated welcome message for new followers",
    status: "active",
    type: "welcome",
    trigger: "new_follower",
    messagesSent: 245,
    responses: 189,
    engagementRate: 77.1,
    createdAt: "2024-07-15",
    lastActive: "2024-07-27",
    template: "Hi {name}! 👋 Welcome to our community! We're excited to have you here. Feel free to reach out if you have any questions!"
  },
  {
    id: 2,
    name: "Product Inquiry Bot",
    description: "Handles product questions and provides information",
    status: "active",
    type: "inquiry",
    trigger: "keyword_match",
    keywords: ["price", "product", "buy", "purchase", "cost"],
    messagesSent: 156,
    responses: 134,
    engagementRate: 85.9,
    createdAt: "2024-07-10",
    lastActive: "2024-07-27",
    template: "Thanks for your interest in our products! 🛍️ Here's what we have available..."
  },
  {
    id: 3,
    name: "Support Assistant",
    description: "Provides quick support and FAQ responses",
    status: "paused",
    type: "support",
    trigger: "keyword_match",
    keywords: ["help", "support", "problem", "issue", "bug"],
    messagesSent: 89,
    responses: 67,
    engagementRate: 75.3,
    createdAt: "2024-07-05",
    lastActive: "2024-07-25",
    template: "Hi! I'm here to help you with any questions or issues. What can I assist you with today? 🤝"
  },
  {
    id: 4,
    name: "Holiday Promotion",
    description: "Special offers and holiday deals",
    status: "draft",
    type: "promotion",
    trigger: "scheduled",
    schedule: "2024-12-01",
    messagesSent: 0,
    responses: 0,
    engagementRate: 0,
    createdAt: "2024-07-20",
    lastActive: null,
    template: "🎄 Special Holiday Offer! Get 30% off all our products. Use code HOLIDAY30 at checkout!"
  }
];

// Analytics Data
export const analyticsData = {
  engagementOverTime: [
    { date: 'Jan', messages: 120, responses: 98, followers: 1200, engagementRate: 81.7 },
    { date: 'Feb', messages: 180, responses: 142, followers: 1350, engagementRate: 78.9 },
    { date: 'Mar', messages: 240, responses: 195, followers: 1500, engagementRate: 81.3 },
    { date: 'Apr', messages: 300, responses: 245, followers: 1680, engagementRate: 81.7 },
    { date: 'May', messages: 380, responses: 320, followers: 1850, engagementRate: 84.2 },
    { date: 'Jun', messages: 420, responses: 380, followers: 2100, engagementRate: 90.5 },
    { date: 'Jul', messages: 450, responses: 410, followers: 2300, engagementRate: 91.1 }
  ],
  
  campaignDistribution: [
    { name: 'Welcome Messages', value: 35, color: '#3B82F6' },
    { name: 'Product Inquiries', value: 25, color: '#10B981' },
    { name: 'Support Tickets', value: 20, color: '#F59E0B' },
    { name: 'General Questions', value: 20, color: '#EF4444' }
  ],
  
  responseTimeData: [
    { time: '9AM', avgResponse: 2.5, messages: 45 },
    { time: '11AM', avgResponse: 1.8, messages: 62 },
    { time: '1PM', avgResponse: 3.2, messages: 89 },
    { time: '3PM', avgResponse: 2.1, messages: 75 },
    { time: '5PM', avgResponse: 4.5, messages: 120 },
    { time: '7PM', avgResponse: 1.9, messages: 85 },
    { time: '9PM', avgResponse: 2.8, messages: 95 }
  ],

  weeklyStats: [
    { day: 'Mon', messages: 65, responses: 58 },
    { day: 'Tue', messages: 89, responses: 76 },
    { day: 'Wed', messages: 120, responses: 108 },
    { day: 'Thu', messages: 95, responses: 85 },
    { day: 'Fri', messages: 110, responses: 98 },
    { day: 'Sat', messages: 45, responses: 38 },
    { day: 'Sun', messages: 35, responses: 29 }
  ]
};

// Notifications Data
export const notifications = [
  {
    id: 1,
    type: 'campaign',
    title: 'Campaign Performance Alert',
    message: 'Your "Welcome New Followers" campaign has reached 95% engagement rate!',
    timestamp: '2024-07-27T10:30:00Z',
    read: false,
    icon: 'trending-up',
    color: 'green'
  },
  {
    id: 2,
    type: 'instagram',
    title: 'New Instagram Message',
    message: 'You have 3 new direct messages waiting for response.',
    timestamp: '2024-07-27T09:15:00Z',
    read: false,
    icon: 'message-circle',
    color: 'blue'
  },
  {
    id: 3,
    type: 'system',
    title: 'API Rate Limit Warning',
    message: 'You\'ve used 80% of your monthly API calls.',
    timestamp: '2024-07-27T08:45:00Z',
    read: true,
    icon: 'alert-circle',
    color: 'orange'
  },
  {
    id: 4,
    type: 'campaign',
    title: 'Campaign Paused',
    message: 'Support Assistant campaign has been automatically paused due to high error rate.',
    timestamp: '2024-07-26T16:20:00Z',
    read: true,
    icon: 'pause-circle',
    color: 'red'
  },
  {
    id: 5,
    type: 'billing',
    title: 'Billing Reminder',
    message: 'Your Pro plan will renew in 5 days for $29.99.',
    timestamp: '2024-07-26T12:00:00Z',
    read: false,
    icon: 'credit-card',
    color: 'purple'
  }
];

// Messages/Conversations Data
export const recentMessages = [
  {
    id: 1,
    sender: '@sarah_designer',
    message: 'Hi! I\'m interested in your design services. What are your rates?',
    timestamp: '2024-07-27T11:45:00Z',
    status: 'unread',
    automated: false
  },
  {
    id: 2,
    sender: '@mike_entrepreneur',
    message: 'Thanks for the quick response! The pricing looks good.',
    timestamp: '2024-07-27T11:30:00Z',
    status: 'read',
    automated: true,
    botResponse: 'Thanks for your interest! Our design packages start at $299...'
  },
  {
    id: 3,
    sender: '@jenny_startup',
    message: 'Can you help me with my brand identity?',
    timestamp: '2024-07-27T10:15:00Z',
    status: 'read',
    automated: true,
    botResponse: 'I\'d love to help with your brand identity! Let me share some of our work...'
  }
];

// Settings Data
export const settingsData = {
  profile: {
    firstName: 'Alex',
    lastName: 'Johnson',
    email: 'alex.johnson@example.com',
    phone: '+1 (555) 123-4567',
    timezone: 'America/New_York',
    language: 'en',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  },
  notifications: {
    emailNotifications: true,
    pushNotifications: true,
    campaignAlerts: true,
    weeklyReports: true,
    systemUpdates: false
  },
  privacy: {
    profileVisibility: 'public',
    analyticsSharing: false,
    dataRetention: '12months'
  },
  billing: {
    plan: 'Pro',
    billingCycle: 'monthly',
    nextBilling: '2024-08-01',
    amount: 29.99,
    paymentMethod: '**** **** **** 1234'
  },
  apiKeys: [
    {
      id: 1,
      name: 'Production API',
      key: 'pk_live_51H...',
      created: '2024-01-15',
      lastUsed: '2024-07-27',
      status: 'active'
    },
    {
      id: 2,
      name: 'Development API',
      key: 'pk_test_51H...',
      created: '2024-01-15',
      lastUsed: '2024-07-20',
      status: 'active'
    }
  ]
};

// Team/Collaboration Data
export const teamData = [
  {
    id: 1,
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    role: 'Owner',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    joinDate: '2024-01-15',
    status: 'active',
    permissions: ['admin', 'campaigns', 'analytics', 'billing']
  },
  {
    id: 2,
    name: 'Sarah Wilson',
    email: 'sarah.wilson@example.com',
    role: 'Manager',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612e2c2?w=100&h=100&fit=crop&crop=face',
    joinDate: '2024-02-01',
    status: 'active',
    permissions: ['campaigns', 'analytics']
  },
  {
    id: 3,
    name: 'Mike Chen',
    email: 'mike.chen@example.com',
    role: 'Editor',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    joinDate: '2024-03-15',
    status: 'pending',
    permissions: ['campaigns']
  }
];

// Automation Rules Data
export const automationRules = [
  {
    id: 1,
    name: 'Welcome New Followers',
    trigger: 'new_follower',
    action: 'send_message',
    template: 'welcome_message',
    isActive: true,
    delay: 0, // minutes
    conditions: [],
    stats: {
      triggered: 245,
      successful: 240,
      failed: 5
    }
  },
  {
    id: 2,
    name: 'Keyword Response - Pricing',
    trigger: 'keyword_match',
    action: 'send_message',
    template: 'pricing_info',
    isActive: true,
    delay: 2, // minutes
    conditions: [
      { field: 'message_contains', operator: 'includes', value: ['price', 'cost', 'pricing', 'rate'] }
    ],
    stats: {
      triggered: 89,
      successful: 85,
      failed: 4
    }
  },
  {
    id: 3,
    name: 'Follow-up After 24h',
    trigger: 'time_based',
    action: 'send_message',
    template: 'followup_message',
    isActive: false,
    delay: 1440, // 24 hours in minutes
    conditions: [
      { field: 'no_response_for', operator: 'equals', value: 1440 }
    ],
    stats: {
      triggered: 15,
      successful: 12,
      failed: 3
    }
  }
];

export default {
  dashboardStats,
  userProfile,
  instagramAccounts,
  campaigns,
  analyticsData,
  notifications,
  recentMessages,
  settingsData,
  teamData,
  automationRules
};
