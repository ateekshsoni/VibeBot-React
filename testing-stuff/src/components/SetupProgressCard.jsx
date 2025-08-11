import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Circle, Clock } from 'lucide-react';

/**
 * SetupProgressCard - Shows automation setup progress
 * Based on the setupProgress data from the backend
 */
const SetupProgressCard = ({ stats, loading = false }) => {
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            Setup Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Progress value={0} className="h-2" />
            <div className="space-y-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center gap-3 p-2 bg-gray-50 rounded animate-pulse">
                  <div className="w-5 h-5 bg-gray-300 rounded-full"></div>
                  <div className="h-4 bg-gray-300 rounded w-32"></div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!stats?.setupProgress) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Setup Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Setup progress data not available</p>
        </CardContent>
      </Card>
    );
  }

  const { steps, progress, isComplete } = stats.setupProgress;

  const stepItems = [
    {
      key: 'instagramConnected',
      label: 'Connect Instagram',
      description: 'Link your Instagram Business account',
      completed: steps.instagramConnected,
      icon: '📱'
    },
    {
      key: 'keywordsAdded',
      label: 'Add Keywords',
      description: 'Set trigger words for automation',
      completed: steps.keywordsAdded,
      icon: '🎯'
    },
    {
      key: 'templateCreated',
      label: 'Create DM Template',
      description: 'Design your automated message',
      completed: steps.templateCreated,
      icon: '💬'
    },
    {
      key: 'automationEnabled',
      label: 'Enable Automation',
      description: 'Activate comment-to-DM automation',
      completed: steps.automationEnabled,
      icon: '🚀'
    }
  ];

  const getStepIcon = (completed) => {
    if (completed) {
      return <CheckCircle className="w-5 h-5 text-green-500" />;
    }
    return <Circle className="w-5 h-5 text-gray-400" />;
  };

  const getProgressColor = () => {
    if (progress === 100) return 'bg-green-500';
    if (progress >= 75) return 'bg-blue-500';
    if (progress >= 50) return 'bg-yellow-500';
    return 'bg-orange-500';
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            {isComplete ? (
              <CheckCircle className="w-5 h-5 text-green-500" />
            ) : (
              <Clock className="w-5 h-5 text-blue-500" />
            )}
            Setup Progress
          </CardTitle>
          <Badge variant={isComplete ? 'default' : 'secondary'} className={isComplete ? 'bg-green-500' : ''}>
            {progress}%
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Setup Completion</span>
            <span>{progress}%</span>
          </div>
          <Progress value={progress} className="h-3">
            <div 
              className={`h-full rounded-full transition-all duration-500 ${getProgressColor()}`}
              style={{ width: `${progress}%` }}
            />
          </Progress>
          {isComplete && (
            <p className="text-sm text-green-600 font-medium">
              🎉 Setup complete! Your automation is ready to go.
            </p>
          )}
        </div>

        {/* Setup Steps */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
            Setup Steps
          </h4>
          
          <div className="space-y-2">
            {stepItems.map((step, index) => (
              <div
                key={step.key}
                className={`flex items-start gap-3 p-3 rounded-lg border transition-colors ${
                  step.completed 
                    ? 'bg-green-50 border-green-200' 
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className="flex-shrink-0 mt-0.5">
                  {getStepIcon(step.completed)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{step.icon}</span>
                    <h4 className={`font-medium ${
                      step.completed ? 'text-green-700' : 'text-gray-700'
                    }`}>
                      {step.label}
                    </h4>
                    {step.completed && (
                      <Badge variant="outline" className="text-xs bg-green-100 border-green-300">
                        Complete
                      </Badge>
                    )}
                  </div>
                  <p className={`text-sm mt-1 ${
                    step.completed ? 'text-green-600' : 'text-muted-foreground'
                  }`}>
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Next Steps */}
        {!isComplete && (
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="text-sm font-medium text-blue-800 mb-1">
              Next Step
            </h4>
            <p className="text-sm text-blue-600">
              {!steps.instagramConnected && 'Connect your Instagram Business account to get started.'}
              {steps.instagramConnected && !steps.keywordsAdded && 'Add keywords that will trigger your automation.'}
              {steps.keywordsAdded && !steps.templateCreated && 'Create a DM template for automated responses.'}
              {steps.templateCreated && !steps.automationEnabled && 'Enable automation to start responding to comments.'}
            </p>
          </div>
        )}

        {/* Automation Status */}
        {stats.isEnabled && (
          <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-green-800">
                Automation is active and monitoring comments
              </span>
            </div>
            {stats.lastTriggeredAt && (
              <p className="text-xs text-green-600 mt-1">
                Last triggered: {new Date(stats.lastTriggeredAt).toLocaleString()}
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SetupProgressCard;
