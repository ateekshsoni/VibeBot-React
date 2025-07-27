import React from 'react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { analyticsData } from '../../data/staticData';

export const EngagementChart = () => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
    <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Engagement Overview</h3>
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={analyticsData.engagementOverTime}>
        <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
        <XAxis dataKey="date" className="text-gray-600 dark:text-gray-400" />
        <YAxis className="text-gray-600 dark:text-gray-400" />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: 'white', 
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
          }}
        />
        <Area
          type="monotone"
          dataKey="messages"
          stackId="1"
          stroke="#3B82F6"
          fill="#3B82F6"
          fillOpacity={0.6}
          name="Messages"
        />
        <Area
          type="monotone"
          dataKey="responses"
          stackId="1"
          stroke="#10B981"
          fill="#10B981"
          fillOpacity={0.6}
          name="Responses"
        />
      </AreaChart>
    </ResponsiveContainer>
  </div>
);

export const FollowerGrowthChart = () => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
    <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Follower Growth</h3>
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={analyticsData.engagementOverTime}>
        <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
        <XAxis dataKey="date" className="text-gray-600 dark:text-gray-400" />
        <YAxis className="text-gray-600 dark:text-gray-400" />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: 'white', 
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
          }}
        />
        <Line 
          type="monotone" 
          dataKey="followers" 
          stroke="#8B5CF6" 
          strokeWidth={3}
          dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 6 }}
          name="Followers"
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

export const CampaignDistributionChart = () => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
    <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Campaign Distribution</h3>
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={analyticsData.campaignDistribution}
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        >
          {analyticsData.campaignDistribution.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  </div>
);

export const ResponseTimeChart = () => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
    <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Average Response Time</h3>
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={analyticsData.responseTimeData}>
        <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
        <XAxis dataKey="time" className="text-gray-600 dark:text-gray-400" />
        <YAxis className="text-gray-600 dark:text-gray-400" />
        <Tooltip 
          formatter={(value) => [`${value} min`, 'Response Time']}
          contentStyle={{ 
            backgroundColor: 'white', 
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
          }}
        />
        <Bar dataKey="avgResponse" fill="#F59E0B" />
      </BarChart>
    </ResponsiveContainer>
  </div>
);
