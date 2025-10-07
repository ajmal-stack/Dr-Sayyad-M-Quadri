'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Grid,
  Card,
  CardContent,
  Avatar,
  Chip,
  Alert,
  Snackbar,
  Backdrop,
  CircularProgress,
  InputBase,
  Skeleton,
  Tooltip,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';
import {
  Add,
  Edit,
  Delete,
  PlayArrow,
  Visibility,
  Search,
  Refresh,
  Headset,
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
interface Podcast {
  _id: string;
  title: string;
  description: string;
  duration: string;
  publishDate: string;
  category: string;
  audioUrl: string;
  coverImage: string;
  featured: boolean;
  views: number;
  likes: number;
  downloads: number;
  host: string;
  episodeNumber: number;
  tags: string[];
  isActive: boolean;
  isPublished: boolean;
  showNotes?: string[];
  transcript?: string;
}

interface PodcastStats {
  total: number;
  published: number;
  featured: number;
  totalViews: number;
  totalLikes: number;
  totalDownloads: number;
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
  podcast: Podcast | null;
}

interface AudioPlayerState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
}

export default function PodcastsAdminPage() {
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [stats, setStats] = useState<PodcastStats>({
    total: 0,
    published: 0,
    featured: 0,
    totalViews: 0,
    totalLikes: 0,
    totalDownloads: 0
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
    podcast: null
  });
  const [audioPlayer, setAudioPlayer] = useState<AudioPlayerState>({
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: 1
  });
  const [apiAvailable, setApiAvailable] = useState(true);

  const audioRef = React.useRef<HTMLAudioElement>(null);

  // Categories for filtering
  const categories = [
    'All Categories',
    'Mental Health',
    'Psychology', 
    'Health & Wellness',
    'Self-Development',
    'Nutrition',
    'Wellness'
  ];

  // Utility functions
  const showSuccessAlert = (message: string) => {
    setSnackbar({ open: true, message, severity: 'success' });
  };

  const showErrorAlert = (message: string) => {
    setSnackbar({ open: true, message, severity: 'error' });
  };

  // Fetch podcasts and stats
  const loadInitialData = async () => {
    try {
      setLoading(true);
      
      // Fetch podcasts
      const params = new URLSearchParams({
        page: '1',
        limit: '50' // Get more for better stats calculation
      });
      
      if (searchTerm) params.append('search', searchTerm);
      if (selectedCategory && selectedCategory !== 'All Categories') {
        params.append('category', selectedCategory);
      }
      
      const response = await fetch(`http://localhost:5000/api/v1/podcasts?${params}`);
      const result = await response.json();
      
      if (result.success) {
        setPodcasts(result.data);
        
        // Calculate stats
        const podcastData = result.data;
        const calculatedStats = {
          total: podcastData.length,
          published: podcastData.filter((p: Podcast) => p.isPublished).length,
          featured: podcastData.filter((p: Podcast) => p.featured).length,
          totalViews: podcastData.reduce((sum: number, p: Podcast) => sum + (p.views || 0), 0),
          totalLikes: podcastData.reduce((sum: number, p: Podcast) => sum + (p.likes || 0), 0),
          totalDownloads: podcastData.reduce((sum: number, p: Podcast) => sum + (p.downloads || 0), 0)
        };
        setStats(calculatedStats);
        setApiAvailable(true);
      } else {
        showErrorAlert(result.message || 'Failed to fetch podcasts');
      }
    } catch (err) {
      console.error('Error fetching podcasts:', err);
      showErrorAlert('Failed to connect to server');
      setApiAvailable(false);
    } finally {
      setLoading(false);
    }
  };

  // Delete podcast
  const handleDelete = (id: string, title: string) => {
    setConfirmDialog({
      open: true,
      title: 'Delete Podcast',
      message: `Are you sure you want to delete "${title}"? This action cannot be undone.`,
      onConfirm: () => confirmDelete(id)
    });
  };

  const confirmDelete = async (id: string) => {
    setConfirmDialog(prev => ({ ...prev, open: false }));

    
    try {
      const response = await fetch(`http://localhost:5000/api/v1/podcasts/${id}`, {
        method: 'DELETE'
      });
      
      const result = await response.json();
      
      if (result.success) {
        showSuccessAlert('Podcast deleted successfully!');
        await loadInitialData();
      } else {
        showErrorAlert(result.message || 'Failed to delete podcast');
      }
    } catch (err) {
      showErrorAlert('Failed to delete podcast');
      console.error('Error deleting podcast:', err);
    }
  };

  // Effects
  useEffect(() => {
    loadInitialData();
  }, [selectedCategory]);

  const handleSearch = () => {
    loadInitialData();
  };

  // Format functions
  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getStatusColor = (isPublished: boolean, isActive: boolean) => {
    if (!isActive) return 'default';
    return isPublished ? 'success' : 'warning';
  };

  const getStatusText = (isPublished: boolean, isActive: boolean) => {
    if (!isActive) return 'Inactive';
    return isPublished ? 'Published' : 'Draft';
  };

  // Preview modal functions
  const handlePreview = (podcast: Podcast) => {
    setPreviewModal({ open: true, podcast });
    setAudioPlayer({ isPlaying: false, currentTime: 0, duration: 0, volume: 1 });
  };

  const handleClosePreview = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setPreviewModal({ open: false, podcast: null });
    setAudioPlayer({ isPlaying: false, currentTime: 0, duration: 0, volume: 1 });
  };

  // Audio player functions
  const togglePlayPause = () => {
    if (audioRef.current) {
      if (audioPlayer.isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setAudioPlayer(prev => ({ ...prev, isPlaying: !prev.isPlaying }));
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setAudioPlayer(prev => ({
        ...prev,
        currentTime: audioRef.current!.currentTime,
        duration: audioRef.current!.duration || 0
      }));
    }
  };

  const handleSeek = (event: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(event.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setAudioPlayer(prev => ({ ...prev, currentTime: time }));
    }
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Box>
      {/* API Status Banner */}
      {!apiAvailable && (
        <Alert severity="warning" sx={{ mb: 2 }}>
          Backend API is not available. You can still view podcasts locally, but changes won't be saved to the server.
        </Alert>
      )}

      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
            Podcasts Management
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage podcast episodes, track engagement, and update content
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<Refresh />}
            onClick={loadInitialData}
            disabled={loading}
          >
            Refresh
          </Button>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => window.location.href = '/admin/podcasts/add'}
            size="large"
          >
            Add New Podcast
          </Button>
        </Box>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  {loading ? (
                    <Skeleton variant="text" width={60} height={40} />
                  ) : (
                    <Typography variant="h4" fontWeight="bold">
                      {stats.total}
                    </Typography>
                  )}
                  <Typography variant="body2" color="text.secondary">
                    Total Episodes
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'primary.main' }}>
                  <Headset />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  {loading ? (
                    <Skeleton variant="text" width={60} height={40} />
                  ) : (
                    <Typography variant="h4" fontWeight="bold">
                      {stats.published}
                    </Typography>
                  )}
                  <Typography variant="body2" color="text.secondary">
                    Published
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'success.main' }}>
                  <Visibility />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  {loading ? (
                    <Skeleton variant="text" width={60} height={40} />
                  ) : (
                    <Typography variant="h4" fontWeight="bold">
                      {formatNumber(stats.totalViews)}
                    </Typography>
                  )}
                  <Typography variant="body2" color="text.secondary">
                    Total Views
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'info.main' }}>
                  <TrendingUp />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  {loading ? (
                    <Skeleton variant="text" width={60} height={40} />
                  ) : (
                    <Typography variant="h4" fontWeight="bold">
                      {formatNumber(stats.totalLikes)}
                    </Typography>
                  )}
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
      </Grid>

      {/* Search and Filters */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                placeholder="Search podcasts..."
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
            Loading podcasts...
          </Typography>
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: 'grey.50' }}>
                <TableCell>Episode</TableCell>
                <TableCell>Title & Category</TableCell>
                <TableCell>Duration</TableCell>
                <TableCell>Stats</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {podcasts.map((podcast) => (
                <TableRow key={podcast._id} hover>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar sx={{ bgcolor: 'primary.light', mr: 2 }}>
                        <PlayArrow />
                      </Avatar>
                      <Box>
                        <Typography variant="body2" fontWeight="medium">
                          #{podcast.episodeNumber}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {formatDate(podcast.publishDate)}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box>
                      <Typography variant="body2" fontWeight="medium" noWrap sx={{ maxWidth: 300 }}>
                        {podcast.title}
                      </Typography>
                      <Chip 
                        label={podcast.category} 
                        size="small" 
                        color="primary" 
                        variant="outlined"
                        sx={{ mt: 0.5 }}
                      />
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {podcast.duration}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <Visibility fontSize="small" color="action" />
                        <Typography variant="caption">
                          {formatNumber(podcast.views)}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <Favorite fontSize="small" color="action" />
                        <Typography variant="caption">
                          {formatNumber(podcast.likes)}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                      <Chip 
                        label={podcast.featured ? 'Featured' : 'Regular'} 
                        size="small" 
                        color={podcast.featured ? 'warning' : 'default'}
                        variant="outlined"
                      />
                      <Chip 
                        label={getStatusText(podcast.isPublished, podcast.isActive)} 
                        size="small" 
                        color={getStatusColor(podcast.isPublished, podcast.isActive) as any}
                      />
                    </Box>
                  </TableCell>
                  <TableCell align="right">
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                      <Tooltip title="Preview podcast">
                        <IconButton 
                          size="small"
                          onClick={() => handlePreview(podcast)}
                          color="info"
                        >
                          <Preview fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Edit podcast">
                        <IconButton 
                          size="small"
                          onClick={() => window.location.href = `/admin/podcasts/edit/${podcast._id}`}
                          color="primary"
                        >
                          <Edit fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete podcast">
                        <IconButton 
                          size="small"
                          onClick={() => handleDelete(podcast._id, podcast.title)}
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
          
          {podcasts.length === 0 && (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Avatar sx={{ mx: 'auto', mb: 2, bgcolor: 'grey.100', width: 64, height: 64 }}>
                <Headset sx={{ fontSize: 32 }} color="disabled" />
              </Avatar>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                No podcasts found
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Get started by creating a new podcast episode.
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

      {/* Preview Modal */}
      <Dialog
        open={previewModal.open}
        onClose={handleClosePreview}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Headset color="primary" />
            <Typography variant="h6">
              {previewModal.podcast?.title}
            </Typography>
          </Box>
          <IconButton onClick={handleClosePreview}>
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {previewModal.podcast && (
            <Box>
              {/* Podcast Info */}
              <Grid container spacing={3} sx={{ mb: 3 }}>
                <Grid item xs={12} md={4}>
                  {previewModal.podcast.coverImage ? (
                    <Avatar
                      src={previewModal.podcast.coverImage}
                      sx={{ width: '100%', height: 200, borderRadius: 2 }}
                      variant="rounded"
                    />
                  ) : (
                    <Avatar
                      sx={{ width: '100%', height: 200, borderRadius: 2, bgcolor: 'grey.200' }}
                      variant="rounded"
                    >
                      <Headset sx={{ fontSize: 64 }} color="disabled" />
                    </Avatar>
                  )}
                </Grid>
                <Grid item xs={12} md={8}>
                  <Typography variant="h5" gutterBottom>
                    {previewModal.podcast.title}
                  </Typography>
                  
                  {/* Status Chips */}
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                    <Chip label={`Episode #${previewModal.podcast.episodeNumber}`} size="small" color="primary" />
                    <Chip label={previewModal.podcast.category} size="small" variant="outlined" />
                    <Chip label={previewModal.podcast.duration} size="small" variant="outlined" />
                    {previewModal.podcast.featured && (
                      <Chip label="Featured" size="small" color="warning" />
                    )}
                    <Chip 
                      label={getStatusText(previewModal.podcast.isPublished, previewModal.podcast.isActive)} 
                      size="small" 
                      color={getStatusColor(previewModal.podcast.isPublished, previewModal.podcast.isActive) as any}
                    />
                  </Box>
                  
                  {/* Metadata Grid */}
                  <Grid container spacing={2} sx={{ mb: 2 }}>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body2" color="text.secondary">
                        <strong>Host:</strong> {previewModal.podcast.host || 'Not specified'}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body2" color="text.secondary">
                        <strong>Published:</strong> {formatDate(previewModal.podcast.publishDate)}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body2" color="text.secondary">
                        <strong>Category:</strong> {previewModal.podcast.category}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body2" color="text.secondary">
                        <strong>Duration:</strong> {previewModal.podcast.duration}
                      </Typography>
                    </Grid>
                    {previewModal.podcast.audioUrl && (
                      <Grid item xs={12}>
                        <Typography variant="body2" color="text.secondary" sx={{ wordBreak: 'break-all' }}>
                          <strong>Audio URL:</strong> {previewModal.podcast.audioUrl}
                        </Typography>
                      </Grid>
                    )}
                    {previewModal.podcast.coverImage && (
                      <Grid item xs={12}>
                        <Typography variant="body2" color="text.secondary" sx={{ wordBreak: 'break-all' }}>
                          <strong>Cover Image URL:</strong> {previewModal.podcast.coverImage}
                        </Typography>
                      </Grid>
                    )}
                  </Grid>
                </Grid>
              </Grid>

              {/* Description */}
              <Typography variant="h6" gutterBottom>
                Description
              </Typography>
              <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.6 }}>
                {previewModal.podcast.description}
              </Typography>

              {/* Tags */}
              {previewModal.podcast.tags && previewModal.podcast.tags.length > 0 && (
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Tags
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {previewModal.podcast.tags.map((tag, index) => (
                      <Chip 
                        key={index} 
                        label={tag} 
                        size="small" 
                        variant="outlined" 
                        color="primary"
                      />
                    ))}
                  </Box>
                </Box>
              )}

              {/* Show Notes */}
              {previewModal.podcast.showNotes && previewModal.podcast.showNotes.length > 0 && (
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Show Notes
                  </Typography>
                  <Card sx={{ bgcolor: 'grey.50' }}>
                    <CardContent>
                      {previewModal.podcast.showNotes.map((note, index) => (
                        <Typography key={index} variant="body2" sx={{ mb: 1, display: 'flex', alignItems: 'flex-start' }}>
                          <Box component="span" sx={{ minWidth: 20, color: 'primary.main', fontWeight: 'bold' }}>
                            {index + 1}.
                          </Box>
                          {note}
                        </Typography>
                      ))}
                    </CardContent>
                  </Card>
                </Box>
              )}

              {/* Transcript */}
              {previewModal.podcast.transcript && (
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Transcript
                  </Typography>
                  <Card sx={{ bgcolor: 'grey.50', maxHeight: 300, overflow: 'auto' }}>
                    <CardContent>
                      <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>
                        {previewModal.podcast.transcript}
                      </Typography>
                    </CardContent>
                  </Card>
                </Box>
              )}

              {/* Audio Player */}
              {previewModal.podcast.audioUrl && (
                <Card sx={{ bgcolor: 'grey.50', mb: 2 }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <VolumeUp color="primary" />
                      Audio Player
                    </Typography>
                    
                    <audio
                      ref={audioRef}
                      src={previewModal.podcast.audioUrl}
                      onTimeUpdate={handleTimeUpdate}
                      onLoadedMetadata={handleTimeUpdate}
                      style={{ display: 'none' }}
                    />
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                      <IconButton
                        onClick={togglePlayPause}
                        color="primary"
                        size="large"
                        sx={{ bgcolor: 'primary.light', '&:hover': { bgcolor: 'primary.main', color: 'white' } }}
                      >
                        {audioPlayer.isPlaying ? <Pause /> : <PlayArrow />}
                      </IconButton>
                      
                      <Box sx={{ flex: 1 }}>
                        <input
                          type="range"
                          min="0"
                          max={audioPlayer.duration || 0}
                          value={audioPlayer.currentTime}
                          onChange={handleSeek}
                          style={{
                            width: '100%',
                            height: '6px',
                            borderRadius: '3px',
                            background: '#ddd',
                            outline: 'none',
                            cursor: 'pointer'
                          }}
                        />
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.5 }}>
                          <Typography variant="caption" color="text.secondary">
                            {formatTime(audioPlayer.currentTime)}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {formatTime(audioPlayer.duration)}
                          </Typography>
                        </Box>
                      </Box>
                      
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 100 }}>
                        <VolumeUp fontSize="small" color="action" />
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.1"
                          value={audioPlayer.volume}
                          onChange={(e) => {
                            const volume = parseFloat(e.target.value);
                            if (audioRef.current) {
                              audioRef.current.volume = volume;
                            }
                            setAudioPlayer(prev => ({ ...prev, volume }));
                          }}
                          style={{ width: '60px' }}
                        />
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              )}

              {/* Engagement Statistics */}
              <Typography variant="h6" gutterBottom>
                Engagement Statistics
              </Typography>
              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={12} sm={6} md={3}>
                  <Card sx={{ textAlign: 'center', p: 2, bgcolor: 'primary.light', color: 'primary.contrastText' }}>
                    <Visibility sx={{ fontSize: 32, mb: 1 }} />
                    <Typography variant="h6" fontWeight="bold">
                      {formatNumber(previewModal.podcast.views || 0)}
                    </Typography>
                    <Typography variant="caption">
                      Views
                    </Typography>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Card sx={{ textAlign: 'center', p: 2, bgcolor: 'secondary.light', color: 'secondary.contrastText' }}>
                    <Favorite sx={{ fontSize: 32, mb: 1 }} />
                    <Typography variant="h6" fontWeight="bold">
                      {formatNumber(previewModal.podcast.likes || 0)}
                    </Typography>
                    <Typography variant="caption">
                      Likes
                    </Typography>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Card sx={{ textAlign: 'center', p: 2, bgcolor: 'info.light', color: 'info.contrastText' }}>
                    <Download sx={{ fontSize: 32, mb: 1 }} />
                    <Typography variant="h6" fontWeight="bold">
                      {formatNumber(previewModal.podcast.downloads || 0)}
                    </Typography>
                    <Typography variant="caption">
                      Downloads
                    </Typography>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Card sx={{ textAlign: 'center', p: 2, bgcolor: 'success.light', color: 'success.contrastText' }}>
                    <Headset sx={{ fontSize: 32, mb: 1 }} />
                    <Typography variant="h6" fontWeight="bold">
                      #{previewModal.podcast.episodeNumber}
                    </Typography>
                    <Typography variant="caption">
                      Episode
                    </Typography>
                  </Card>
                </Grid>
              </Grid>

              {/* Technical Information */}
              <Typography variant="h6" gutterBottom>
                Technical Information
              </Typography>
              <Card sx={{ bgcolor: 'grey.50', mb: 2 }}>
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body2">
                        <strong>Status:</strong> {previewModal.podcast.isActive ? 'Active' : 'Inactive'}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body2">
                        <strong>Published:</strong> {previewModal.podcast.isPublished ? 'Yes' : 'No'}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body2">
                        <strong>Featured:</strong> {previewModal.podcast.featured ? 'Yes' : 'No'}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body2">
                        <strong>Episode Number:</strong> {previewModal.podcast.episodeNumber}
                      </Typography>
                    </Grid>
                    {previewModal.podcast._id && (
                      <Grid item xs={12}>
                        <Typography variant="body2" sx={{ wordBreak: 'break-all' }}>
                          <strong>ID:</strong> {previewModal.podcast._id}
                        </Typography>
                      </Grid>
                    )}
                  </Grid>
                </CardContent>
              </Card>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePreview}>
            Close
          </Button>
          <Button 
            variant="contained" 
            onClick={() => window.location.href = `/admin/podcasts/edit/${previewModal.podcast?._id}`}
            startIcon={<Edit />}
          >
            Edit Podcast
          </Button>
        </DialogActions>
      </Dialog>

      {/* Loading Backdrop */}
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading && podcasts.length === 0}
      >
        <Box sx={{ textAlign: 'center' }}>
          <CircularProgress color="inherit" size={60} />
          <Typography variant="h6" sx={{ mt: 2 }}>
            Loading podcasts...
          </Typography>
        </Box>
      </Backdrop>
    </Box>
  );
}
