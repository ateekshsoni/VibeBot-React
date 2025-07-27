import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Instagram, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import { instagramAccounts, userProfile } from '../../data/staticData';

export const InstagramConnection = () => {
  const [isConnected, setIsConnected] = useState(userProfile.instagramConnected);
  const [isConnecting, setIsConnecting] = useState(false);
  const [accountInfo, setAccountInfo] = useState(
    userProfile.instagramConnected ? instagramAccounts[0] : null
  );

  const handleConnect = async () => {
    setIsConnecting(true);
    // Simulate API call
    setTimeout(() => {
      setIsConnected(true);
      setAccountInfo(instagramAccounts[0]);
      setIsConnecting(false);
    }, 2000);
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setAccountInfo(null);
  };

  if (!isConnected) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Instagram className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Connect Your Instagram Account
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Connect your Instagram account to start automating your DMs and managing engagement.
          </p>
          <Button 
            onClick={handleConnect} 
            disabled={isConnecting}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          >
            {isConnecting ? (
              <>
                <Loader className="w-4 h-4 mr-2 animate-spin" />
                Connecting...
              </>
            ) : (
              <>
                <Instagram className="w-4 h-4 mr-2" />
                Connect Instagram
              </>
            )}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Instagram Account</h3>
        <div className="flex items-center text-green-600 dark:text-green-400">
          <CheckCircle className="w-5 h-5 mr-1" />
          <span className="text-sm font-medium">Connected</span>
        </div>
      </div>
      
      <div className="flex items-center space-x-4 mb-4">
        <img 
          src={accountInfo.avatar} 
          alt={accountInfo.displayName}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-white">{accountInfo.username}</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">{accountInfo.displayName}</p>
          <p className="text-xs text-gray-500 dark:text-gray-500">Connected on {new Date(accountInfo.connectionDate).toLocaleDateString()}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{accountInfo.followers.toLocaleString()}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Followers</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{accountInfo.following.toLocaleString()}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Following</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{accountInfo.posts}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Posts</p>
        </div>
      </div>

      <div className="flex space-x-3">
        <Button variant="outline" size="sm" className="flex-1">
          Refresh Data
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleDisconnect}
          className="text-red-600 border-red-300 hover:bg-red-50 dark:text-red-400 dark:border-red-600 dark:hover:bg-red-900/20"
        >
          Disconnect
        </Button>
      </div>
    </div>
  );
};
