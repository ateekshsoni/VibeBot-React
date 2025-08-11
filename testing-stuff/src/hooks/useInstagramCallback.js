import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useInstagram } from '@/hooks/useInstagram';
import { toast } from 'react-hot-toast';

/**
 * Instagram OAuth Callback Handler
 * Handles all three scenarios from the backend team's instructions:
 * 1. Direct Success (instagram_success=true)
 * 2. Manual Association (instagram_callback=true with data)
 * 3. Error Handling (instagram_error)
 */
export const useInstagramCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { associateInstagramData, refreshStatus } = useInstagram();
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    const handleInstagramCallback = async () => {
      try {
        // Scenario A: Direct Success
        const instagramSuccess = searchParams.get('instagram_success');
        const username = searchParams.get('username');

        if (instagramSuccess === 'true') {
          console.log('✅ Instagram OAuth SUCCESS detected!');
          toast.success(`🎉 Instagram account @${username} connected successfully!`);
          
          // Clean URL and refresh status
          navigate('/dashboard', { replace: true });
          await refreshStatus();
          return;
        }

        // Scenario C: Error Handling
        const instagramError = searchParams.get('instagram_error');
        if (instagramError) {
          console.error('❌ Instagram OAuth ERROR detected:', instagramError);
          toast.error(`❌ Instagram connection failed: ${decodeURIComponent(instagramError)}`);
          
          // Clean URL
          navigate('/dashboard', { replace: true });
          return;
        }

        // Scenario B: Manual Association Needed
        const instagramCallback = searchParams.get('instagram_callback');
        if (instagramCallback === 'true') {
          console.log('🔄 Instagram manual association needed...');
          
          if (processing) return; // Prevent duplicate processing
          setProcessing(true);

          const instagramData = {
            instagram_token: searchParams.get('instagram_token'),
            instagram_id: searchParams.get('instagram_id'),
            instagram_username: searchParams.get('instagram_username'),
            instagram_expires: searchParams.get('instagram_expires'),
            instagram_account_type: searchParams.get('instagram_account_type')
          };

          // Validate required data
          if (!instagramData.instagram_token || !instagramData.instagram_id) {
            throw new Error('Missing required Instagram data');
          }

          toast.loading('Connecting your Instagram account...', { id: 'instagram-association' });

          try {
            await associateInstagramData(instagramData);
            toast.success(
              `🎉 Instagram account @${instagramData.instagram_username} connected successfully!`,
              { id: 'instagram-association' }
            );
          } catch (error) {
            toast.error(
              `❌ Failed to connect Instagram: ${error.message}`,
              { id: 'instagram-association' }
            );
          }

          // Clean URL
          navigate('/dashboard', { replace: true });
          setProcessing(false);
        }
      } catch (error) {
        console.error('❌ Error handling Instagram callback:', error);
        toast.error(`❌ Error processing Instagram connection: ${error.message}`);
        navigate('/dashboard', { replace: true });
        setProcessing(false);
      }
    };

    handleInstagramCallback();
  }, [searchParams, navigate, associateInstagramData, refreshStatus, processing]);

  return { processing };
};

export default useInstagramCallback;
