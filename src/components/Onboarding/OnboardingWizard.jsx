import React, { useState } from 'react';
import { Button } from '../ui/button';
import { ChevronRight, ChevronLeft, CheckCircle, Instagram, MessageSquare, BarChart3, Settings } from 'lucide-react';

const onboardingSteps = [
  {
    id: 1,
    title: 'Welcome to InstaFlow!',
    description: 'Let\'s get you set up to automate your Instagram engagement in just a few minutes.',
    icon: CheckCircle,
    content: (
      <div className="text-center">
        <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-10 h-10 text-white" />
        </div>
        <p className="text-gray-600">
          InstaFlow helps you automate DM responses, manage comments, and track engagement 
          to grow your Instagram presence effortlessly.
        </p>
      </div>
    )
  },
  {
    id: 2,
    title: 'Connect Your Instagram',
    description: 'First, let\'s connect your Instagram account to enable automation features.',
    icon: Instagram,
    content: (
      <div className="text-center">
        <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <Instagram className="w-10 h-10 text-white" />
        </div>
        <p className="text-gray-600 mb-4">
          We'll need access to your Instagram Business account to start automating your messages.
        </p>
        <Button className="bg-gradient-to-r from-purple-500 to-pink-500">
          <Instagram className="w-4 h-4 mr-2" />
          Connect Instagram
        </Button>
      </div>
    )
  },
  {
    id: 3,
    title: 'Set Up Auto-Responses',
    description: 'Create your first automated response to welcome new followers.',
    icon: MessageSquare,
    content: (
      <div className="text-center">
        <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <MessageSquare className="w-10 h-10 text-white" />
        </div>
        <p className="text-gray-600 mb-4">
          Set up smart auto-replies for common questions and welcome messages for new followers.
        </p>
        <div className="bg-gray-50 rounded-lg p-4 text-left">
          <p className="text-sm font-medium text-gray-900 mb-2">Sample Auto-Response:</p>
          <p className="text-sm text-gray-600">
            "Hi! Thanks for following us! 👋 We're excited to have you in our community. 
            Feel free to DM us if you have any questions!"
          </p>
        </div>
      </div>
    )
  },
  {
    id: 4,
    title: 'Track Your Performance',
    description: 'Monitor your engagement metrics and optimize your automation strategy.',
    icon: BarChart3,
    content: (
      <div className="text-center">
        <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <BarChart3 className="w-10 h-10 text-white" />
        </div>
        <p className="text-gray-600 mb-4">
          Use our analytics dashboard to track response rates, engagement metrics, and follower growth.
        </p>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="bg-blue-50 rounded-lg p-3">
            <p className="font-semibold text-blue-900">Response Rate</p>
            <p className="text-2xl font-bold text-blue-600">94%</p>
          </div>
          <div className="bg-green-50 rounded-lg p-3">
            <p className="font-semibold text-green-900">Avg. Response Time</p>
            <p className="text-2xl font-bold text-green-600">2.3min</p>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 5,
    title: 'You\'re All Set!',
    description: 'Your InstaFlow account is ready. Start automating your Instagram today!',
    icon: Settings,
    content: (
      <div className="text-center">
        <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-10 h-10 text-white" />
        </div>
        <p className="text-gray-600 mb-6">
          Congratulations! Your InstaFlow account is fully configured and ready to help you 
          automate your Instagram engagement.
        </p>
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-2">Next Steps:</h4>
          <ul className="text-sm text-gray-600 space-y-1 text-left">
            <li>• Create your first campaign</li>
            <li>• Customize your auto-response templates</li>
            <li>• Explore the analytics dashboard</li>
            <li>• Set up notification preferences</li>
          </ul>
        </div>
      </div>
    )
  }
];

export const OnboardingWizard = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const nextStep = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    setIsVisible(false);
    onComplete();
  };

  const handleSkip = () => {
    setIsVisible(false);
    onComplete();
  };

  if (!isVisible) return null;

  const step = onboardingSteps[currentStep];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Progress Bar */}
        <div className="bg-gray-200 h-2">
          <div 
            className="bg-blue-600 h-2 transition-all duration-300"
            style={{ width: `${((currentStep + 1) / onboardingSteps.length) * 100}%` }}
          />
        </div>

        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{step.title}</h2>
              <p className="text-gray-600 mt-1">{step.description}</p>
            </div>
            <div className="text-sm text-gray-500">
              {currentStep + 1} of {onboardingSteps.length}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {step.content}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 flex items-center justify-between">
          <div className="flex space-x-3">
            <Button 
              variant="outline" 
              onClick={handleSkip}
              className="text-gray-600"
            >
              Skip Tour
            </Button>
            {currentStep > 0 && (
              <Button 
                variant="outline" 
                onClick={prevStep}
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back
              </Button>
            )}
          </div>
          
          <Button onClick={nextStep}>
            {currentStep === onboardingSteps.length - 1 ? (
              'Get Started'
            ) : (
              <>
                Next
                <ChevronRight className="w-4 h-4 ml-1" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};
