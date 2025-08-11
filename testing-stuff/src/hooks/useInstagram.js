import { useState, useEffect } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { toast } from 'react-hot-toast';

export const useInstagram = () => {
  const auth = useAuth(); // Don't destructure, use the full auth object
  const [instagramStatus, setInstagramStatus] = useState({
    connected: false,
    username: null,
    loading: true,
    error: null
  });

  // Circuit breaker to prevent infinite loops
  const [retryCount, setRetryCount] = useState(0);
  const [lastRetryTime, setLastRetryTime] = useState(0);
  const MAX_RETRIES = 3;
  const RETRY_DELAY = 5000; // 5 seconds

  // Backend API base URL
  const API_BASE = import.meta.env.VITE_API_URL || 'https://vibeBot-v1.onrender.com';

  // Check Instagram connection status
  const checkInstagramStatus = async () => {
    try {
      // Circuit breaker: prevent infinite retries
      const now = Date.now();
      if (retryCount >= MAX_RETRIES && (now - lastRetryTime) < RETRY_DELAY) {
        console.warn('⚠️ Instagram status check circuit breaker active - too many retries');
        setInstagramStatus(prev => ({ ...prev, loading: false, error: 'Too many retry attempts' }));
        return;
      }

      // Reset retry count if enough time has passed
      if ((now - lastRetryTime) >= RETRY_DELAY) {
        setRetryCount(0);
      }

      setInstagramStatus(prev => ({ ...prev, loading: true }));
      
      // Check if user is authenticated first
      if (!auth.isSignedIn) {
        setInstagramStatus({
          connected: false,
          username: null,
          loading: false,
          error: 'User not authenticated'
        });
        return;
      }

      const token = await auth.getToken(); // Use auth.getToken() instead of getToken()
      if (!token) {
        setInstagramStatus({
          connected: false,
          username: null,
          loading: false,
          error: 'Authentication token not available'
        });
        return;
      }

      console.log('🔍 Checking Instagram status with URL:', `${API_BASE}/api/user/instagram/status`);
      
      const response = await fetch(`${API_BASE}/api/user/instagram/status`, {
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
        // Reset retry count on success
        setRetryCount(0);
      } else {
        console.error('❌ Instagram status check failed:', response.status, response.statusText);
        setRetryCount(prev => prev + 1);
        setLastRetryTime(now);
        setInstagramStatus({
          connected: false,
          username: null,
          loading: false,
          error: `HTTP ${response.status}: ${response.statusText}`
        });
      }
    } catch (error) {
      console.error('❌ Error checking Instagram status:', error);
      setRetryCount(prev => prev + 1);
      setLastRetryTime(Date.now());
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
      const token = await auth.getToken(); // Fix: use auth.getToken()
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
      
      // Check if user is authenticated first
      if (!auth.isSignedIn) {
        throw new Error('Please login first');
      }
      
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
      
      const token = await auth.getToken(); // Fix: use auth.getToken()
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
      const token = await auth.getToken(); // Fix: use auth.getToken()
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
