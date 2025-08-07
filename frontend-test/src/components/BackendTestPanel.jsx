import React, { useState } from 'react';
import { useAuth, useUser } from '@clerk/clerk-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle2, 
  XCircle, 
  Loader2, 
  User, 
  Settings, 
  Instagram,
  Database,
  Shield,
  TestTube,
  Play
} from 'lucide-react';
import api from '@/lib/api';

const BackendTestPanel = () => {
  const { getToken, isSignedIn } = useAuth();
  const { user } = useUser();
  const [tests, setTests] = useState({
    userProfile: { status: 'idle', data: null, error: null },
    userSync: { status: 'idle', data: null, error: null },
    settingsUpdate: { status: 'idle', data: null, error: null },
    instagramStatus: { status: 'idle', data: null, error: null }
  });

  const updateTestStatus = (testName, status, data = null, error = null) => {
    setTests(prev => ({
      ...prev,
      [testName]: { status, data, error }
    }));
  };

  // Test 1: User Profile API
  const testUserProfile = async () => {
    updateTestStatus('userProfile', 'loading');
    
    try {
      const response = await api.get('/user/profile');
      updateTestStatus('userProfile', 'success', response.data);
      console.log('✅ Backend connected:', response.data);
    } catch (error) {
      updateTestStatus('userProfile', 'error', null, error.response?.data?.message || error.message);
      console.log('❌ Backend connection failed:', error);
    }
  };

  // Test 2: User Sync
  const testUserSync = async () => {
    if (!user) {
      updateTestStatus('userSync', 'error', null, 'No user data available');
      return;
    }

    updateTestStatus('userSync', 'loading');
    
    try {
      const response = await api.post('/auth/sync', {
        email: user.emailAddresses[0].emailAddress,
        firstName: user.firstName,
        lastName: user.lastName,
        imageUrl: user.imageUrl
      });
      updateTestStatus('userSync', 'success', response.data);
      console.log('✅ User synced:', response.data);
    } catch (error) {
      updateTestStatus('userSync', 'error', null, error.response?.data?.message || error.message);
      console.log('❌ User sync failed:', error);
    }
  };

  // Test 3: Settings Update
  const testSettingsUpdate = async () => {
    updateTestStatus('settingsUpdate', 'loading');
    
    try {
      const response = await api.put('/user/automation-settings', {
        keywords: ["test", "demo", "price"],
        dmTemplate: "Test message from frontend!",
        isEnabled: true
      });
      updateTestStatus('settingsUpdate', 'success', response.data);
      console.log('✅ Settings updated:', response.data);
    } catch (error) {
      updateTestStatus('settingsUpdate', 'error', null, error.response?.data?.message || error.message);
      console.log('❌ Settings update failed:', error);
    }
  };

  // Test 4: Instagram Status
  const testInstagramStatus = async () => {
    updateTestStatus('instagramStatus', 'loading');
    
    try {
      const response = await api.get('/user/instagram/status');
      updateTestStatus('instagramStatus', 'success', response.data);
      console.log('📱 Instagram status:', response.data.connected ? 'Connected' : 'Not Connected');
    } catch (error) {
      updateTestStatus('instagramStatus', 'error', null, error.response?.data?.message || error.message);
      console.log('❌ Instagram status check failed:', error);
    }
  };

  // Run all tests
  const runAllTests = async () => {
    console.log('🧪 Starting backend integration tests...');
    await testUserProfile();
    await new Promise(resolve => setTimeout(resolve, 500)); // Small delay between tests
    await testUserSync();
    await new Promise(resolve => setTimeout(resolve, 500));
    await testSettingsUpdate();
    await new Promise(resolve => setTimeout(resolve, 500));
    await testInstagramStatus();
    console.log('🏁 All tests completed!');
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'loading':
        return <Loader2 className="h-4 w-4 animate-spin text-blue-500" />;
      case 'success':
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case 'error':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <div className="h-4 w-4 rounded-full bg-gray-600" />;
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'loading':
        return <Badge variant="secondary" className="bg-blue-500/20 text-blue-400">Testing...</Badge>;
      case 'success':
        return <Badge variant="secondary" className="bg-green-500/20 text-green-400">Passed</Badge>;
      case 'error':
        return <Badge variant="secondary" className="bg-red-500/20 text-red-400">Failed</Badge>;
      default:
        return <Badge variant="outline" className="border-gray-600 text-gray-400">Not Tested</Badge>;
    }
  };

  if (!isSignedIn) {
    return (
      <Card className="bg-gray-800/50 border-gray-700">
        <CardContent className="p-6 text-center">
          <Shield className="h-12 w-12 text-gray-500 mx-auto mb-4" />
          <p className="text-gray-400">Please sign in to test backend integration</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-white">
            <TestTube className="h-6 w-6 text-blue-500" />
            Backend Integration Test Panel
          </CardTitle>
          <p className="text-gray-400 text-sm">
            Test your frontend integration with the backend API (https://manychat-with-ai.onrender.com)
          </p>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3">
            <Button 
              onClick={runAllTests}
              className="bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600"
            >
              <Play className="mr-2 h-4 w-4" />
              Run All Tests
            </Button>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Database className="h-4 w-4" />
              Testing with user: {user?.emailAddresses[0]?.emailAddress}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Test Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Test 1: User Profile */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <User className="h-5 w-5 text-blue-500" />
                <h3 className="font-semibold text-white">User Profile</h3>
              </div>
              {getStatusBadge(tests.userProfile.status)}
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2">
              {getStatusIcon(tests.userProfile.status)}
              <span className="text-sm text-gray-400">GET /user/profile</span>
            </div>
            <Button 
              onClick={testUserProfile}
              variant="outline"
              size="sm"
              className="w-full border-gray-600 text-gray-300 hover:bg-gray-700"
              disabled={tests.userProfile.status === 'loading'}
            >
              Test Profile API
            </Button>
            {tests.userProfile.error && (
              <p className="text-red-400 text-xs break-words">{tests.userProfile.error}</p>
            )}
            {tests.userProfile.data && (
              <div className="bg-gray-900/50 p-2 rounded text-xs text-green-400">
                ✅ Profile loaded successfully
              </div>
            )}
          </CardContent>
        </Card>

        {/* Test 2: User Sync */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Database className="h-5 w-5 text-green-500" />
                <h3 className="font-semibold text-white">User Sync</h3>
              </div>
              {getStatusBadge(tests.userSync.status)}
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2">
              {getStatusIcon(tests.userSync.status)}
              <span className="text-sm text-gray-400">POST /auth/sync</span>
            </div>
            <Button 
              onClick={testUserSync}
              variant="outline"
              size="sm"
              className="w-full border-gray-600 text-gray-300 hover:bg-gray-700"
              disabled={tests.userSync.status === 'loading'}
            >
              Test User Sync
            </Button>
            {tests.userSync.error && (
              <p className="text-red-400 text-xs break-words">{tests.userSync.error}</p>
            )}
            {tests.userSync.data && (
              <div className="bg-gray-900/50 p-2 rounded text-xs text-green-400">
                ✅ User synced with MongoDB
              </div>
            )}
          </CardContent>
        </Card>

        {/* Test 3: Settings Update */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-purple-500" />
                <h3 className="font-semibold text-white">Settings Update</h3>
              </div>
              {getStatusBadge(tests.settingsUpdate.status)}
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2">
              {getStatusIcon(tests.settingsUpdate.status)}
              <span className="text-sm text-gray-400">PUT /user/automation-settings</span>
            </div>
            <Button 
              onClick={testSettingsUpdate}
              variant="outline"
              size="sm"
              className="w-full border-gray-600 text-gray-300 hover:bg-gray-700"
              disabled={tests.settingsUpdate.status === 'loading'}
            >
              Test Settings Update
            </Button>
            {tests.settingsUpdate.error && (
              <p className="text-red-400 text-xs break-words">{tests.settingsUpdate.error}</p>
            )}
            {tests.settingsUpdate.data && (
              <div className="bg-gray-900/50 p-2 rounded text-xs text-green-400">
                ✅ Settings saved to MongoDB
              </div>
            )}
          </CardContent>
        </Card>

        {/* Test 4: Instagram Status */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Instagram className="h-5 w-5 text-pink-500" />
                <h3 className="font-semibold text-white">Instagram Status</h3>
              </div>
              {getStatusBadge(tests.instagramStatus.status)}
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2">
              {getStatusIcon(tests.instagramStatus.status)}
              <span className="text-sm text-gray-400">GET /user/instagram/status</span>
            </div>
            <Button 
              onClick={testInstagramStatus}
              variant="outline"
              size="sm"
              className="w-full border-gray-600 text-gray-300 hover:bg-gray-700"
              disabled={tests.instagramStatus.status === 'loading'}
            >
              Test Instagram Status
            </Button>
            {tests.instagramStatus.error && (
              <p className="text-red-400 text-xs break-words">{tests.instagramStatus.error}</p>
            )}
            {tests.instagramStatus.data && (
              <div className="bg-gray-900/50 p-2 rounded text-xs text-green-400">
                📱 Status: {tests.instagramStatus.data.connected ? 'Connected' : 'Not Connected'}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Test Summary */}
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Test Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-green-400">
                {Object.values(tests).filter(t => t.status === 'success').length}
              </div>
              <div className="text-sm text-gray-400">Passed</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-red-400">
                {Object.values(tests).filter(t => t.status === 'error').length}
              </div>
              <div className="text-sm text-gray-400">Failed</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-400">
                {Object.values(tests).filter(t => t.status === 'loading').length}
              </div>
              <div className="text-sm text-gray-400">Running</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-400">
                {Object.values(tests).filter(t => t.status === 'idle').length}
              </div>
              <div className="text-sm text-gray-400">Pending</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BackendTestPanel;
