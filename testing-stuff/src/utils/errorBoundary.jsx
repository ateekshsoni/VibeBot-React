import React from 'react';
import { toast } from 'react-hot-toast';

class AutomationErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null,
      errorInfo: null,
      retryCount: 0 
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      errorInfo,
      retryCount: this.state.retryCount + 1
    });

    // Log the error for debugging
    console.error('🚨 Automation component error:', error);
    console.error('Error info:', errorInfo);

    // Show user-friendly toast
    if (this.state.retryCount < 3) {
      toast.error('Something went wrong. Attempting to recover...');
    } else {
      toast.error('Unable to load automation features. Please refresh the page.');
    }
  }

  handleRetry = () => {
    this.setState({ 
      hasError: false, 
      error: null, 
      errorInfo: null 
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[400px] flex items-center justify-center">
          <div className="text-center space-y-4 max-w-md">
            <div className="text-6xl mb-4">🤖</div>
            <h2 className="text-xl font-semibold text-gray-900">
              Automation System Temporarily Unavailable
            </h2>
            <p className="text-gray-600">
              Our automation system is experiencing technical difficulties. 
              This is usually temporary.
            </p>
            
            {this.state.retryCount < 3 && (
              <button
                onClick={this.handleRetry}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                🔄 Try Again
              </button>
            )}
            
            {this.state.retryCount >= 3 && (
              <div className="space-y-2">
                <p className="text-sm text-red-600">
                  Multiple recovery attempts failed.
                </p>
                <button
                  onClick={() => window.location.reload()}
                  className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  🔄 Refresh Page
                </button>
              </div>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default AutomationErrorBoundary;
