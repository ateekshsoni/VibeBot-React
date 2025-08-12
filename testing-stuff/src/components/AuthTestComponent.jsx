import React, { useState, useEffect } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { useAPI } from '../hooks/useAPI';
import { toast } from 'react-hot-toast';

const AuthTestComponent = () => {
  const { 
    isSignedIn, 
    isLoaded, 
    userId, 
    getToken,
    user 
  } = useAuth();
  
  const { apiCall } = useAPI();
  const [results, setResults] = useState({});
  const [tokenInfo, setTokenInfo] = useState(null);
  const [loading, setLoading] = useState({});

  // Test endpoints based on backend team's list
  const testEndpoints = [
    '/api/user/profile',
    '/api/user/instagram/status', 
    '/api/user/stats',
    '/api/user/automation-settings',
    '/api/backend/sync',
    '/api/backend/health',
    '/api/dashboard',
    '/api/analytics/overview'
  ];

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      loadTokenInfo();
    }
  }, [isLoaded, isSignedIn]);

  const loadTokenInfo = async () => {
    try {
      const token = await getToken();
      if (token) {
        // Parse JWT to show user info (without exposing sensitive data)
        const payload = JSON.parse(atob(token.split('.')[1]));
        setTokenInfo({
          userId: payload.sub,
          issued: new Date(payload.iat * 1000).toLocaleString(),
          expires: new Date(payload.exp * 1000).toLocaleString(),
          preview: token.substring(0, 20) + '...'
        });
      }
    } catch (error) {
      console.error('Failed to load token info:', error);
    }
  };

  const testEndpoint = async (endpoint) => {
    setLoading(prev => ({ ...prev, [endpoint]: true }));
    
    try {
      const data = await apiCall(endpoint);
      setResults(prev => ({
        ...prev,
        [endpoint]: { 
          success: true, 
          data,
          timestamp: new Date().toLocaleTimeString()
        }
      }));
      toast.success(`✅ ${endpoint} works!`);
    } catch (error) {
      const errorMsg = error.response?.data?.error || error.response?.data?.message || error.message;
      setResults(prev => ({
        ...prev,
        [endpoint]: { 
          success: false, 
          error: errorMsg,
          status: error.response?.status,
          timestamp: new Date().toLocaleTimeString()
        }
      }));
      console.error(`❌ ${endpoint} failed:`, error);
    } finally {
      setLoading(prev => ({ ...prev, [endpoint]: false }));
    }
  };

  const testAllEndpoints = async () => {
    for (const endpoint of testEndpoints) {
      await testEndpoint(endpoint);
      // Small delay between requests
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  };

  const clearResults = () => {
    setResults({});
  };

  if (!isLoaded) {
    return (
      <div className="p-4 bg-gray-50 rounded-lg">
        <div className="animate-pulse">Loading authentication state...</div>
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <h3 className="font-semibold text-red-800 mb-2">❌ Authentication Required</h3>
        <p className="text-red-600">Please sign in to test API endpoints.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4 bg-white rounded-lg shadow">
      <div className="border-b pb-4">
        <h2 className="text-xl font-bold text-gray-900 mb-4">🔐 Authentication Test Dashboard</h2>
        
        {/* Authentication Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="bg-green-50 p-3 rounded-lg">
            <h3 className="font-semibold text-green-800 mb-2">Auth Status</h3>
            <div className="space-y-1 text-sm">
              <p>✅ Loaded: {isLoaded ? 'Yes' : 'No'}</p>
              <p>✅ Signed In: {isSignedIn ? 'Yes' : 'No'}</p>
              <p>👤 User ID: {userId || 'None'}</p>
              <p>📧 Email: {user?.primaryEmailAddress?.emailAddress || 'Not available'}</p>
            </div>
          </div>
          
          {tokenInfo && (
            <div className="bg-blue-50 p-3 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-2">Token Info</h3>
              <div className="space-y-1 text-sm">
                <p>🔑 Preview: {tokenInfo.preview}</p>
                <p>📅 Issued: {tokenInfo.issued}</p>
                <p>⏰ Expires: {tokenInfo.expires}</p>
                <p>🆔 Token User ID: {tokenInfo.userId}</p>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={testAllEndpoints}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            disabled={Object.values(loading).some(Boolean)}
          >
            🚀 Test All Endpoints
          </button>
          <button
            onClick={clearResults}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            🗑️ Clear Results
          </button>
          <button
            onClick={loadTokenInfo}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            🔄 Refresh Token Info
          </button>
        </div>
      </div>

      {/* Individual Endpoint Tests */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">🎯 Individual Endpoint Tests</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {testEndpoints.map(endpoint => (
            <div key={endpoint} className="border rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <code className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">
                  {endpoint}
                </code>
                <button
                  onClick={() => testEndpoint(endpoint)}
                  disabled={loading[endpoint]}
                  className={`px-3 py-1 text-sm rounded transition-colors ${
                    loading[endpoint]
                      ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                      : 'bg-blue-500 text-white hover:bg-blue-600'
                  }`}
                >
                  {loading[endpoint] ? '⏳' : '🧪'} Test
                </button>
              </div>
              
              {results[endpoint] && (
                <div className={`mt-2 p-2 rounded text-sm ${
                  results[endpoint].success 
                    ? 'bg-green-50 border border-green-200' 
                    : 'bg-red-50 border border-red-200'
                }`}>
                  <div className="flex items-center justify-between">
                    <span className={`font-semibold ${
                      results[endpoint].success ? 'text-green-800' : 'text-red-800'
                    }`}>
                      {results[endpoint].success ? '✅ Success' : '❌ Failed'}
                    </span>
                    <span className="text-gray-500 text-xs">
                      {results[endpoint].timestamp}
                    </span>
                  </div>
                  
                  {results[endpoint].success ? (
                    <div className="mt-1">
                      <p className="text-green-700">
                        Response: {JSON.stringify(results[endpoint].data).substring(0, 100)}...
                      </p>
                    </div>
                  ) : (
                    <div className="mt-1">
                      <p className="text-red-700">
                        {results[endpoint].status && `Status: ${results[endpoint].status} - `}
                        {results[endpoint].error}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Summary */}
      {Object.keys(results).length > 0 && (
        <div className="border-t pt-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">📊 Test Summary</h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-green-50 p-3 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {Object.values(results).filter(r => r.success).length}
              </div>
              <div className="text-green-800 text-sm">Successful</div>
            </div>
            <div className="bg-red-50 p-3 rounded-lg">
              <div className="text-2xl font-bold text-red-600">
                {Object.values(results).filter(r => !r.success).length}
              </div>
              <div className="text-red-800 text-sm">Failed</div>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {Object.keys(results).length}
              </div>
              <div className="text-blue-800 text-sm">Total Tested</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthTestComponent;
