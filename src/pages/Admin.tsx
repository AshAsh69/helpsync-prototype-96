import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  MessageCircle, 
  Calendar, 
  TrendingUp, 
  Activity,
  AlertCircle,
  Shield,
  BarChart3,
  Eye,
  Heart,
  UserPlus
} from 'lucide-react';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';

interface AnalyticsData {
  totalUsers: number;
  activeUsers: number;
  totalPosts: number;
  totalMessages: number;
  totalEvents: number;
  helpRequestsFulfilled: number;
  userGrowth: number;
  engagementRate: number;
}

interface RecentActivity {
  id: string;
  type: 'user_join' | 'post_created' | 'help_offered' | 'event_created' | 'message_sent';
  description: string;
  timestamp: string;
  user: string;
  severity?: 'low' | 'medium' | 'high';
}

const Admin = () => {
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalUsers: 2847,
    activeUsers: 1923,
    totalPosts: 456,
    totalMessages: 8932,
    totalEvents: 78,
    helpRequestsFulfilled: 342,
    userGrowth: 12.5,
    engagementRate: 68.4
  });

  const [recentActivity] = useState<RecentActivity[]>([
    {
      id: '1',
      type: 'help_offered',
      description: 'Sarah offered help for emergency food assistance request',
      timestamp: '2 minutes ago',
      user: 'Sarah Johnson',
      severity: 'high'
    },
    {
      id: '2',
      type: 'user_join',
      description: 'New user joined the platform',
      timestamp: '5 minutes ago',
      user: 'Michael Chen'
    },
    {
      id: '3',
      type: 'post_created',
      description: 'New help request posted for tutoring assistance',
      timestamp: '8 minutes ago',
      user: 'Emma Wilson',
      severity: 'medium'
    },
    {
      id: '4',
      type: 'event_created',
      description: 'Community food drive event scheduled',
      timestamp: '12 minutes ago',
      user: 'Austin Food Bank',
      severity: 'medium'
    },
    {
      id: '5',
      type: 'message_sent',
      description: 'Connection made between helper and requester',
      timestamp: '15 minutes ago',
      user: 'System'
    }
  ]);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'user_join': return <UserPlus className="w-4 h-4 text-green-500" />;
      case 'post_created': return <MessageCircle className="w-4 h-4 text-blue-500" />;
      case 'help_offered': return <Heart className="w-4 h-4 text-red-500" />;
      case 'event_created': return <Calendar className="w-4 h-4 text-purple-500" />;
      case 'message_sent': return <MessageCircle className="w-4 h-4 text-orange-500" />;
      default: return <Activity className="w-4 h-4 text-gray-500" />;
    }
  };

  const getSeverityColor = (severity?: string) => {
    switch (severity) {
      case 'high': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'low': return 'bg-green-500/20 text-green-400 border-green-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gradient">Admin Dashboard</h1>
            <p className="text-muted-foreground">Monitor and manage platform activity</p>
          </div>
          <Badge variant="secondary" className="text-sm">
            <Shield className="w-4 h-4 mr-1" />
            Administrator
          </Badge>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card className="card-gradient">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{analytics.totalUsers.toLocaleString()}</div>
                    <p className="text-xs text-muted-foreground">
                      <span className="text-green-500">+{analytics.userGrowth}%</span> from last month
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="card-gradient">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                    <Activity className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{analytics.activeUsers.toLocaleString()}</div>
                    <p className="text-xs text-muted-foreground">
                      {((analytics.activeUsers / analytics.totalUsers) * 100).toFixed(1)}% of total users
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card className="card-gradient">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Help Requests</CardTitle>
                    <MessageCircle className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{analytics.totalPosts}</div>
                    <p className="text-xs text-muted-foreground">
                      {analytics.helpRequestsFulfilled} fulfilled this month
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Card className="card-gradient">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Engagement Rate</CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{analytics.engagementRate}%</div>
                    <Progress value={analytics.engagementRate} className="mt-2" />
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="card-gradient">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground">
                          {activity.description}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <p className="text-xs text-muted-foreground">
                            {activity.user} • {activity.timestamp}
                          </p>
                          {activity.severity && (
                            <Badge variant="outline" className={`text-xs ${getSeverityColor(activity.severity)}`}>
                              {activity.severity}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="card-gradient">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Platform Health
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Server Uptime</span>
                      <span className="text-sm text-green-500 font-medium">99.9%</span>
                    </div>
                    <Progress value={99.9} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Response Time</span>
                      <span className="text-sm text-blue-500 font-medium">245ms</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Success Rate</span>
                      <span className="text-sm text-green-500 font-medium">98.7%</span>
                    </div>
                    <Progress value={98.7} className="h-2" />
                  </div>

                  <div className="pt-4 border-t border-border">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Eye className="w-4 h-4" />
                      <span>Last updated: 2 minutes ago</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users">
            <Card className="card-gradient">
              <CardHeader>
                <CardTitle>User Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">User Management Panel</h3>
                  <p className="text-muted-foreground mb-4">Manage user accounts, roles, and permissions</p>
                  <Button variant="outline">Coming Soon</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="content">
            <Card className="card-gradient">
              <CardHeader>
                <CardTitle>Content Moderation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <MessageCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">Content Moderation Tools</h3>
                  <p className="text-muted-foreground mb-4">Review and manage posts, comments, and reported content</p>
                  <Button variant="outline">Coming Soon</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <Card className="card-gradient">
              <CardHeader>
                <CardTitle>Security & Monitoring</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Shield className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">Security Dashboard</h3>
                  <p className="text-muted-foreground mb-4">Monitor security events, manage access controls, and view audit logs</p>
                  <Button variant="outline">Coming Soon</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Admin;