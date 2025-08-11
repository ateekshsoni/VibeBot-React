import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

/**
 * SIMPLIFIED Instagram OAuth Callback Handler
 * Handles OAuth redirects without complex dependencies
 */
export const useInstagramCallbackSimple = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    const handleInstagramCallback = async () => {
      try {
        // Don't process multiple times
        if (processing) return;

        // Scenario A: Direct Success
        const instagramSuccess = searchParams.get('instagram_success');
        const username = searchParams.get('username');

        if (instagramSuccess === 'true') {
          console.log('✅ Instagram OAuth SUCCESS detected!');
          toast.success(`🎉 Instagram account @${username} connected successfully!`);
          
          // Clean URL and redirect
          navigate('/dashboard', { replace: true });
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

        // Scenario B: Manual Association (if needed)
        const instagramCallback = searchParams.get('instagram_callback');
        if (instagramCallback === 'true') {
          console.log('🔄 Instagram manual association needed...');
          setProcessing(true);

          try {
            // For now, just redirect to dashboard and let user try again
            toast('Instagram connection needs setup. Please try connecting again.');
            navigate('/dashboard', { replace: true });
          } finally {
            setProcessing(false);
          }
        }
      } catch (error) {
        console.error('❌ Error handling Instagram callback:', error);
        toast.error(`❌ Error processing Instagram connection: ${error.message}`);
        navigate('/dashboard', { replace: true });
        setProcessing(false);
      }
    };

    // Only run once when component mounts
    if (searchParams.toString()) {
      handleInstagramCallback();
    }
  }, [searchParams.toString(), navigate]); // Simple dependency

  return { processing };
};

export default useInstagramCallbackSimple;
