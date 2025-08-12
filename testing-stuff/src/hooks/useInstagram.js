import { useState, useEffect } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { toast } from 'react-hot-toast';
import { API_CONFIG } from '../lib/config';
import { withCircuitBreaker, getCircuitBreakerStatus } from '../utils/circuitBreaker';
import { useAPI } from './useAPI';

export const useInstagram = () => {
  const { getToken, isSignedIn } = useAuth();
  const { get, post } = useAPI();
  const [instagramStatus, setInstagramStatus] = useState({
    connected: false,
    username: null,
    loading: true,
    error: null
  });

  // Circuit breaker protection for Instagram status checks
  const [circuitBreakerActive, setCircuitBreakerActive] = useState(false);

  // Check Instagram connection status with circuit breaker protection
  const checkInstagramStatus = async () => {
    try {
      // Check circuit breaker status first
      const breakerStatus = getCircuitBreakerStatus('instagram');
      if (breakerStatus?.isBlocking || circuitBreakerActive) {
        console.warn('⚠️ Instagram status check circuit breaker active - too many retries');
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

      // Use circuit breaker for the API call with proper endpoint
      const result = await withCircuitBreaker(
        'instagram',
        async () => {
          // Use the proper useAPI hook with correct endpoint
          const response = await get('/user/instagram/status');
          return response;
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
      
      // Activate local circuit breaker for too many failures
      if (error.message.includes('401') || error.message.includes('authentication')) {
        console.log('🔒 Authentication failed - token may be invalid or expired');
        setCircuitBreakerActive(true);
        // Reset after 5 minutes
        setTimeout(() => setCircuitBreakerActive(false), 300000);
      }
      
      setInstagramStatus({
        connected: false,
        username: null,
        loading: false,
        error: 'Authentication failed'
      });
    }
  };

  // Get user database ID for state parameter
  const getUserDatabaseId = async () => {
    try {
      const response = await get('/user/profile');
      return response.user?._id || response.user?.id;
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
      if (breakerStatus?.isBlocking || circuitBreakerActive) {
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
        redirect_uri: `${API_CONFIG.BASE_URL.replace('/api', '')}/api/auth/instagram/callback`,
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
      
      const result = await post('/auth/instagram/associate', {
        instagram_token: instagramData.instagram_token,
        instagram_id: instagramData.instagram_id,
        instagram_username: instagramData.instagram_username,
        instagram_expires: instagramData.instagram_expires,
        instagram_account_type: instagramData.instagram_account_type
      });
      
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
      await post('/auth/instagram/disconnect');

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

  // Only check Instagram status on mount, not in a loop
  useEffect(() => {
    if (isSignedIn && !circuitBreakerActive) {
      // Only check once on mount to prevent infinite loops
      checkInstagramStatus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSignedIn]); // Only depend on authentication status

  return {
    instagramStatus,
    checkInstagramStatus,
    connectInstagram,
    associateInstagramData,
    disconnectInstagram,
    refreshStatus: checkInstagramStatus
  };
};
