import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  FileBarChart,
  Download,
  Calendar,
  Filter,
  Mail,
  Share2,
  Clock,
  TrendingUp,
  BarChart3,
  PieChart,
  LineChart,
  Users,
  Target,
  Zap,
  Eye,
  Heart,
  MessageCircle,
  ArrowUp,
  ArrowDown,
  Settings,
  Plus,
  FileText,
  Printer,
  Send,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const AdvancedReports = ({ data, dateRange }) => {
  const [selectedReport, setSelectedReport] = useState('overview');
  const [dateRangeFilter, setDateRangeFilter] = useState('30d');
  const [isGenerating, setIsGenerating] = useState(false);

  const reportTemplates = [
    {
      id: 'overview',
      name: 'Performance Overview',
      description: 'Complete analysis of all metrics and KPIs',
      icon: <BarChart3 className="h-5 w-5" />,
      category: 'Standard',
      estimatedTime: '2-3 minutes',
      lastGenerated: '2024-01-15',
      color: 'blue'
    },
    {
      id: 'engagement',
      name: 'Engagement Deep Dive',
      description: 'Detailed engagement metrics and audience behavior',
      icon: <Heart className="h-5 w-5" />,
      category: 'Analytics',
      estimatedTime: '3-4 minutes',
      lastGenerated: '2024-01-14',
      color: 'red'
    },
    {
      id: 'automation',
      name: 'Automation Performance',
      description: 'ROI and efficiency metrics for all automations',
      icon: <Zap className="h-5 w-5" />,
      category: 'Automation',
      estimatedTime: '2-3 minutes',
      lastGenerated: '2024-01-13',
      color: 'yellow'
    },
    {
      id: 'audience',
      name: 'Audience Analysis',
      description: 'Demographics, growth, and segmentation insights',
      icon: <Users className="h-5 w-5" />,
      category: 'Audience',
      estimatedTime: '4-5 minutes',
      lastGenerated: '2024-01-12',
      color: 'green'
    },
    {
      id: 'content',
      name: 'Content Strategy Report',
      description: 'Content performance and optimization recommendations',
      icon: <FileText className="h-5 w-5" />,
      category: 'Content',
      estimatedTime: '3-4 minutes',
      lastGenerated: '2024-01-11',
      color: 'purple'
    },
    {
      id: 'roi',
      name: 'ROI & Revenue Analysis',
      description: 'Financial performance and return on investment',
      icon: <TrendingUp className="h-5 w-5" />,
      category: 'Business',
      estimatedTime: '5-6 minutes',
      lastGenerated: '2024-01-10',
      color: 'indigo'
    }
  ];

  const recentReports = [
    {
      id: 'report_1',
      name: 'Weekly Performance Summary',
      type: 'Performance Overview',
      generatedAt: '2024-01-15 10:30 AM',
      status: 'completed',
      downloadUrl: '#',
      fileSize: '2.4 MB',
      pages: 24
    },
    {
      id: 'report_2',
      name: 'Automation ROI Analysis',
      type: 'Automation Performance',
      generatedAt: '2024-01-13 2:15 PM',
      status: 'completed',
      downloadUrl: '#',
      fileSize: '1.8 MB',
      pages: 18
    },
    {
      id: 'report_3',
      name: 'Q1 Content Strategy',
      type: 'Content Strategy Report',
      generatedAt: '2024-01-12 9:45 AM',
      status: 'completed',
      downloadUrl: '#',
      fileSize: '3.2 MB',
      pages: 32
    },
    {
      id: 'report_4',
      name: 'Audience Growth Analysis',
      type: 'Audience Analysis',
      generatedAt: '2024-01-10 4:20 PM',
      status: 'completed',
      downloadUrl: '#',
      fileSize: '2.7 MB',
      pages: 28
    }
  ];

  const scheduledReports = [
    {
      id: 'schedule_1',
      name: 'Weekly Performance Report',
      frequency: 'Weekly',
      nextGeneration: '2024-01-22 9:00 AM',
      recipients: ['team@vibebot.com', 'manager@vibebot.com'],
      status: 'active'
    },
    {
      id: 'schedule_2',
      name: 'Monthly Automation Summary',
      frequency: 'Monthly',
      nextGeneration: '2024-02-01 8:00 AM',
      recipients: ['ceo@vibebot.com'],
      status: 'active'
    },
    {
      id: 'schedule_3',
      name: 'Quarterly Business Review',
      frequency: 'Quarterly',
      nextGeneration: '2024-04-01 10:00 AM',
      recipients: ['board@vibebot.com'],
      status: 'paused'
    }
  ];

  const customMetrics = [
    { name: 'Engagement Rate', value: '8.7%', trend: '+12.3%', color: 'green' },
    { name: 'Follower Growth', value: '+2,341', trend: '+5.2%', color: 'blue' },
    { name: 'Automation ROI', value: '324%', trend: '+28.9%', color: 'purple' },
    { name: 'Content Performance', value: '9.2/10', trend: '+0.8', color: 'yellow' },
    { name: 'Revenue Generated', value: '$8,910', trend: '+15.7%', color: 'red' },
    { name: 'Customer Acquisition', value: '234 leads', trend: '+22.1%', color: 'indigo' }
  ];

  const handleGenerateReport = async (reportId) => {
    setIsGenerating(true);
    // Simulate report generation
    setTimeout(() => {
      setIsGenerating(false);
      // Show success message or download
    }, 3000);
  };

  const getColorClasses = (color) => {
    const colors = {
      blue: 'from-blue-500 to-cyan-500',
      red: 'from-red-500 to-pink-500',
      yellow: 'from-yellow-500 to-orange-500',
      green: 'from-green-500 to-emerald-500',
      purple: 'from-purple-500 to-pink-500',
      indigo: 'from-indigo-500 to-blue-500'
    };
    return colors[color] || 'from-gray-500 to-gray-600';
  };

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center space-x-2">
          <select 
            className="bg-gray-800 border border-gray-600 rounded-md px-3 py-2 text-sm text-white"
            value={dateRangeFilter}
            onChange={(e) => setDateRangeFilter(e.target.value)}
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
            <option value="custom">Custom range</option>
          </select>
          
          <Button size="sm" variant="outline" className="border-gray-600 text-gray-300">
            <Filter className="h-4 w-4 mr-2" />
            Advanced Filters
          </Button>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button size="sm" variant="outline" className="border-gray-600 text-gray-300">
            <Plus className="h-4 w-4 mr-2" />
            Custom Report
          </Button>
          <Button size="sm" variant="outline" className="border-gray-600 text-gray-300">
            <Settings className="h-4 w-4 mr-2" />
            Schedule Reports
          </Button>
        </div>
      </div>

      {/* Quick Metrics Overview */}
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-lg text-white flex items-center">
            <BarChart3 className="h-5 w-5 mr-2 text-blue-400" />
            Key Performance Indicators
          </CardTitle>
          <CardDescription>Latest metrics for report generation</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {customMetrics.map((metric, index) => (
              <div key={index} className="bg-gray-800 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 text-sm">{metric.name}</span>
                  <div className="flex items-center text-green-400 text-sm">
                    <ArrowUp className="h-3 w-3 mr-1" />
                    {metric.trend}
                  </div>
                </div>
                <p className="text-2xl font-bold text-white">{metric.value}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Report Templates */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-lg text-white flex items-center">
              <FileBarChart className="h-5 w-5 mr-2 text-green-400" />
              Report Templates
            </CardTitle>
            <CardDescription>Choose from pre-built report templates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {reportTemplates.map((template) => (
                <div 
                  key={template.id} 
                  className={`bg-gray-800 p-4 rounded-lg border cursor-pointer transition-all hover:border-gray-500 ${
                    selectedReport === template.id ? 'border-blue-500' : 'border-gray-700'
                  }`}
                  onClick={() => setSelectedReport(template.id)}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-lg bg-gradient-to-r ${getColorClasses(template.color)} text-white`}>
                      {template.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-white font-medium">{template.name}</h4>
                        <Badge variant="outline" className="text-xs">
                          {template.category}
                        </Badge>
                      </div>
                      <p className="text-gray-400 text-sm mb-2">{template.description}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>Est. time: {template.estimatedTime}</span>
                        <span>Last: {template.lastGenerated}</span>
                      </div>
                    </div>
                  </div>
                  
                  {selectedReport === template.id && (
                    <div className="mt-4 pt-4 border-t border-gray-700">
                      <div className="flex items-center space-x-2">
                        <Button 
                          size="sm" 
                          onClick={() => handleGenerateReport(template.id)}
                          disabled={isGenerating}
                          className="bg-blue-500 hover:bg-blue-600"
                        >
                          {isGenerating ? (
                            <>
                              <div className="animate-spin h-3 w-3 border border-white border-t-transparent rounded-full mr-2" />
                              Generating...
                            </>
                          ) : (
                            <>
                              <Download className="h-3 w-3 mr-2" />
                              Generate Report
                            </>
                          )}
                        </Button>
                        <Button size="sm" variant="outline" className="border-gray-600 text-gray-300">
                          <Eye className="h-3 w-3 mr-2" />
                          Preview
                        </Button>
                        <Button size="sm" variant="outline" className="border-gray-600 text-gray-300">
                          <Mail className="h-3 w-3 mr-2" />
                          Email
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Reports */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-lg text-white flex items-center">
              <Clock className="h-5 w-5 mr-2 text-purple-400" />
              Recent Reports
            </CardTitle>
            <CardDescription>Your recently generated reports</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentReports.map((report) => (
                <div key={report.id} className="bg-gray-800 p-4 rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="text-white font-medium">{report.name}</h4>
                      <p className="text-gray-400 text-sm">{report.type}</p>
                    </div>
                    <Badge 
                      variant={report.status === 'completed' ? 'default' : 'secondary'}
                      className={report.status === 'completed' ? 'bg-green-500/20 text-green-400' : ''}
                    >
                      <CheckCircle className="h-3 w-3 mr-1" />
                      {report.status}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-400 mb-3">
                    <div>
                      <span>Generated:</span>
                      <p className="text-white">{report.generatedAt}</p>
                    </div>
                    <div>
                      <span>Size:</span>
                      <p className="text-white">{report.fileSize} • {report.pages} pages</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button size="sm" variant="outline" className="border-gray-600 text-gray-300">
                      <Download className="h-3 w-3 mr-2" />
                      Download
                    </Button>
                    <Button size="sm" variant="outline" className="border-gray-600 text-gray-300">
                      <Eye className="h-3 w-3 mr-2" />
                      View
                    </Button>
                    <Button size="sm" variant="outline" className="border-gray-600 text-gray-300">
                      <Share2 className="h-3 w-3 mr-2" />
                      Share
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Scheduled Reports */}
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-lg text-white flex items-center">
            <Calendar className="h-5 w-5 mr-2 text-orange-400" />
            Scheduled Reports
          </CardTitle>
          <CardDescription>Automated report generation and delivery</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {scheduledReports.map((schedule) => (
              <div key={schedule.id} className="bg-gray-800 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-white font-medium">{schedule.name}</h4>
                  <Badge 
                    variant={schedule.status === 'active' ? 'default' : 'secondary'}
                    className={schedule.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}
                  >
                    {schedule.status}
                  </Badge>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Frequency:</span>
                    <span className="text-white">{schedule.frequency}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Next Run:</span>
                    <span className="text-white">{schedule.nextGeneration}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Recipients:</span>
                    <div className="mt-1">
                      {schedule.recipients.map((recipient, index) => (
                        <Badge key={index} variant="outline" className="text-xs mr-1 mb-1">
                          {recipient}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 mt-4">
                  <Button size="sm" variant="outline" className="border-gray-600 text-gray-300">
                    <Settings className="h-3 w-3 mr-2" />
                    Edit
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className={schedule.status === 'active' ? 
                      "border-red-500 text-red-400" : 
                      "border-green-500 text-green-400"
                    }
                  >
                    {schedule.status === 'active' ? 'Pause' : 'Activate'}
                  </Button>
                </div>
              </div>
            ))}
            
            {/* Add New Schedule Card */}
            <div className="bg-gray-800 p-4 rounded-lg border-2 border-dashed border-gray-600 flex flex-col items-center justify-center text-center">
              <Plus className="h-8 w-8 text-gray-400 mb-2" />
              <p className="text-gray-400 text-sm mb-3">Create a new scheduled report</p>
              <Button size="sm" variant="outline" className="border-gray-600 text-gray-300">
                <Plus className="h-3 w-3 mr-2" />
                Add Schedule
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Export Options */}
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-lg text-white flex items-center">
            <Download className="h-5 w-5 mr-2 text-blue-400" />
            Export & Sharing Options
          </CardTitle>
          <CardDescription>Choose how to export and share your reports</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button variant="outline" className="border-gray-600 text-gray-300 h-auto p-4 flex flex-col">
              <FileText className="h-8 w-8 mb-2 text-blue-400" />
              <span className="font-medium">PDF Report</span>
              <span className="text-xs text-gray-500">Professional format</span>
            </Button>
            
            <Button variant="outline" className="border-gray-600 text-gray-300 h-auto p-4 flex flex-col">
              <BarChart3 className="h-8 w-8 mb-2 text-green-400" />
              <span className="font-medium">Excel Export</span>
              <span className="text-xs text-gray-500">Raw data analysis</span>
            </Button>
            
            <Button variant="outline" className="border-gray-600 text-gray-300 h-auto p-4 flex flex-col">
              <Printer className="h-8 w-8 mb-2 text-purple-400" />
              <span className="font-medium">Print Version</span>
              <span className="text-xs text-gray-500">Print-optimized</span>
            </Button>
            
            <Button variant="outline" className="border-gray-600 text-gray-300 h-auto p-4 flex flex-col">
              <Send className="h-8 w-8 mb-2 text-orange-400" />
              <span className="font-medium">Email Report</span>
              <span className="text-xs text-gray-500">Direct delivery</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdvancedReports;
