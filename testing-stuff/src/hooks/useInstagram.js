import { useState, useEffect } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { toast } from 'react-hot-toast';
import { API_CONFIG } from '../lib/config';
import { withCircuitBreaker, getCircuitBreakerStatus } from '../utils/circuitBreaker';

export const useInstagram = () => {
  const { getToken, isSignedIn } = useAuth();
  const [instagramStatus, setInstagramStatus] = useState({
    connected: false,
    username: null,
    loading: true,
    error: null
  });

  // Backend API base URL from centralized config
  const API_BASE = API_CONFIG.BASE_URL.replace('/api', '');

  // Check Instagram connection status with circuit breaker protection
  const checkInstagramStatus = async () => {
    try {
      // Check circuit breaker status first
      const breakerStatus = getCircuitBreakerStatus('instagram');
      if (breakerStatus?.isBlocking) {
        console.warn('🚨 Instagram service temporarily unavailable - circuit breaker active');
        setInstagramStatus(prev => ({ 
          ...prev, 
          loading: false, 
          error: 'Service temporarily unavailable - please try again in a few minutes' 
        }));
        return;
      }

      setInstagramStatus(prev => ({ ...prev, loading: true }));
      
      // Check if user is authenticated first
      if (!isSignedIn) {
        setInstagramStatus({
          connected: false,
          username: null,
          loading: false,
          error: 'User not authenticated'
        });
        return;
      }

      const token = await getToken();
      if (!token) {
        setInstagramStatus({
          connected: false,
          username: null,
          loading: false,
          error: 'Authentication token not available'
        });
        return;
      }

      // Use circuit breaker for the API call
      const result = await withCircuitBreaker(
        'instagram',
        async () => {
          console.log('🔍 Checking Instagram status with URL:', `${API_BASE}/api/user/instagram/status`);
          
          const response = await fetch(`${API_BASE}/api/user/instagram/status`, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });

          if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
          }

          return response.json();
        },
        () => {
          // Fallback function
          console.log('📱 Using Instagram status fallback');
          return { connected: false, username: null };
        }
      );

      setInstagramStatus({
        connected: result.connected || false,
        username: result.username || null,
        loading: false,
        error: null
      });

    } catch (error) {
      console.error('❌ Error checking Instagram status:', error);
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
      
      // Check if user is authenticated first
      if (!isSignedIn) {
        throw new Error('Please login first');
      }
      
      // Check circuit breaker
      const breakerStatus = getCircuitBreakerStatus('instagram');
      if (breakerStatus?.isBlocking) {
        throw new Error('Instagram service temporarily unavailable. Please try again in a few minutes.');
      }
      
      // Get user database ID for state parameter with circuit breaker protection
      const userId = await withCircuitBreaker(
        'instagram',
        () => getUserDatabaseId(),
        () => {
          // Fallback: use clerk user ID
          console.log('Using Clerk user ID as fallback');
          return isSignedIn ? `clerk_${Date.now()}` : null;
        }
      );
      
      if (!userId) {
        throw new Error('Unable to get user ID');
      }

      // Meta Console URL with state parameter
      const baseUrl = 'https://www.instagram.com/oauth/authorize';
      const params = new URLSearchParams({
        force_reauth: 'true',
        client_id: '1807810336807413',
        redirect_uri: `${API_BASE}/api/auth/instagram/callback`,
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
      
      const token = await getToken(); // Fixed: use getToken() properly
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
      const token = await getToken(); // Fixed: use getToken() properly
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
