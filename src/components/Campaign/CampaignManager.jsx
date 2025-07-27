import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Plus, Play, Pause, Edit3, Trash2, BarChart3 } from 'lucide-react';
import { campaigns as initialCampaigns } from '../../data/staticData';

export const CampaignManager = () => {
  const [campaigns, setCampaigns] = useState(initialCampaigns);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const toggleCampaignStatus = (id) => {
    setCampaigns(campaigns.map(campaign => 
      campaign.id === id 
        ? { ...campaign, status: campaign.status === 'active' ? 'paused' : 'active' }
        : campaign
    ));
  };

  const deleteCampaign = (id) => {
    setCampaigns(campaigns.filter(campaign => campaign.id !== id));
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Campaign Management</h3>
        <Button onClick={() => setShowCreateModal(true)}>
          <Plus className="w-4 h-4 mr-2" />
          New Campaign
        </Button>
      </div>

      <div className="space-y-4">
        {campaigns.map((campaign) => (
          <div key={campaign.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-800">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3">
                  <h4 className="font-semibold text-gray-900 dark:text-white">{campaign.name}</h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    campaign.status === 'active' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                      : campaign.status === 'paused'
                      ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                      : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                  }`}>
                    {campaign.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{campaign.description}</p>
                <div className="flex items-center space-x-6 mt-2 text-sm text-gray-500 dark:text-gray-400">
                  <span>{campaign.messagesSent} messages sent</span>
                  <span>{campaign.engagementRate}% engagement</span>
                  <span>Created {new Date(campaign.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => toggleCampaignStatus(campaign.id)}
                >
                  {campaign.status === 'active' ? (
                    <Pause className="w-4 h-4" />
                  ) : (
                    <Play className="w-4 h-4" />
                  )}
                </Button>
                <Button size="sm" variant="outline">
                  <BarChart3 className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="outline">
                  <Edit3 className="w-4 h-4" />
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => deleteCampaign(campaign.id)}
                  className="text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {campaigns.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <BarChart3 className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <p>No campaigns yet. Create your first campaign to get started!</p>
        </div>
      )}
    </div>
  );
};
