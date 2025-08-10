import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  BarChart3,
  TrendingUp,
  Eye,
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  Camera,
  PlayCircle,
  Calendar,
  Clock,
  Users,
  Target,
  ArrowUp,
  ArrowDown,
  Filter,
  Download,
  ExternalLink,
  MoreHorizontal,
  Zap,
  Award,
  Star,
  ThumbsUp,
} from "lucide-react";

const ContentPerformance = ({ data, dateRange }) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState("7d");
  const [selectedContentType, setSelectedContentType] = useState("all");

  const performanceData = {
    overview: {
      totalPosts: 156,
      totalReach: 2456789,
      totalEngagement: 184532,
      avgEngagementRate: 7.5,
      topPerformer: {
        postId: "post_123",
        type: "Reel",
        engagement: 24.8,
        reach: 45678,
      },
    },
    contentTypes: [
      {
        type: "Photos",
        count: 68,
        avgEngagement: 6.2,
        totalReach: 856234,
        totalLikes: 52341,
        totalComments: 3456,
        totalShares: 1234,
        growthRate: 5.8,
        bestTime: "12:00 PM",
      },
      {
        type: "Videos",
        count: 34,
        avgEngagement: 9.4,
        totalReach: 672145,
        totalLikes: 63129,
        totalComments: 5678,
        totalShares: 2890,
        growthRate: 12.3,
        bestTime: "6:00 PM",
      },
      {
        type: "Carousels",
        count: 28,
        avgEngagement: 8.1,
        totalReach: 543678,
        totalLikes: 44056,
        totalComments: 4123,
        totalShares: 1876,
        growthRate: 8.7,
        bestTime: "3:00 PM",
      },
      {
        type: "Stories",
        count: 89,
        avgEngagement: 4.3,
        totalReach: 234567,
        totalLikes: 0,
        totalComments: 0,
        totalShares: 0,
        growthRate: -2.1,
        bestTime: "9:00 AM",
      },
      {
        type: "Reels",
        count: 23,
        avgEngagement: 15.6,
        totalReach: 987654,
        totalLikes: 98765,
        totalComments: 7890,
        totalShares: 4567,
        growthRate: 28.9,
        bestTime: "7:00 PM",
      },
    ],
    topPosts: [
      {
        id: "post_1",
        type: "Reel",
        title: "Morning Workout Routine",
        thumbnail: "/api/placeholder/150/150",
        date: "2024-01-15",
        engagement: 24.8,
        reach: 45678,
        likes: 11234,
        comments: 456,
        shares: 789,
        saves: 234,
      },
      {
        id: "post_2",
        type: "Photo",
        title: "Healthy Breakfast Ideas",
        thumbnail: "/api/placeholder/150/150",
        date: "2024-01-14",
        engagement: 18.5,
        reach: 32145,
        likes: 5943,
        comments: 234,
        shares: 123,
        saves: 567,
      },
      {
        id: "post_3",
        type: "Carousel",
        title: "Weekly Meal Prep Guide",
        thumbnail: "/api/placeholder/150/150",
        date: "2024-01-13",
        engagement: 16.2,
        reach: 28934,
        likes: 4681,
        comments: 189,
        shares: 234,
        saves: 445,
      },
      {
        id: "post_4",
        type: "Video",
        title: "Yoga for Beginners",
        thumbnail: "/api/placeholder/150/150",
        date: "2024-01-12",
        engagement: 14.7,
        reach: 26789,
        likes: 3942,
        comments: 167,
        shares: 89,
        saves: 298,
      },
      {
        id: "post_5",
        type: "Photo",
        title: "Motivational Monday",
        thumbnail: "/api/placeholder/150/150",
        date: "2024-01-11",
        engagement: 12.3,
        reach: 24567,
        likes: 3021,
        comments: 123,
        shares: 67,
        saves: 189,
      },
    ],
    hashtags: [
      { tag: "#fitness", posts: 45, avgEngagement: 8.9, reach: 234567 },
      { tag: "#health", posts: 38, avgEngagement: 7.2, reach: 198765 },
      { tag: "#motivation", posts: 29, avgEngagement: 9.4, reach: 176543 },
      { tag: "#workout", posts: 33, avgEngagement: 8.1, reach: 156789 },
      { tag: "#lifestyle", posts: 25, avgEngagement: 6.8, reach: 145632 },
    ],
    weeklyPerformance: [
      { day: "Monday", posts: 23, engagement: 8.2, reach: 45678 },
      { day: "Tuesday", posts: 19, engagement: 7.8, reach: 42134 },
      { day: "Wednesday", posts: 25, engagement: 9.1, reach: 48923 },
      { day: "Thursday", posts: 21, engagement: 7.5, reach: 41267 },
      { day: "Friday", posts: 28, engagement: 10.3, reach: 52341 },
      { day: "Saturday", posts: 22, engagement: 8.9, reach: 46789 },
      { day: "Sunday", posts: 18, engagement: 7.2, reach: 39876 },
    ],
  };

  const getContentIcon = (type) => {
    switch (type) {
      case "Photos":
        return <Camera className="h-5 w-5" />;
      case "Videos":
        return <PlayCircle className="h-5 w-5" />;
      case "Carousels":
        return <Share2 className="h-5 w-5" />;
      case "Stories":
        return <MessageCircle className="h-5 w-5" />;
      case "Reels":
        return <PlayCircle className="h-5 w-5" />;
      default:
        return <Eye className="h-5 w-5" />;
    }
  };

  const getEngagementColor = (rate) => {
    if (rate >= 10) return "text-green-400";
    if (rate >= 7) return "text-yellow-400";
    return "text-red-400";
  };

  return (
    <div className="space-y-6">
      {/* Filter Controls */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center space-x-2">
          <select
            className="bg-gray-800 border border-gray-600 rounded-md px-3 py-1 text-sm text-white"
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e.target.value)}
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>

          <select
            className="bg-gray-800 border border-gray-600 rounded-md px-3 py-1 text-sm text-white"
            value={selectedContentType}
            onChange={(e) => setSelectedContentType(e.target.value)}
          >
            <option value="all">All Content Types</option>
            <option value="Photos">Photos</option>
            <option value="Videos">Videos</option>
            <option value="Carousels">Carousels</option>
            <option value="Stories">Stories</option>
            <option value="Reels">Reels</option>
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            size="sm"
            variant="outline"
            className="border-gray-600 text-gray-300"
          >
            <Filter className="h-4 w-4 mr-2" />
            Advanced Filters
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="border-gray-600 text-gray-300"
          >
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gray-800/50 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Total Posts</p>
                <p className="text-2xl font-bold text-white">
                  {performanceData.overview.totalPosts}
                </p>
                <p className="text-sm text-green-400">+12 this week</p>
              </div>
              <BarChart3 className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Total Reach</p>
                <p className="text-2xl font-bold text-white">
                  {(performanceData.overview.totalReach / 1000000).toFixed(1)}M
                </p>
                <div className="flex items-center text-green-400 text-sm">
                  <ArrowUp className="h-3 w-3 mr-1" />
                  +8.5% vs last period
                </div>
              </div>
              <Eye className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Total Engagement</p>
                <p className="text-2xl font-bold text-white">
                  {(performanceData.overview.totalEngagement / 1000).toFixed(0)}
                  K
                </p>
                <div className="flex items-center text-green-400 text-sm">
                  <ArrowUp className="h-3 w-3 mr-1" />
                  +12.3% vs last period
                </div>
              </div>
              <Heart className="h-8 w-8 text-red-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Avg Engagement Rate</p>
                <p className="text-2xl font-bold text-white">
                  {performanceData.overview.avgEngagementRate}%
                </p>
                <p className="text-sm text-gray-400">Industry avg: 5.2%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Content Type Performance */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-lg text-white flex items-center">
              <BarChart3 className="h-5 w-5 mr-2 text-blue-400" />
              Content Type Performance
            </CardTitle>
            <CardDescription>
              Performance breakdown by content type
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {performanceData.contentTypes.map((content, index) => (
                <div key={index} className="bg-gray-800 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="text-blue-400">
                        {getContentIcon(content.type)}
                      </div>
                      <div>
                        <h4 className="text-white font-medium">
                          {content.type}
                        </h4>
                        <p className="text-sm text-gray-400">
                          {content.count} posts
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p
                        className={`text-lg font-bold ${getEngagementColor(
                          content.avgEngagement
                        )}`}
                      >
                        {content.avgEngagement}%
                      </p>
                      <div className="flex items-center text-sm">
                        {content.growthRate > 0 ? (
                          <ArrowUp className="h-3 w-3 text-green-400 mr-1" />
                        ) : (
                          <ArrowDown className="h-3 w-3 text-red-400 mr-1" />
                        )}
                        <span
                          className={
                            content.growthRate > 0
                              ? "text-green-400"
                              : "text-red-400"
                          }
                        >
                          {Math.abs(content.growthRate)}%
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3 text-xs">
                    <div>
                      <span className="text-gray-400">Reach:</span>
                      <p className="text-white font-medium">
                        {(content.totalReach / 1000).toFixed(0)}K
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-400">Likes:</span>
                      <p className="text-white font-medium">
                        {(content.totalLikes / 1000).toFixed(1)}K
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-400">Best Time:</span>
                      <p className="text-white font-medium">
                        {content.bestTime}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Performing Hashtags */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-lg text-white flex items-center">
              <Target className="h-5 w-5 mr-2 text-purple-400" />
              Top Performing Hashtags
            </CardTitle>
            <CardDescription>
              Hashtags driving the most engagement
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {performanceData.hashtags.map((hashtag, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center text-purple-400 text-sm font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <p className="text-white font-medium">{hashtag.tag}</p>
                      <p className="text-sm text-gray-400">
                        {hashtag.posts} posts
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-medium">
                      {hashtag.avgEngagement}%
                    </p>
                    <p className="text-sm text-gray-400">
                      {(hashtag.reach / 1000).toFixed(0)}K reach
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Performance Chart */}
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-lg text-white flex items-center">
            <Calendar className="h-5 w-5 mr-2 text-green-400" />
            Weekly Performance Trends
          </CardTitle>
          <CardDescription>
            Performance metrics by day of the week
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-4">
            {performanceData.weeklyPerformance.map((day, index) => {
              const maxReach = Math.max(
                ...performanceData.weeklyPerformance.map((d) => d.reach)
              );
              const reachPercentage = (day.reach / maxReach) * 100;

              return (
                <div key={index} className="text-center">
                  <p className="text-sm text-gray-400 mb-2">
                    {day.day.slice(0, 3)}
                  </p>
                  <div className="bg-gray-700 rounded-lg p-3 space-y-2">
                    <div className="bg-gray-600 rounded h-16 flex items-end justify-center">
                      <div
                        className="bg-gradient-to-t from-green-500 to-emerald-400 rounded-sm w-4 transition-all duration-300"
                        style={{ height: `${reachPercentage}%` }}
                      />
                    </div>
                    <div className="space-y-1 text-xs">
                      <p className="text-white font-medium">
                        {day.posts} posts
                      </p>
                      <p className="text-gray-400">{day.engagement}% eng</p>
                      <p className="text-gray-400">
                        {(day.reach / 1000).toFixed(0)}K reach
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Top Performing Posts */}
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-lg text-white flex items-center">
            <Award className="h-5 w-5 mr-2 text-yellow-400" />
            Top Performing Posts
          </CardTitle>
          <CardDescription>Your best content from {dateRange}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {performanceData.topPosts.map((post, index) => (
              <div key={post.id} className="bg-gray-800 p-4 rounded-lg">
                <div className="flex items-start space-x-4">
                  <div className="relative">
                    <div className="w-20 h-20 bg-gray-700 rounded-lg flex items-center justify-center">
                      {getContentIcon(post.type)}
                    </div>
                    <Badge className="absolute -top-2 -right-2 bg-yellow-500 text-black text-xs">
                      #{index + 1}
                    </Badge>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="text-white font-medium truncate">
                          {post.title}
                        </h4>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {post.type}
                          </Badge>
                          <span className="text-gray-400 text-sm">
                            {post.date}
                          </span>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-gray-400"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-3 text-sm">
                      <div>
                        <span className="text-gray-400">Engagement:</span>
                        <p
                          className={`font-medium ${getEngagementColor(
                            post.engagement
                          )}`}
                        >
                          {post.engagement}%
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-400">Reach:</span>
                        <p className="text-white font-medium">
                          {(post.reach / 1000).toFixed(0)}K
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-400">Likes:</span>
                        <p className="text-white font-medium">
                          {(post.likes / 1000).toFixed(1)}K
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-400">Comments:</span>
                        <p className="text-white font-medium">
                          {post.comments}
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-400">Saves:</span>
                        <p className="text-white font-medium">{post.saves}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 mt-3">
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-gray-600 text-gray-300"
                      >
                        <Eye className="h-3 w-3 mr-1" />
                        View Details
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-gray-600 text-gray-300"
                      >
                        <ExternalLink className="h-3 w-3 mr-1" />
                        View Post
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContentPerformance;
