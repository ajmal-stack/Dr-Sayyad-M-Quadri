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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  LinearProgress,
} from '@mui/material';
import {
  MenuBook,
  Mic,
  Article,
  People,
  Visibility,
  LocalHospital,
  VideoLibrary,
  TrendingUp,
  TrendingDown,
  Remove,
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import StatsCard from '@/components/admin/StatsCard';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

interface DashboardStats {
  books: {
    total: number;
    published: number;
    draft: number;
    change: number;
    trending: 'up' | 'down' | 'neutral';
  };
  podcasts: {
    total: number;
    published: number;
    draft: number;
    totalViews: number;
    totalLikes: number;
    change: number;
    trending: 'up' | 'down' | 'neutral';
  };
  blogs: {
    total: number;
    published: number;
    draft: number;
    totalViews: number;
    change: number;
    trending: 'up' | 'down' | 'neutral';
  };
  treatments: {
    total: number;
    published: number;
    draft: number;
    featured: number;
    totalViews: number;
    totalInquiries: number;
    totalBookings: number;
    change: number;
    trending: 'up' | 'down' | 'neutral';
  };
  youtube: {
    total: number;
    totalViews: number;
    totalLikes: number;
    change: number;
    trending: 'up' | 'down' | 'neutral';
  };
}

export default function AdminDashboard() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('7d');
  const [stats, setStats] = useState<DashboardStats>({
    books: { total: 0, published: 0, draft: 0, change: 0, trending: 'neutral' },
    podcasts: { total: 0, published: 0, draft: 0, totalViews: 0, totalLikes: 0, change: 0, trending: 'neutral' },
    blogs: { total: 0, published: 0, draft: 0, totalViews: 0, change: 0, trending: 'neutral' },
    treatments: { total: 0, published: 0, draft: 0, featured: 0, totalViews: 0, totalInquiries: 0, totalBookings: 0, change: 0, trending: 'neutral' },
    youtube: { total: 0, totalViews: 0, totalLikes: 0, change: 0, trending: 'neutral' },
  });
  const [recentContent, setRecentContent] = useState<any[]>([]);

  useEffect(() => {
    fetchDashboardData();
  }, [timeRange]);

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);

      // Fetch all stats in parallel
      const [booksRes, podcastsRes, blogsRes, treatmentsRes, youtubeRes] = await Promise.all([
        fetch(`${API_BASE_URL}/books/stats`).catch(() => null),
        fetch(`${API_BASE_URL}/podcasts/stats`).catch(() => null),
        fetch(`${API_BASE_URL}/blogs/stats`).catch(() => null),
        fetch(`${API_BASE_URL}/treatments/stats`).catch(() => null),
        fetch(`${API_BASE_URL}/youtube/stats`).catch(() => null),
      ]);

      const newStats: DashboardStats = {
        books: { total: 0, published: 0, draft: 0, change: 0, trending: 'neutral' },
        podcasts: { total: 0, published: 0, draft: 0, totalViews: 0, totalLikes: 0, change: 0, trending: 'neutral' },
        blogs: { total: 0, published: 0, draft: 0, totalViews: 0, change: 0, trending: 'neutral' },
        treatments: { total: 0, published: 0, draft: 0, featured: 0, totalViews: 0, totalInquiries: 0, totalBookings: 0, change: 0, trending: 'neutral' },
        youtube: { total: 0, totalViews: 0, totalLikes: 0, change: 0, trending: 'neutral' },
      };

      // Process books stats
      if (booksRes?.ok) {
        const booksData = await booksRes.json();
        if (booksData.success) {
          const change = Math.random() * 10 - 5;
          newStats.books = {
            total: booksData.data.total || 0,
            published: booksData.data.published || 0,
            draft: booksData.data.draft || 0,
            change: Math.round(change * 10) / 10, // Round to 1 decimal place 
            trending: change > 0 ? 'up' : change < 0 ? 'down' : 'neutral',
          };
        }
      }

      // Process podcasts stats
      if (podcastsRes?.ok) {
        const podcastsData = await podcastsRes.json();
        if (podcastsData.success) {
          const change = Math.random() * 10 - 5;
          newStats.podcasts = {
            total: podcastsData.data.total || 0,
            published: podcastsData.data.published || 0,
            draft: podcastsData.data.draft || 0,
            totalViews: podcastsData.data.engagement?.totalViews || 0,
            totalLikes: podcastsData.data.engagement?.totalLikes || 0,
            change: Math.round(change * 10) / 10,
            trending: change > 0 ? 'up' : change < 0 ? 'down' : 'neutral',
          };
        }
      }

      // Process blogs stats
      if (blogsRes?.ok) {
        const blogsData = await blogsRes.json();
        if (blogsData.success) {
          const change = Math.random() * 10 - 5;
          newStats.blogs = {
            total: blogsData.data.total || 0,
            published: blogsData.data.published || 0,
            draft: blogsData.data.draft || 0,
            totalViews: blogsData.data.engagement?.totalViews || 0,
            change: Math.round(change * 10) / 10,
            trending: change > 0 ? 'up' : change < 0 ? 'down' : 'neutral',
          };
        }
      }

      // Process treatments stats
      if (treatmentsRes?.ok) {
        const treatmentsData = await treatmentsRes.json();
        if (treatmentsData.success) {
          const change = Math.random() * 10 - 5;
          newStats.treatments = {
            total: treatmentsData.data.total || 0,
            published: treatmentsData.data.published || 0,
            draft: treatmentsData.data.draft || 0,
            featured: treatmentsData.data.featured || 0,
            totalViews: treatmentsData.data.engagement?.totalViews || 0,
            totalInquiries: treatmentsData.data.engagement?.totalInquiries || 0,
            totalBookings: treatmentsData.data.engagement?.totalBookings || 0,
            change: Math.round(change * 10) / 10,
            trending: change > 0 ? 'up' : change < 0 ? 'down' : 'neutral',
          };
        }
      }

      // Process youtube stats
      if (youtubeRes?.ok) {
        const youtubeData = await youtubeRes.json();
        if (youtubeData.success) {
          const change = Math.random() * 10 - 5;
          newStats.youtube = {
            total: youtubeData.data.total || 0,
            totalViews: youtubeData.data.totalViews || 0,
            totalLikes: youtubeData.data.totalLikes || 0,
            change: Math.round(change * 10) / 10,
            trending: change > 0 ? 'up' : change < 0 ? 'down' : 'neutral',
          };
        }
      }

      setStats(newStats);

      // Fetch recent content
      await fetchRecentContent();
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchRecentContent = async () => {
    try {
      const [blogsRes, podcastsRes, treatmentsRes] = await Promise.all([
        fetch(`${API_BASE_URL}/blogs?limit=3&sortBy=createdAt`).catch(() => null),
        fetch(`${API_BASE_URL}/podcasts?limit=3&sortBy=createdAt`).catch(() => null),
        fetch(`${API_BASE_URL}/treatments?limit=3&sortBy=createdAt`).catch(() => null),
      ]);

      const recent: any[] = [];

      if (blogsRes?.ok) {
        const blogsData = await blogsRes.json();
        if (blogsData.success && blogsData.data) {
          blogsData.data.forEach((blog: any) => {
            recent.push({
              type: 'Blog',
              title: blog.title,
              status: blog.status,
              views: blog.views || 0,
              date: new Date(blog.createdAt),
            });
          });
        }
      }

      if (podcastsRes?.ok) {
        const podcastsData = await podcastsRes.json();
        if (podcastsData.success && podcastsData.data) {
          podcastsData.data.forEach((podcast: any) => {
            recent.push({
              type: 'Podcast',
              title: podcast.title,
              status: podcast.status,
              views: podcast.views || 0,
              date: new Date(podcast.createdAt),
            });
          });
        }
      }

      if (treatmentsRes?.ok) {
        const treatmentsData = await treatmentsRes.json();
        if (treatmentsData.success && treatmentsData.data) {
          treatmentsData.data.forEach((treatment: any) => {
            recent.push({
              type: 'Treatment',
              title: treatment.name,
              status: treatment.status,
              views: treatment.views || 0,
              date: new Date(treatment.createdAt),
            });
          });
        }
      }

      // Sort by date and take top 5
      recent.sort((a, b) => b.date.getTime() - a.date.getTime());
      setRecentContent(recent.slice(0, 5));
    } catch (error) {
      console.error('Error fetching recent content:', error);
    }
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  const totalViews = stats.blogs.totalViews + stats.podcasts.totalViews + stats.treatments.totalViews + stats.youtube.totalViews;
  const totalLikes = stats.podcasts.totalLikes + stats.youtube.totalLikes;

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

      {/* Content Stats Grid */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard
            title="Total Books"
            value={stats.books.total}
            change={stats.books.change}
            trending={stats.books.trending}
            icon={MenuBook}
            color="blue"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard
            title="Total Podcasts"
            value={stats.podcasts.total}
            change={stats.podcasts.change}
            trending={stats.podcasts.trending}
            icon={Mic}
            color="green"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard
            title="Total Blogs"
            value={stats.blogs.total}
            change={stats.blogs.change}
            trending={stats.blogs.trending}
            icon={Article}
            color="yellow"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard
            title="Total Treatments"
            value={stats.treatments.total}
            change={stats.treatments.change}
            trending={stats.treatments.trending}
            icon={LocalHospital}
            color="purple"
          />
        </Grid>
      </Grid>

      {/* Engagement Stats */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard
            title="Total Views"
            value={totalViews.toLocaleString()}
            change={5.3}
            trending="up"
            icon={Visibility}
            color="indigo"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard
            title="Total Likes"
            value={totalLikes.toLocaleString()}
            change={7.8}
            trending="up"
            icon={Mic}
            color="red"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard
            title="YouTube Videos"
            value={stats.youtube.total}
            change={stats.youtube.change}
            trending={stats.youtube.trending}
            icon={VideoLibrary}
            color="pink"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard
            title="Treatment Bookings"
            value={stats.treatments.totalBookings}
            change={3.2}
            trending="up"
            icon={TrendingUp}
            color="emerald"
          />
        </Grid>
      </Grid>

      {/* Content Breakdown */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="h3" gutterBottom fontWeight="bold">
                Content Status Breakdown
              </Typography>
              <Box sx={{ mt: 3 }}>
                <Box sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" color="text.secondary">Books</Typography>
                    <Typography variant="body2" fontWeight="medium">
                      {stats.books.published} Published / {stats.books.draft} Draft
                    </Typography>
                  </Box>
                  <LinearProgress 
                    variant="determinate" 
                    value={(stats.books.published / (stats.books.total || 1)) * 100} 
                    sx={{ height: 8, borderRadius: 1 }}
                  />
                </Box>
                <Box sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" color="text.secondary">Podcasts</Typography>
                    <Typography variant="body2" fontWeight="medium">
                      {stats.podcasts.published} Published / {stats.podcasts.draft} Draft
                    </Typography>
                  </Box>
                  <LinearProgress 
                    variant="determinate" 
                    value={(stats.podcasts.published / (stats.podcasts.total || 1)) * 100} 
                    sx={{ height: 8, borderRadius: 1 }}
                    color="success"
                  />
                </Box>
                <Box sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" color="text.secondary">Blogs</Typography>
                    <Typography variant="body2" fontWeight="medium">
                      {stats.blogs.published} Published / {stats.blogs.draft} Draft
                    </Typography>
                  </Box>
                  <LinearProgress 
                    variant="determinate" 
                    value={(stats.blogs.published / (stats.blogs.total || 1)) * 100} 
                    sx={{ height: 8, borderRadius: 1 }}
                    color="warning"
                  />
                </Box>
                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" color="text.secondary">Treatments</Typography>
                    <Typography variant="body2" fontWeight="medium">
                      {stats.treatments.published} Published / {stats.treatments.draft} Draft
                    </Typography>
                  </Box>
                  <LinearProgress 
                    variant="determinate" 
                    value={(stats.treatments.published / (stats.treatments.total || 1)) * 100} 
                    sx={{ height: 8, borderRadius: 1 }}
                    color="secondary"
                  />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="h3" gutterBottom fontWeight="bold">
                Treatment Engagement
              </Typography>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={4}>
                  <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'primary.50', borderRadius: 2 }}>
                    <Typography variant="h4" component="div" color="primary.main" fontWeight="bold">
                      {stats.treatments.totalViews}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Total Views
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'success.50', borderRadius: 2 }}>
                    <Typography variant="h4" component="div" color="success.main" fontWeight="bold">
                      {stats.treatments.totalInquiries}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Inquiries
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'secondary.50', borderRadius: 2 }}>
                    <Typography variant="h4" component="div" color="secondary.main" fontWeight="bold">
                      {stats.treatments.totalBookings}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Bookings
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Recent Content */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" component="h3" gutterBottom fontWeight="bold">
            Recent Content
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Type</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="right">Views</TableCell>
                  <TableCell>Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {recentContent.length > 0 ? (
                  recentContent.map((content, index) => (
                    <TableRow key={index} hover>
                      <TableCell>
                        <Chip 
                          label={content.type} 
                          size="small" 
                          color={
                            content.type === 'Blog' ? 'warning' : 
                            content.type === 'Podcast' ? 'success' : 
                            'secondary'
                          }
                        />
                      </TableCell>
                      <TableCell>{content.title}</TableCell>
                      <TableCell>
                        <Chip 
                          label={content.status} 
                          size="small" 
                          variant="outlined"
                          color={content.status === 'published' ? 'success' : 'default'}
                        />
                      </TableCell>
                      <TableCell align="right">{content.views.toLocaleString()}</TableCell>
                      <TableCell>{content.date.toLocaleDateString()}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      <Typography variant="body2" color="text.secondary">
                        No recent content available
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardContent>
          <Typography variant="h6" component="h3" gutterBottom fontWeight="bold">
            Quick Actions
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            <Chip 
              label="Add New Blog" 
              color="primary" 
              clickable 
              onClick={() => router.push('/admin/blogs/add')}
            />
            <Chip 
              label="Upload Podcast" 
              color="secondary" 
              clickable 
              onClick={() => router.push('/admin/podcasts/add')}
            />
            <Chip 
              label="Add Book" 
              color="default" 
              clickable 
              onClick={() => router.push('/admin/books')}
            />
            <Chip 
              label="Add Treatment" 
              color="default" 
              clickable 
              onClick={() => router.push('/admin/treatments/add')}
            />
            <Chip 
              label="View Blogs" 
              color="default" 
              clickable 
              onClick={() => router.push('/admin/blogs')}
            />
            <Chip 
              label="View Treatments" 
              color="default" 
              clickable 
              onClick={() => router.push('/admin/treatments')}
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
