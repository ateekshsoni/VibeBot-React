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
  Users,
  MapPin,
  Clock,
  Heart,
  TrendingUp,
  Globe,
  Calendar,
  Activity,
  UserPlus,
  Target,
  Eye,
  MessageCircle,
  Share2,
  Bookmark,
  Camera,
  PlayCircle,
  ArrowUp,
  ArrowDown,
  Filter,
  Download,
} from "lucide-react";

const AudienceInsights = ({ data, dateRange }) => {
  const [selectedSegment, setSelectedSegment] = useState("all");

  const audienceData = {
    overview: {
      totalFollowers: 45678,
      newFollowers: 2341,
      followerGrowth: 5.2,
      engagementRate: 8.7,
      activeFollowers: 32145,
      averageAge: 28.5,
      genderSplit: { male: 42, female: 56, other: 2 },
    },
    demographics: {
      ageGroups: [
        { range: "18-24", percentage: 28, count: 12790 },
        { range: "25-34", percentage: 35, count: 15987 },
        { range: "35-44", percentage: 22, count: 10049 },
        { range: "45-54", percentage: 12, count: 5481 },
        { range: "55+", percentage: 3, count: 1371 },
      ],
      topLocations: [
        { country: "United States", percentage: 42, count: 19185 },
        { country: "Canada", percentage: 18, count: 8222 },
        { country: "United Kingdom", percentage: 15, count: 6852 },
        { country: "Australia", percentage: 12, count: 5481 },
        { country: "Germany", percentage: 8, count: 3654 },
        { country: "Other", percentage: 5, count: 2284 },
      ],
      languages: [
        { language: "English", percentage: 78 },
        { language: "Spanish", percentage: 12 },
        { language: "French", percentage: 6 },
        { language: "German", percentage: 4 },
      ],
    },
    behavior: {
      activeHours: [
        { hour: 6, activity: 15 },
        { hour: 7, activity: 25 },
        { hour: 8, activity: 45 },
        { hour: 9, activity: 65 },
        { hour: 10, activity: 80 },
        { hour: 11, activity: 85 },
        { hour: 12, activity: 90 },
        { hour: 13, activity: 75 },
        { hour: 14, activity: 70 },
        { hour: 15, activity: 85 },
        { hour: 16, activity: 95 },
        { hour: 17, activity: 100 },
        { hour: 18, activity: 95 },
        { hour: 19, activity: 85 },
        { hour: 20, activity: 75 },
        { hour: 21, activity: 60 },
        { hour: 22, activity: 40 },
        { hour: 23, activity: 25 },
      ],
      topInterests: [
        { interest: "Fitness & Health", percentage: 42 },
        { interest: "Technology", percentage: 38 },
        { interest: "Travel", percentage: 35 },
        { interest: "Food & Cooking", percentage: 32 },
        { interest: "Fashion", percentage: 28 },
        { interest: "Music", percentage: 25 },
        { interest: "Sports", percentage: 22 },
        { interest: "Photography", percentage: 20 },
      ],
      contentPreferences: [
        { type: "Photos", engagement: 8.5, count: 1234 },
        { type: "Videos", engagement: 12.3, count: 567 },
        { type: "Carousels", engagement: 9.8, count: 234 },
        { type: "Stories", engagement: 6.7, count: 2345 },
        { type: "Reels", engagement: 15.2, count: 345 },
      ],
    },
    segments: [
      {
        id: "highly_engaged",
        name: "Highly Engaged",
        description: "Users who interact frequently",
        count: 5678,
        percentage: 12.4,
        avgEngagement: 15.8,
        color: "green",
      },
      {
        id: "new_followers",
        name: "New Followers",
        description: "Followed in last 30 days",
        count: 2341,
        percentage: 5.1,
        avgEngagement: 6.2,
        color: "blue",
      },
      {
        id: "influencers",
        name: "Micro-Influencers",
        description: "High follower count users",
        count: 456,
        percentage: 1.0,
        avgEngagement: 22.4,
        color: "purple",
      },
      {
        id: "potential_customers",
        name: "Potential Customers",
        description: "Showed purchase intent",
        count: 3456,
        percentage: 7.6,
        avgEngagement: 11.2,
        color: "orange",
      },
    ],
  };

  const getSegmentColor = (segment) => {
    const colors = {
      green: "from-green-500 to-emerald-500",
      blue: "from-blue-500 to-cyan-500",
      purple: "from-purple-500 to-pink-500",
      orange: "from-orange-500 to-red-500",
    };
    return colors[segment] || "from-gray-500 to-gray-600";
  };

  return (
    <div className="space-y-6">
      {/* Filter and Export Options */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button
            size="sm"
            variant="outline"
            className="border-gray-600 text-gray-300"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filter Audience
          </Button>
          <select className="bg-gray-800 border border-gray-600 rounded-md px-3 py-1 text-sm text-white">
            <option value="all">All Segments</option>
            {audienceData.segments.map((segment) => (
              <option key={segment.id} value={segment.id}>
                {segment.name}
              </option>
            ))}
          </select>
        </div>
        <Button
          size="sm"
          variant="outline"
          className="border-gray-600 text-gray-300"
        >
          <Download className="h-4 w-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gray-800/50 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Total Followers</p>
                <p className="text-2xl font-bold text-white">
                  {audienceData.overview.totalFollowers.toLocaleString()}
                </p>
                <div className="flex items-center text-green-400 text-sm">
                  <ArrowUp className="h-3 w-3 mr-1" />+
                  {audienceData.overview.newFollowers.toLocaleString()} this
                  month
                </div>
              </div>
              <Users className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Engagement Rate</p>
                <p className="text-2xl font-bold text-white">
                  {audienceData.overview.engagementRate}%
                </p>
                <div className="flex items-center text-green-400 text-sm">
                  <ArrowUp className="h-3 w-3 mr-1" />+
                  {audienceData.overview.followerGrowth}% growth
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
                <p className="text-sm text-gray-400">Active Followers</p>
                <p className="text-2xl font-bold text-white">
                  {audienceData.overview.activeFollowers.toLocaleString()}
                </p>
                <p className="text-sm text-gray-400">
                  {(
                    (audienceData.overview.activeFollowers /
                      audienceData.overview.totalFollowers) *
                    100
                  ).toFixed(1)}
                  % of total
                </p>
              </div>
              <Activity className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Average Age</p>
                <p className="text-2xl font-bold text-white">
                  {audienceData.overview.averageAge}
                </p>
                <p className="text-sm text-gray-400">
                  {audienceData.overview.genderSplit.female}% F •{" "}
                  {audienceData.overview.genderSplit.male}% M
                </p>
              </div>
              <Target className="h-8 w-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Age Demographics */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-lg text-white flex items-center">
              <Users className="h-5 w-5 mr-2 text-blue-400" />
              Age Demographics
            </CardTitle>
            <CardDescription>Age distribution of your audience</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {audienceData.demographics.ageGroups.map((group, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-16 text-sm text-gray-300">
                    {group.range}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-white">{group.percentage}%</span>
                      <span className="text-gray-400">
                        {group.count.toLocaleString()}
                      </span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${group.percentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Locations */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-lg text-white flex items-center">
              <MapPin className="h-5 w-5 mr-2 text-green-400" />
              Top Locations
            </CardTitle>
            <CardDescription>
              Geographic distribution of followers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {audienceData.demographics.topLocations.map((location, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-20 text-sm text-gray-300">
                    {location.country}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-white">{location.percentage}%</span>
                      <span className="text-gray-400">
                        {location.count.toLocaleString()}
                      </span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${location.percentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Activity Hours */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-lg text-white flex items-center">
              <Clock className="h-5 w-5 mr-2 text-orange-400" />
              Peak Activity Hours
            </CardTitle>
            <CardDescription>When your audience is most active</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-6 gap-2">
              {audienceData.behavior.activeHours.map((hour, index) => (
                <div key={index} className="text-center">
                  <div className="text-xs text-gray-400 mb-1">
                    {hour.hour}:00
                  </div>
                  <div className="bg-gray-700 rounded h-16 flex items-end justify-center">
                    <div
                      className="bg-gradient-to-t from-orange-500 to-yellow-400 rounded-sm w-4 transition-all duration-300"
                      style={{ height: `${hour.activity}%` }}
                    />
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {hour.activity}%
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Interests */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-lg text-white flex items-center">
              <Heart className="h-5 w-5 mr-2 text-red-400" />
              Top Interests
            </CardTitle>
            <CardDescription>What your audience cares about</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {audienceData.behavior.topInterests.map((interest, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-gray-300 text-sm">
                    {interest.interest}
                  </span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-red-500 to-pink-500 h-2 rounded-full"
                        style={{ width: `${interest.percentage}%` }}
                      />
                    </div>
                    <span className="text-white text-sm w-8">
                      {interest.percentage}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Content Preferences */}
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-lg text-white flex items-center">
            <Eye className="h-5 w-5 mr-2 text-purple-400" />
            Content Performance by Type
          </CardTitle>
          <CardDescription>
            How different content types perform with your audience
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {audienceData.behavior.contentPreferences.map((content, index) => {
              const getIcon = (type) => {
                switch (type) {
                  case "Photos":
                    return <Camera className="h-6 w-6" />;
                  case "Videos":
                    return <PlayCircle className="h-6 w-6" />;
                  case "Carousels":
                    return <Share2 className="h-6 w-6" />;
                  case "Stories":
                    return <MessageCircle className="h-6 w-6" />;
                  case "Reels":
                    return <PlayCircle className="h-6 w-6" />;
                  default:
                    return <Eye className="h-6 w-6" />;
                }
              };

              return (
                <div
                  key={index}
                  className="bg-gray-800 p-4 rounded-lg text-center"
                >
                  <div className="text-purple-400 mb-2 flex justify-center">
                    {getIcon(content.type)}
                  </div>
                  <h4 className="text-white font-medium text-sm mb-1">
                    {content.type}
                  </h4>
                  <p className="text-2xl font-bold text-white mb-1">
                    {content.engagement}%
                  </p>
                  <p className="text-xs text-gray-400">{content.count} posts</p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Audience Segments */}
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-lg text-white flex items-center">
            <Target className="h-5 w-5 mr-2 text-blue-400" />
            Audience Segments
          </CardTitle>
          <CardDescription>
            Different groups within your audience
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {audienceData.segments.map((segment, index) => (
              <div key={index} className="bg-gray-800 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`p-2 rounded-lg bg-gradient-to-r ${getSegmentColor(
                      segment.color
                    )} text-white`}
                  >
                    <Users className="h-5 w-5" />
                  </div>
                  <Badge
                    variant="outline"
                    className={`bg-${segment.color}-500/10 text-${segment.color}-400 border-${segment.color}-500/30`}
                  >
                    {segment.percentage}% of audience
                  </Badge>
                </div>

                <h4 className="text-white font-medium mb-1">{segment.name}</h4>
                <p className="text-gray-400 text-sm mb-3">
                  {segment.description}
                </p>

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-gray-400">Count:</span>
                    <p className="text-white font-medium">
                      {segment.count.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-400">Avg Engagement:</span>
                    <p className="text-white font-medium">
                      {segment.avgEngagement}%
                    </p>
                  </div>
                </div>

                <Button
                  size="sm"
                  variant="outline"
                  className="w-full mt-3 border-gray-600 text-gray-300"
                >
                  View Segment Details
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AudienceInsights;
