import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import SchemaArchitecture from "./SchemaArchitecture";
import {
  Database,
  ArrowRight,
  ArrowDown,
  GitBranch,
  Layers,
  Key,
  Lock,
  Users,
  Instagram,
  BarChart3,
  Settings,
  Activity,
  CreditCard,
  Shield,
  Code,
  FileText,
  Zap,
} from "lucide-react";

const SchemaDataFlow = () => {
  const [selectedFlow, setSelectedFlow] = useState("user-creation");
  const [activeSubTab, setActiveSubTab] = useState("flows");

  const dataFlows = {
    "user-creation": {
      title: "User Creation Flow",
      description: "How a new user is created in the system",
      steps: [
        {
          icon: Users,
          title: "Clerk Authentication",
          description: "User signs up via Clerk",
          color: "blue",
        },
        {
          icon: Database,
          title: "User Document Created",
          description: "MongoDB document with clerkUserId",
          color: "green",
        },
        {
          icon: Settings,
          title: "Default Settings Applied",
          description: "Preferences, subscription (free plan)",
          color: "gray",
        },
        {
          icon: Shield,
          title: "Security Setup",
          description: "Generate referral code, set status",
          color: "red",
        },
      ],
    },
    "instagram-connection": {
      title: "Instagram Connection Flow",
      description: "How Instagram accounts are connected and tokens stored",
      steps: [
        {
          icon: Instagram,
          title: "OAuth Flow",
          description: "User initiates Instagram OAuth",
          color: "pink",
        },
        {
          icon: Key,
          title: "Token Received",
          description: "Access token from Instagram API",
          color: "yellow",
        },
        {
          icon: Lock,
          title: "Token Encryption",
          description: "AES encryption with ENCRYPTION_KEY",
          color: "red",
        },
        {
          icon: Database,
          title: "Account Stored",
          description: "Added to instagramAccounts array",
          color: "green",
        },
      ],
    },
    "automation-trigger": {
      title: "Automation Trigger Flow",
      description: "How automations are triggered and processed",
      steps: [
        {
          icon: Activity,
          title: "Webhook Received",
          description: "Instagram webhook for comment/DM",
          color: "orange",
        },
        {
          icon: Users,
          title: "User Lookup",
          description: "Find user by Instagram account ID",
          color: "blue",
        },
        {
          icon: Zap,
          title: "Rule Matching",
          description: "Check automation rules and keywords",
          color: "purple",
        },
        {
          icon: Database,
          title: "Activity Logged",
          description: "Log trigger and result in activityLog",
          color: "green",
        },
      ],
    },
    "analytics-sync": {
      title: "Analytics Data Sync",
      description: "How analytics data is collected and stored",
      steps: [
        {
          icon: Instagram,
          title: "API Call",
          description: "Fetch Instagram Insights API",
          color: "pink",
        },
        {
          icon: BarChart3,
          title: "Data Processing",
          description: "Process metrics and performance data",
          color: "purple",
        },
        {
          icon: Database,
          title: "Daily Metrics",
          description: "Store in analytics.dailyMetrics array",
          color: "green",
        },
        {
          icon: FileText,
          title: "Report Generation",
          description: "Generate frontend analytics data",
          color: "blue",
        },
      ],
    },
  };

  const relationships = [
    {
      from: "User",
      to: "Instagram Accounts",
      type: "One-to-Many",
      description: "User can have multiple Instagram accounts",
      color: "blue",
    },
    {
      from: "Instagram Account",
      to: "Automation Rules",
      type: "One-to-Many",
      description: "Each account can have multiple automation rules",
      color: "green",
    },
    {
      from: "User",
      to: "Activity Logs",
      type: "One-to-Many",
      description: "User has activity log entries",
      color: "orange",
    },
    {
      from: "User",
      to: "Analytics Metrics",
      type: "One-to-Many",
      description: "User has daily analytics data",
      color: "purple",
    },
    {
      from: "User",
      to: "Subscription",
      type: "One-to-One",
      description: "User has one subscription",
      color: "yellow",
    },
  ];

  const indexes = [
    {
      field: "clerkUserId",
      type: "Unique",
      purpose: "Fast user lookup by Clerk ID",
    },
    {
      field: "email",
      type: "Unique",
      purpose: "User identification and login",
    },
    {
      field: "instagramAccounts.instagramId",
      type: "Standard",
      purpose: "Webhook processing lookup",
    },
    {
      field: "subscription.plan",
      type: "Compound",
      purpose: "Plan-based queries and limits",
    },
    {
      field: "activityLog.timestamp",
      type: "Descending",
      purpose: "Recent activity feeds",
    },
    {
      field: "analytics.lastSyncDate",
      type: "Standard",
      purpose: "Sync status monitoring",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Sub-tab Navigation */}
      <div className="flex justify-center space-x-2">
        <Button
          variant={activeSubTab === "flows" ? "default" : "outline"}
          onClick={() => setActiveSubTab("flows")}
          size="sm"
        >
          <GitBranch className="w-4 h-4 mr-2" />
          Data Flows
        </Button>
        <Button
          variant={activeSubTab === "architecture" ? "default" : "outline"}
          onClick={() => setActiveSubTab("architecture")}
          size="sm"
        >
          <Layers className="w-4 h-4 mr-2" />
          Architecture
        </Button>
      </div>

      {activeSubTab === "architecture" ? (
        <SchemaArchitecture />
      ) : (
        <>
          {/* Data Flow Visualization */}
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-xl text-white flex items-center">
                <GitBranch className="w-6 h-6 mr-2 text-blue-400" />
                Data Flow Diagrams
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 mb-6">
                {Object.entries(dataFlows).map(([key, flow]) => (
                  <Button
                    key={key}
                    variant={selectedFlow === key ? "default" : "outline"}
                    onClick={() => setSelectedFlow(key)}
                    size="sm"
                  >
                    {flow.title}
                  </Button>
                ))}
              </div>

              {selectedFlow && dataFlows[selectedFlow] && (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium text-white mb-2">
                      {dataFlows[selectedFlow].title}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      {dataFlows[selectedFlow].description}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {dataFlows[selectedFlow].steps.map((step, idx) => {
                      const Icon = step.icon;
                      const isLast =
                        idx === dataFlows[selectedFlow].steps.length - 1;

                      return (
                        <div key={idx} className="flex items-center">
                          <div
                            className={`p-4 rounded-lg border bg-${step.color}-500/20 border-${step.color}-500/30 flex-1`}
                          >
                            <div className="flex items-center space-x-3 mb-2">
                              <Icon
                                className={`w-5 h-5 text-${step.color}-400`}
                              />
                              <Badge variant="outline" className="text-xs">
                                Step {idx + 1}
                              </Badge>
                            </div>
                            <h4 className="text-white font-medium text-sm mb-1">
                              {step.title}
                            </h4>
                            <p className="text-gray-400 text-xs">
                              {step.description}
                            </p>
                          </div>
                          {!isLast && (
                            <ArrowRight className="w-6 h-6 text-gray-400 mx-2 hidden lg:block" />
                          )}
                          {!isLast && (
                            <ArrowDown className="w-6 h-6 text-gray-400 my-2 lg:hidden" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Schema Relationships */}
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-xl text-white flex items-center">
                <Layers className="w-6 h-6 mr-2 text-purple-400" />
                Schema Relationships
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {relationships.map((rel, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-lg border bg-${rel.color}-500/20 border-${rel.color}-500/30`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white font-medium">{rel.from}</span>
                      <ArrowRight className="w-4 h-4 text-gray-400" />
                      <span className="text-white font-medium">{rel.to}</span>
                    </div>
                    <Badge variant="outline" className="mb-2">
                      {rel.type}
                    </Badge>
                    <p className="text-gray-400 text-sm">{rel.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Database Indexes */}
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-xl text-white flex items-center">
                <Database className="w-6 h-6 mr-2 text-green-400" />
                Database Indexes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {indexes.map((index, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-gray-900 rounded border border-gray-600"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <code className="text-blue-400 text-sm">
                        {index.field}
                      </code>
                      <Badge variant="outline" className="text-xs">
                        {index.type}
                      </Badge>
                    </div>
                    <p className="text-gray-400 text-sm">{index.purpose}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Schema Statistics */}
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-xl text-white flex items-center">
                <BarChart3 className="w-6 h-6 mr-2 text-yellow-400" />
                Schema Statistics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-gray-900 rounded">
                  <div className="text-2xl font-bold text-blue-400">8</div>
                  <div className="text-gray-400 text-sm">Main Sections</div>
                </div>
                <div className="text-center p-4 bg-gray-900 rounded">
                  <div className="text-2xl font-bold text-green-400">6</div>
                  <div className="text-gray-400 text-sm">Automation Types</div>
                </div>
                <div className="text-center p-4 bg-gray-900 rounded">
                  <div className="text-2xl font-bold text-purple-400">12</div>
                  <div className="text-gray-400 text-sm">Subdocuments</div>
                </div>
                <div className="text-center p-4 bg-gray-900 rounded">
                  <div className="text-2xl font-bold text-orange-400">15+</div>
                  <div className="text-gray-400 text-sm">Indexes</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Code Examples */}
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-xl text-white flex items-center">
                <Code className="w-6 h-6 mr-2 text-cyan-400" />
                Common Query Patterns
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-gray-900 rounded border border-gray-600">
                  <h4 className="text-white font-medium mb-2">
                    Find User by Clerk ID
                  </h4>
                  <code className="text-green-400 text-sm block">
                    User.findByClerkId(clerkUserId)
                  </code>
                </div>

                <div className="p-4 bg-gray-900 rounded border border-gray-600">
                  <h4 className="text-white font-medium mb-2">
                    Get User's Instagram Token
                  </h4>
                  <code className="text-green-400 text-sm block">
                    user.getInstagramToken(accountId)
                  </code>
                </div>

                <div className="p-4 bg-gray-900 rounded border border-gray-600">
                  <h4 className="text-white font-medium mb-2">
                    Find Users with Active Automations
                  </h4>
                  <code className="text-green-400 text-sm block">
                    User.findWithAutomationEnabled()
                  </code>
                </div>

                <div className="p-4 bg-gray-900 rounded border border-gray-600">
                  <h4 className="text-white font-medium mb-2">
                    Add Activity Log
                  </h4>
                  <code className="text-green-400 text-sm block">
                    user.addActivityLog({"{"}type: 'comment_dm_sent',
                    description: '...'{"}"})
                  </code>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default SchemaDataFlow;
