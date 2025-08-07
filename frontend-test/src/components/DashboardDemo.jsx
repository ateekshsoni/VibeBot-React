import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Instagram, 
  WifiOff, 
  RefreshCw, 
  CheckCircle2,
  Activity,
  Zap
} from 'lucide-react'

const DashboardDemo = () => {
  return (
    <div className="space-y-6">
      {/* Backend Connection Error Demo */}
      <Card className="mb-6 border-l-4 border-l-red-500 bg-red-950/20">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <WifiOff className="h-5 w-5 text-red-500" />
              <div>
                <p className="text-sm font-medium text-red-400">
                  Backend Connection Failed
                </p>
                <p className="text-xs text-red-300/80">
                  Unable to connect to VibeBot servers. Please try again later.
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="border-red-500/30 text-red-400 hover:bg-red-500/10"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Retry
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Welcome to VibeBot!</h1>
        <p className="text-muted-foreground">
          Hey User! Let's get your Instagram automation started.
        </p>
      </div>

      {/* Main Connection Card */}
      <Card className="relative overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-purple-500/10 to-orange-500/10" />
        
        <CardContent className="relative p-8 text-center space-y-6">
          {/* Instagram Icon with Animation */}
          <div className="relative mx-auto w-24 h-24 mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-orange-500 rounded-2xl animate-pulse" />
            <div className="relative bg-background rounded-2xl w-full h-full flex items-center justify-center border-2 border-transparent">
              <Instagram className="h-12 w-12 text-pink-500" />
            </div>
          </div>

          {/* Main Message */}
          <div className="space-y-3">
            <h2 className="text-2xl font-bold">Connect Your Instagram Account</h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              To unlock automation, analytics, and messaging features, please connect your Instagram account to VibeBot.
            </p>
          </div>

          {/* Features List */}
          <div className="grid md:grid-cols-3 gap-4 text-left max-w-2xl mx-auto">
            <div className="flex items-start space-x-3">
              <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium">Auto DM Responses</p>
                <p className="text-xs text-muted-foreground">Reply to comments automatically</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium">Analytics Dashboard</p>
                <p className="text-xs text-muted-foreground">Track engagement and growth</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium">Smart Automation</p>
                <p className="text-xs text-muted-foreground">Set up custom workflows</p>
              </div>
            </div>
          </div>

          {/* Connect Button */}
          <Button
            size="lg"
            className="bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            <Instagram className="mr-2 h-5 w-5" />
            Connect Instagram Account
          </Button>

          {/* Security Note */}
          <p className="text-xs text-muted-foreground">
            🔒 Your Instagram account is secured with OAuth 2.0. We never store your password.
          </p>
        </CardContent>
      </Card>

      {/* Quick Info Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6 space-y-3">
            <div className="flex items-center space-x-2 mb-4">
              <Activity className="h-5 w-5 text-blue-500" />
              <h3 className="font-semibold">Account Status</h3>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">VibeBot Account:</span>
              <Badge variant="default">Active</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Instagram:</span>
              <Badge variant="destructive">Not Connected</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Plan:</span>
              <Badge variant="secondary">FREE</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 space-y-3">
            <div className="flex items-center space-x-2 mb-4">
              <Zap className="h-5 w-5 text-yellow-500" />
              <h3 className="font-semibold">Getting Started</h3>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">Account created ✓</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                <span className="text-sm text-muted-foreground">Connect Instagram</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                <span className="text-sm text-muted-foreground">Create first automation</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default DashboardDemo
