import React from 'react';
import { useBackendSync } from '../hooks/useBackendSync';
import { useAPI } from '../hooks/useAPI';

const QuickTestComponent = () => {
  const { backendConnected, isBackendSynced } = useBackendSync();
  const { get } = useAPI();

  const testHealth = async () => {
    try {
      const response = await get('/health');
      console.log('✅ Backend Health:', response);
      return true;
    } catch (error) {
      console.error('❌ Backend Health Failed:', error);
      return false;
    }
  };

  return (
    <div className="fixed bottom-4 right-4 bg-black/80 text-white p-4 rounded-lg text-sm">
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${backendConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
          <span>Backend: {backendConnected ? 'Connected' : 'Disconnected'}</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${isBackendSynced ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
          <span>Sync: {isBackendSynced ? 'Complete' : 'Pending'}</span>
        </div>
        <button 
          onClick={testHealth}
          className="text-xs bg-blue-600 px-2 py-1 rounded hover:bg-blue-700"
        >
          Test Health
        </button>
      </div>
    </div>
  );
};

export default QuickTestComponent;
