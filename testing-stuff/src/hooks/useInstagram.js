import { useState, useEffect } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { toast } from 'react-hot-toast';

export const useInstagram = () => {
  const { getToken } = useAuth();
  const [instagramStatus, setInstagramStatus] = useState({
    connected: false,
    username: null,
    loading: true,
    error: null
  });

  // Backend API base URL
  const API_BASE = import.meta.env.VITE_API_URL || 'https://vibeBot-v1.onrender.com';

  // Check Instagram connection status
  const checkInstagramStatus = async () => {
    try {
      setInstagramStatus(prev => ({ ...prev, loading: true }));
      
      const token = await getToken();
      if (!token) {
        setInstagramStatus({
          connected: false,
          username: null,
          loading: false,
          error: 'Authentication required'
        });
        return;
      }

      const response = await fetch(`${API_BASE}/api/instagram/status`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setInstagramStatus({
          connected: data.connected || false,
          username: data.username || null,
          loading: false,
          error: null
        });
      } else {
        setInstagramStatus({
          connected: false,
          username: null,
          loading: false,
          error: 'Failed to check status'
        });
      }
    } catch (error) {
      console.error('Error checking Instagram status:', error);
      setInstagramStatus({
        connected: false,
        username: null,
        loading: false,
        error: error.message
      });
    }
  };

  // Get user database ID for state parameter
  const getUserDatabaseId = async () => {
    try {
      const token = await getToken();
      if (!token) throw new Error('No authentication token');

      const response = await fetch(`${API_BASE}/api/user/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to get user profile');
      }

      const data = await response.json();
      return data.user?._id || data.user?.id;
    } catch (error) {
      console.error('Error getting user database ID:', error);
      throw error;
    }
  };

  // Connect to Instagram using direct Meta Console URL
  const connectInstagram = async () => {
    try {
      console.log('🔄 Starting Instagram connection...');
      
      // Get user database ID for state parameter
      const userId = await getUserDatabaseId();
      if (!userId) {
        throw new Error('Unable to get user ID');
      }

      // Meta Console URL with state parameter
      const baseUrl = 'https://www.instagram.com/oauth/authorize';
      const params = new URLSearchParams({
        force_reauth: 'true',
        client_id: '1807810336807413',
        redirect_uri: 'https://vibeBot-v1.onrender.com/api/auth/instagram/callback',
        response_type: 'code',
        scope: 'instagram_business_basic,instagram_business_manage_messages,instagram_business_manage_comments,instagram_business_content_publish,instagram_business_manage_insights',
        state: `user_${userId}_${Date.now()}`
      });

      const instagramOAuthUrl = `${baseUrl}?${params.toString()}`;
      
      console.log('🚀 Redirecting to Instagram OAuth:', instagramOAuthUrl);
      toast.success('Redirecting to Instagram...');
      
      // Direct redirect to Instagram OAuth
      window.location.href = instagramOAuthUrl;
      
    } catch (error) {
      console.error('❌ Failed to initiate Instagram connection:', error);
      toast.error(`Failed to connect Instagram: ${error.message}`);
      throw error;
    }
  };

  // Associate Instagram data with user (Scenario B)
  const associateInstagramData = async (instagramData) => {
    try {
      console.log('🔄 Associating Instagram data with user...');
      
      const token = await getToken();
      if (!token) {
        throw new Error('Authentication required');
      }

      const response = await fetch(`${API_BASE}/api/auth/instagram/associate`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          instagram_token: instagramData.instagram_token,
          instagram_id: instagramData.instagram_id,
          instagram_username: instagramData.instagram_username,
          instagram_expires: instagramData.instagram_expires,
          instagram_account_type: instagramData.instagram_account_type
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to associate Instagram account');
      }

      const result = await response.json();
      
      // Update status after successful association
      await checkInstagramStatus();
      
      return result;
    } catch (error) {
      console.error('❌ Failed to associate Instagram data:', error);
      throw error;
    }
  };

  // Disconnect Instagram
  const disconnectInstagram = async () => {
    try {
      const token = await getToken();
      if (!token) throw new Error('Authentication required');

      const response = await fetch(`${API_BASE}/api/auth/instagram/disconnect`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to disconnect Instagram');
      }

      // Update status after disconnection
      setInstagramStatus({
        connected: false,
        username: null,
        loading: false,
        error: null
      });

      toast.success('Instagram account disconnected');
    } catch (error) {
      console.error('❌ Failed to disconnect Instagram:', error);
      toast.error(`Failed to disconnect: ${error.message}`);
      throw error;
    }
  };

  return {
    instagramStatus,
    checkInstagramStatus,
    connectInstagram,
    associateInstagramData,
    disconnectInstagram,
    refreshStatus: checkInstagramStatus
  };
};
