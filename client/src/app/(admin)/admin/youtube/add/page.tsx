'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  Alert,
  Snackbar,
  CircularProgress,
  Backdrop,
  Chip,
  Avatar,
  Paper,
  IconButton,
} from '@mui/material';
import {
  VideoLibrary,
  CloudUpload,
  ArrowBack,
  Preview,
  Add,
  Delete,
  YouTube,
} from '@mui/icons-material';

// Types
interface FormData {
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
  featured: boolean;
  isTrending: boolean;
  isNew: boolean;
}

interface ValidationErrors {
  videoId?: string;
  title?: string;
  description?: string;
  thumbnail?: string;
  duration?: string;
  category?: string;
  publishDate?: string;
}

interface SnackbarState {
  open: boolean;
  message: string;
  severity: 'success' | 'error' | 'warning' | 'info';
}

export default function AddYouTubeVideoPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    message: '',
    severity: 'success'
  });

  const [formData, setFormData] = useState<FormData>({
    videoId: '',
    title: '',
    description: '',
    thumbnail: '',
    duration: '',
    views: 0,
    likes: 0,
    publishDate: new Date().toISOString().split('T')[0],
    category: '',
    tags: [],
    channelName: 'Dr. Syed M Quadri',
    featured: false,
    isTrending: false,
    isNew: true,
  });

  // Categories
  const categories = [
    'Mental Health',
    'Anxiety',
    'Emotional Health',
    'Health'
  ];

  // Helper functions
  const showSuccessAlert = (message: string) => {
    setSnackbar({ open: true, message, severity: 'success' });
  };

  const showErrorAlert = (message: string) => {
    setSnackbar({ open: true, message, severity: 'error' });
  };

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field as keyof ValidationErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleTagsChange = (tagsString: string) => {
    const tags = tagsString.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
    setFormData(prev => ({ ...prev, tags }));
  };

  // Auto-generate thumbnail URL from video ID
  const generateThumbnail = (videoId: string) => {
    if (videoId.trim()) {
      const thumbnailUrl = `https://img.youtube.com/vi/${videoId.trim()}/maxresdefault.jpg`;
      setFormData(prev => ({ ...prev, thumbnail: thumbnailUrl }));
    }
  };

  // Extract video ID from YouTube URL
  const extractVideoId = (url: string) => {
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : url;
  };

  const handleVideoIdChange = (value: string) => {
    const videoId = extractVideoId(value);
    setFormData(prev => ({ ...prev, videoId }));
    generateThumbnail(videoId);
    
    // Clear error
    if (errors.videoId) {
      setErrors(prev => ({ ...prev, videoId: undefined }));
    }
  };

  // Validation
  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};

    if (!formData.videoId.trim()) {
      newErrors.videoId = 'YouTube Video ID is required';
    } else if (formData.videoId.length !== 11) {
      newErrors.videoId = 'Invalid YouTube Video ID format';
    }

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length < 3) {
      newErrors.title = 'Title must be at least 3 characters';
    } else if (formData.title.length > 200) {
      newErrors.title = 'Title must be less than 200 characters';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.length < 10) {
      newErrors.description = 'Description must be at least 10 characters';
    } else if (formData.description.length > 2000) {
      newErrors.description = 'Description must be less than 2000 characters';
    }

    if (!formData.category) {
      newErrors.category = 'Category is required';
    }

    if (!formData.duration.trim()) {
      newErrors.duration = 'Duration is required';
    } else if (!/^\d{1,2}:\d{2}$/.test(formData.duration)) {
      newErrors.duration = 'Duration must be in MM:SS format (e.g., 15:30)';
    }

    if (!formData.publishDate) {
      newErrors.publishDate = 'Publish date is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      showErrorAlert('Please fix the validation errors before submitting');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/v1/youtube', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          views: Number(formData.views) || 0,
          likes: Number(formData.likes) || 0,
        }),
      });

      const result = await response.json();

      if (result.success) {
        showSuccessAlert('YouTube video added successfully!');
        setTimeout(() => {
          router.push('/admin/youtube');
        }, 2000);
      } else {
        showErrorAlert(result.message || 'Failed to add video');
      }
    } catch (error) {
      console.error('Error adding video:', error);
      showErrorAlert('Failed to connect to server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <IconButton onClick={() => router.back()} sx={{ mr: 2 }}>
          <ArrowBack />
        </IconButton>
        <Typography variant="h4" component="h1" sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <VideoLibrary color="primary" sx={{ fontSize: 40 }} />
          Add New YouTube Video
        </Typography>
      </Box>

      <Box component="form" onSubmit={handleSubmit}>
        {/* Basic Information */}
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Basic Information
            </Typography>
            
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="YouTube Video ID or URL"
                  value={formData.videoId}
                  onChange={(e) => handleVideoIdChange(e.target.value)}
                  error={!!errors.videoId}
                  helperText={errors.videoId || 'Enter YouTube video ID or full URL'}
                  placeholder="dQw4w9WgXcQ or https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Duration"
                  value={formData.duration}
                  onChange={(e) => handleInputChange('duration', e.target.value)}
                  error={!!errors.duration}
                  helperText={errors.duration || 'Format: MM:SS (e.g., 15:30)'}
                  placeholder="15:30"
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Title"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  error={!!errors.title}
                  helperText={errors.title || 'Enter the video title'}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  error={!!errors.description}
                  helperText={errors.description || 'Enter a detailed description'}
                  multiline
                  rows={4}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth required error={!!errors.category}>
                  <InputLabel>Category</InputLabel>
                  <Select
                    value={formData.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    label="Category"
                  >
                    {categories.map(category => (
                      <MenuItem key={category} value={category}>
                        {category}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Publish Date"
                  type="date"
                  value={formData.publishDate}
                  onChange={(e) => handleInputChange('publishDate', e.target.value)}
                  error={!!errors.publishDate}
                  helperText={errors.publishDate}
                  InputLabelProps={{ shrink: true }}
                  required
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Thumbnail Preview */}
        {formData.thumbnail && (
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Thumbnail Preview
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar
                  src={formData.thumbnail}
                  sx={{ width: 120, height: 90, borderRadius: 2 }}
                  variant="rounded"
                />
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Auto-generated from Video ID
                  </Typography>
                  <TextField
                    fullWidth
                    label="Thumbnail URL"
                    value={formData.thumbnail}
                    onChange={(e) => handleInputChange('thumbnail', e.target.value)}
                    size="small"
                    sx={{ mt: 1, minWidth: 300 }}
                  />
                </Box>
              </Box>
            </CardContent>
          </Card>
        )}

        {/* Statistics */}
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Statistics
            </Typography>
            
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Views"
                  type="number"
                  value={formData.views}
                  onChange={(e) => handleInputChange('views', parseInt(e.target.value) || 0)}
                  inputProps={{ min: 0 }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Likes"
                  type="number"
                  value={formData.likes}
                  onChange={(e) => handleInputChange('likes', parseInt(e.target.value) || 0)}
                  inputProps={{ min: 0 }}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Content Details */}
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Content Details
            </Typography>
            
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Tags"
                  value={formData.tags.join(', ')}
                  onChange={(e) => handleTagsChange(e.target.value)}
                  placeholder="mental-health, wellness, psychology"
                  helperText="Separate tags with commas"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Channel Name"
                  value={formData.channelName}
                  onChange={(e) => handleInputChange('channelName', e.target.value)}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Settings */}
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Settings
            </Typography>
            
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.featured}
                    onChange={(e) => handleInputChange('featured', e.target.checked)}
                  />
                }
                label="Featured"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.isTrending}
                    onChange={(e) => handleInputChange('isTrending', e.target.checked)}
                  />
                }
                label="Trending"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.isNew}
                    onChange={(e) => handleInputChange('isNew', e.target.checked)}
                  />
                }
                label="New"
              />
            </Box>
          </CardContent>
        </Card>

        {/* Submit Buttons */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 3 }}>
          <Button
            variant="outlined"
            onClick={() => router.back()}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            startIcon={loading ? <CircularProgress size={16} color="inherit" /> : <CloudUpload />}
          >
            {loading ? 'Adding...' : 'Add Video'}
          </Button>
        </Box>
      </Box>

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
        open={loading}
      >
        <Box sx={{ textAlign: 'center' }}>
          <CircularProgress color="inherit" size={60} />
          <Typography variant="h6" sx={{ mt: 2 }}>
            Adding video...
          </Typography>
        </Box>
      </Backdrop>
    </Box>
  );
}
