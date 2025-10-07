'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Typography,
  FormControl,
  Select,
  MenuItem,
  CircularProgress,
  Card,
  CardContent,
  Chip,
} from '@mui/material';
import {
  MenuBook,
  Mic,
  Article,
  People,
  Visibility,
  Favorite,
  Share,
  TrendingUp,
} from '@mui/icons-material';
// Layout is now handled by admin/layout.tsx
import StatsCard from '@/components/admin/StatsCard';

// Mock data - replace with real API calls
const mockStats = {
  books: { total: 2, change: 0, trending: 'neutral' as const },
  podcasts: { total: 8, change: 12.5, trending: 'up' as const },
  blogs: { total: 4, change: -2.3, trending: 'down' as const },
  users: { total: 1247, change: 8.2, trending: 'up' as const },
  totalViews: { total: 98765, change: 15.3, trending: 'up' as const },
  totalLikes: { total: 5432, change: 7.8, trending: 'up' as const },
  totalShares: { total: 1234, change: -1.2, trending: 'down' as const },
  engagement: { total: 78.5, change: 3.2, trending: 'up' as const }
};

// Removed unused mock data since we're using a simplified MUI dashboard

export default function AdminDashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('7d');

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
          {/* Header */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
            <Box>
              <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
                Dashboard
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Welcome back, Dr. Syed M Quadri
              </Typography>
            </Box>
            
            {/* Time Range Selector */}
            <FormControl size="small" sx={{ minWidth: 150 }}>
              <Select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                displayEmpty
              >
                <MenuItem value="24h">Last 24 hours</MenuItem>
                <MenuItem value="7d">Last 7 days</MenuItem>
                <MenuItem value="30d">Last 30 days</MenuItem>
                <MenuItem value="90d">Last 90 days</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* Stats Grid */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6} md={3}>
              <StatsCard
                title="Total Books"
                value={mockStats.books.total}
                change={mockStats.books.change}
                trending={mockStats.books.trending}
                icon={MenuBook}
                color="blue"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatsCard
                title="Total Podcasts"
                value={mockStats.podcasts.total}
                change={mockStats.podcasts.change}
                trending={mockStats.podcasts.trending}
                icon={Mic}
                color="green"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatsCard
                title="Total Blogs"
                value={mockStats.blogs.total}
                change={mockStats.blogs.change}
                trending={mockStats.blogs.trending}
                icon={Article}
                color="yellow"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatsCard
                title="Total Users"
                value={mockStats.users.total.toLocaleString()}
                change={mockStats.users.change}
                trending={mockStats.users.trending}
                icon={People}
                color="purple"
              />
            </Grid>
          </Grid>

          {/* Engagement Stats */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6} md={3}>
              <StatsCard
                title="Total Views"
                value={mockStats.totalViews.total.toLocaleString()}
                change={mockStats.totalViews.change}
                trending={mockStats.totalViews.trending}
                icon={Visibility}
                color="indigo"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatsCard
                title="Total Likes"
                value={mockStats.totalLikes.total.toLocaleString()}
                change={mockStats.totalLikes.change}
                trending={mockStats.totalLikes.trending}
                icon={Favorite}
                color="red"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatsCard
                title="Total Shares"
                value={mockStats.totalShares.total.toLocaleString()}
                change={mockStats.totalShares.change}
                trending={mockStats.totalShares.trending}
                icon={Share}
                color="pink"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatsCard
                title="Engagement Rate"
                value={`${mockStats.engagement.total}%`}
                change={mockStats.engagement.change}
                trending={mockStats.engagement.trending}
                icon={TrendingUp}
                color="emerald"
              />
            </Grid>
          </Grid>

          {/* Performance Metrics */}
          <Card sx={{ mb: 4 }}>
            <CardContent>
              <Typography variant="h6" component="h3" gutterBottom>
                Performance Metrics
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={4}>
                  <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'background.default', borderRadius: 2 }}>
                    <Typography variant="h4" component="div" color="primary.main" fontWeight="bold">
                      2.4s
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Avg Load Time
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'background.default', borderRadius: 2 }}>
                    <Typography variant="h4" component="div" color="success.main" fontWeight="bold">
                      98.5%
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Uptime
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'background.default', borderRadius: 2 }}>
                    <Typography variant="h4" component="div" color="secondary.main" fontWeight="bold">
                      4.8/5
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      User Rating
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardContent>
              <Typography variant="h6" component="h3" gutterBottom>
                Quick Actions
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                <Chip label="Add New Blog" color="primary" clickable />
                <Chip label="Upload Podcast" color="secondary" clickable />
                <Chip label="Add Book" color="default" clickable />
                <Chip label="Manage Users" color="default" clickable />
                <Chip label="View Analytics" color="default" clickable />
                <Chip label="Settings" color="default" clickable />
              </Box>
            </CardContent>
          </Card>
        </Box>
  );
}
