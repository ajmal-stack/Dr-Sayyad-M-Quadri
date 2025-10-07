'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Chip,
  IconButton,
  Tooltip,
  Alert,
  Snackbar,
  CircularProgress,
  Backdrop,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  Add,
  Edit,
  Delete,
  PlayArrow,
  Visibility,
  Search,
  Refresh,
  VideoLibrary,
  TrendingUp,
  Favorite,
  Download,
  MoreVert,
  Preview,
  Pause,
  VolumeUp,
  Close,
} from '@mui/icons-material';

// Types
interface YouTubeVideo {
  _id: string;
  videoId: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  views: number;
  likes: number;
  publishDate: string;
  category: string;
  tags: string[];
  channelName: string;
  isNew: boolean;
  featured: boolean;
  isTrending: boolean;
  isActive: boolean;
  youtubeUrl: string;
  embedUrl: string;
}

interface VideoStats {
  totalVideos: number;
  totalViews: number;
  totalLikes: number;
  featuredCount: number;
  trendingCount: number;
  newCount: number;
}

interface SnackbarState {
  open: boolean;
  message: string;
  severity: 'success' | 'error' | 'warning' | 'info';
}

interface ConfirmDialog {
  open: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
}

interface PreviewModal {
  open: boolean;
  video: YouTubeVideo | null;
}

export default function YouTubeAdminPage() {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [stats, setStats] = useState<VideoStats>({
    totalVideos: 0,
    totalViews: 0,
    totalLikes: 0,
    featuredCount: 0,
    trendingCount: 0,
    newCount: 0,
  });
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    message: '',
    severity: 'success'
  });
  const [confirmDialog, setConfirmDialog] = useState<ConfirmDialog>({
    open: false,
    title: '',
    message: '',
    onConfirm: () => {}
  });
  const [previewModal, setPreviewModal] = useState<PreviewModal>({
    open: false,
    video: null
  });
  const [apiAvailable, setApiAvailable] = useState(true);

  // Categories for filtering
  const categories = [
    'All Categories',
    'Mental Health',
    'Anxiety', 
    'Emotional Health',
    'Health'
  ];

  // Helper functions
  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const showSuccessAlert = (message: string) => {
    setSnackbar({ open: true, message, severity: 'success' });
  };

  const showErrorAlert = (message: string) => {
    setSnackbar({ open: true, message, severity: 'error' });
  };

  const getStatusColor = (isPublished: boolean, isActive: boolean) => {
    if (!isActive) return 'default';
    return isPublished ? 'success' : 'warning';
  };

  const getStatusText = (isActive: boolean) => {
    return isActive ? 'Active' : 'Inactive';
  };

  // Preview modal functions
  const handlePreview = (video: YouTubeVideo) => {
    setPreviewModal({ open: true, video });
  };

  const handleClosePreview = () => {
    setPreviewModal({ open: false, video: null });
  };

  // Load initial data
  const loadInitialData = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/v1/youtube');
      
      if (!response.ok) {
        throw new Error('Failed to fetch videos');
      }

      const result = await response.json();
      
      if (result.success) {
        setVideos(result.data || []);
        setStats(result.stats || {
          totalVideos: 0,
          totalViews: 0,
          totalLikes: 0,
          featuredCount: 0,
          trendingCount: 0,
          newCount: 0,
        });
        setApiAvailable(true);
      } else {
        throw new Error(result.message || 'Failed to fetch videos');
      }
    } catch (err) {
      console.error('Error fetching videos:', err);
      showErrorAlert('Failed to connect to server');
      setApiAvailable(false);
    } finally {
      setLoading(false);
    }
  };

  // Delete video
  const handleDelete = (id: string, title: string) => {
    setConfirmDialog({
      open: true,
      title: 'Delete Video',
      message: `Are you sure you want to delete "${title}"? This action cannot be undone.`,
      onConfirm: () => confirmDelete(id)
    });
  };

  const confirmDelete = async (id: string) => {
    setConfirmDialog(prev => ({ ...prev, open: false }));
    
    try {
      const response = await fetch(`http://localhost:5000/api/v1/youtube/${id}`, {
        method: 'DELETE'
      });
      
      const result = await response.json();
      
      if (result.success) {
        showSuccessAlert('Video deleted successfully!');
        await loadInitialData();
      } else {
        showErrorAlert(result.message || 'Failed to delete video');
      }
    } catch (err) {
      showErrorAlert('Failed to delete video');
      console.error('Error deleting video:', err);
    }
  };

  // Effects
  useEffect(() => {
    loadInitialData();
  }, [selectedCategory]);

  const handleSearch = () => {
    // Implement search functionality
    console.log('Searching for:', searchTerm, 'Category:', selectedCategory);
  };

  return (
    <Box>
      {/* API Status Banner */}
      {!apiAvailable && (
        <Alert severity="warning" sx={{ mb: 2 }}>
          Backend API is not available. You can still view videos locally, but changes won't be saved to the server.
        </Alert>
      )}

      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <VideoLibrary color="primary" sx={{ fontSize: 40 }} />
          YouTube Videos Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => window.location.href = '/admin/youtube/add'}
          size="large"
        >
          Add New Video
        </Button>
      </Box>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={2}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="h4" color="primary">
                    {formatNumber(stats.totalVideos)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Videos
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'primary.main' }}>
                  <VideoLibrary />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="h4" color="info.main">
                    {formatNumber(stats.totalViews)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Views
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'info.main' }}>
                  <Visibility />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="h4" color="secondary.main">
                    {formatNumber(stats.totalLikes)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Likes
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'secondary.main' }}>
                  <Favorite />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="h4" color="warning.main">
                    {formatNumber(stats.featuredCount)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Featured
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'warning.main' }}>
                  <TrendingUp />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="h4" color="success.main">
                    {formatNumber(stats.trendingCount)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Trending
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'success.main' }}>
                  <TrendingUp />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="h4" color="error.main">
                    {formatNumber(stats.newCount)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    New Videos
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'error.main' }}>
                  <VideoLibrary />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Search and Filters */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                placeholder="Search videos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                InputProps={{
                  startAdornment: <Search sx={{ color: 'action.active', mr: 1 }} />
                }}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  label="Category"
                >
                  {categories.map(category => (
                    <MenuItem key={category} value={category === 'All Categories' ? '' : category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button
                  variant="contained"
                  onClick={handleSearch}
                  startIcon={<Search />}
                  fullWidth
                >
                  Search
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('');
                    loadInitialData();
                  }}
                >
                  <Refresh />
                </Button>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Loading State */}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 12 }}>
          <CircularProgress size={40} />
          <Typography variant="body1" sx={{ ml: 2 }}>
            Loading videos...
          </Typography>
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Video</TableCell>
                <TableCell>Details</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Stats</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {videos.map((video) => (
                <TableRow key={video._id} hover>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar
                        src={video.thumbnail}
                        sx={{ width: 80, height: 60, borderRadius: 1 }}
                        variant="rounded"
                      />
                      <Box>
                        <Typography variant="subtitle1" fontWeight="bold">
                          {video.title}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {video.videoId}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box>
                      <Typography variant="body2">
                        Duration: {video.duration}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {formatDate(video.publishDate)}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip label={video.category} size="small" variant="outlined" />
                  </TableCell>
                  <TableCell>
                    <Box>
                      <Typography variant="body2">
                        👀 {formatNumber(video.views)}
                      </Typography>
                      <Typography variant="body2">
                        ❤️ {formatNumber(video.likes)}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                      {video.featured && (
                        <Chip label="Featured" size="small" color="warning" variant="outlined" />
                      )}
                      {video.isTrending && (
                        <Chip label="Trending" size="small" color="success" variant="outlined" />
                      )}
                      {video.isNew && (
                        <Chip label="New" size="small" color="info" variant="outlined" />
                      )}
                      <Chip 
                        label={getStatusText(video.isActive)} 
                        size="small" 
                        color={getStatusColor(true, video.isActive) as any}
                      />
                    </Box>
                  </TableCell>
                  <TableCell align="right">
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                      <Tooltip title="Preview video">
                        <IconButton 
                          size="small"
                          onClick={() => handlePreview(video)}
                          color="info"
                        >
                          <Preview fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Edit video">
                        <IconButton 
                          size="small"
                          onClick={() => window.location.href = `/admin/youtube/edit/${video._id}`}
                          color="primary"
                        >
                          <Edit fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete video">
                        <IconButton 
                          size="small"
                          onClick={() => handleDelete(video._id, video.title)}
                          color="error"
                        >
                          <Delete fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {videos.length === 0 && !loading && (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <VideoLibrary sx={{ fontSize: 64, color: 'grey.400', mb: 2 }} />
              <Typography variant="h6" color="text.secondary" gutterBottom>
                No videos found
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Get started by adding a new YouTube video.
              </Typography>
            </Box>
          )}
        </TableContainer>
      )}

      {/* Confirmation Dialog */}
      <Dialog
        open={confirmDialog.open}
        onClose={() => setConfirmDialog(prev => ({ ...prev, open: false }))}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Delete color="error" />
          {confirmDialog.title}
        </DialogTitle>
        <DialogContent>
          <Alert severity="warning" sx={{ mb: 2 }}>
            This action cannot be undone.
          </Alert>
          <Typography>
            {confirmDialog.message}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDialog(prev => ({ ...prev, open: false }))}>
            Cancel
          </Button>
          <Button 
            onClick={confirmDialog.onConfirm} 
            variant="contained" 
            color="error"
            startIcon={<Delete />}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Preview Modal */}
      <Dialog
        open={previewModal.open}
        onClose={handleClosePreview}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <VideoLibrary color="primary" />
            <Typography variant="h6">
              {previewModal.video?.title}
            </Typography>
          </Box>
          <IconButton onClick={handleClosePreview}>
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {previewModal.video && (
            <Box>
              {/* Video Embed */}
              <Box sx={{ mb: 3, position: 'relative', paddingBottom: '56.25%', height: 0 }}>
                <iframe
                  src={previewModal.video.embedUrl}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    border: 'none',
                    borderRadius: '8px'
                  }}
                  allowFullScreen
                  title={previewModal.video.title}
                />
              </Box>

              {/* Video Info */}
              <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                  <Typography variant="h5" gutterBottom>
                    {previewModal.video.title}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                    <Chip label={previewModal.video.category} size="small" color="primary" />
                    <Chip label={previewModal.video.duration} size="small" variant="outlined" />
                    {previewModal.video.featured && (
                      <Chip label="Featured" size="small" color="warning" />
                    )}
                    {previewModal.video.isTrending && (
                      <Chip label="Trending" size="small" color="success" />
                    )}
                    {previewModal.video.isNew && (
                      <Chip label="New" size="small" color="info" />
                    )}
                  </Box>
                  
                  <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.6 }}>
                    {previewModal.video.description}
                  </Typography>

                  {/* Tags */}
                  {previewModal.video.tags && previewModal.video.tags.length > 0 && (
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="subtitle2" gutterBottom>
                        Tags:
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {previewModal.video.tags.map((tag, index) => (
                          <Chip 
                            key={index} 
                            label={tag} 
                            size="small" 
                            variant="outlined" 
                          />
                        ))}
                      </Box>
                    </Box>
                  )}
                </Grid>
                <Grid item xs={12} md={4}>
                  {/* Statistics */}
                  <Card sx={{ mb: 2 }}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Statistics
                      </Typography>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2">Views:</Typography>
                        <Typography variant="body2" fontWeight="bold">
                          {formatNumber(previewModal.video.views)}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2">Likes:</Typography>
                        <Typography variant="body2" fontWeight="bold">
                          {formatNumber(previewModal.video.likes)}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2">Published:</Typography>
                        <Typography variant="body2" fontWeight="bold">
                          {formatDate(previewModal.video.publishDate)}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>

                  {/* Links */}
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Links
                      </Typography>
                      <Button
                        fullWidth
                        variant="outlined"
                        startIcon={<PlayArrow />}
                        onClick={() => window.open(previewModal.video?.youtubeUrl, '_blank')}
                        sx={{ mb: 1 }}
                      >
                        Watch on YouTube
                      </Button>
                      <Button
                        fullWidth
                        variant="outlined"
                        startIcon={<Edit />}
                        onClick={() => window.location.href = `/admin/youtube/edit/${previewModal.video?._id}`}
                      >
                        Edit Video
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePreview}>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={snackbar.severity === 'error' ? 8000 : 6000}
        onClose={() => setSnackbar({...snackbar, open: false})}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          severity={snackbar.severity} 
          onClose={() => setSnackbar({...snackbar, open: false})}
          variant="filled"
          sx={{ minWidth: '300px' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

      {/* Loading Backdrop */}
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading && videos.length === 0}
      >
        <Box sx={{ textAlign: 'center' }}>
          <CircularProgress color="inherit" size={60} />
          <Typography variant="h6" sx={{ mt: 2 }}>
            Loading videos...
          </Typography>
        </Box>
      </Backdrop>
    </Box>
  );
}
