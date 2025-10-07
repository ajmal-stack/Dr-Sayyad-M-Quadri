'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Typography,
  Button,
  TextField,
  Grid,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  Chip,
  Alert,
  Snackbar,
  Backdrop,
  CircularProgress,
  Paper,
  Divider,
  IconButton,
  Avatar,
} from '@mui/material';
import {
  ArrowBack,
  CloudUpload,
  Add,
  Delete,
  AudioFile,
  Image as ImageIcon,
} from '@mui/icons-material';

interface PodcastFormData {
  title: string;
  description: string;
  duration: string;
  category: string;
  featured: boolean;
  host: string;
  episodeNumber: number;
  transcript: string;
  showNotes: string[];
  tags: string[];
  isActive: boolean;
  isPublished: boolean;
}

interface FileUploads {
  audioFile: File | null;
  coverImage: File | null;
}

interface SnackbarState {
  open: boolean;
  message: string;
  severity: 'success' | 'error' | 'warning' | 'info';
}

export default function AddPodcastPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState<PodcastFormData>({
    title: '',
    description: '',
    duration: '',
    category: '',
    featured: false,
    host: 'Dr. Syed M Quadri',
    episodeNumber: 1,
    transcript: '',
    showNotes: [''],
    tags: [],
    isActive: true,
    isPublished: false
  });

  const [files, setFiles] = useState<FileUploads>({
    audioFile: null,
    coverImage: null
  });
  
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    message: '',
    severity: 'success'
  });

  // Utility functions
  const showSuccessAlert = (message: string) => {
    setSnackbar({ open: true, message, severity: 'success' });
  };

  const showErrorAlert = (message: string) => {
    setSnackbar({ open: true, message, severity: 'error' });
  };

  // Categories
  const categories = [
    'Mental Health',
    'Psychology',
    'Health & Wellness', 
    'Self-Development',
    'Nutrition',
    'Wellness',
    'Medical',
    'Therapy'
  ];

  // Validation
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length < 3 || formData.title.length > 200) {
      newErrors.title = 'Title must be between 3 and 200 characters';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.length < 10) {
      newErrors.description = 'Description must be at least 10 characters';
    }

    if (!formData.duration.trim()) {
      newErrors.duration = 'Duration is required';
    } else if (!/^([0-9]{1,2}):([0-5][0-9])$/.test(formData.duration)) {
      newErrors.duration = 'Duration must be in MM:SS format (e.g., 45:30)';
    }

    if (!formData.category) {
      newErrors.category = 'Category is required';
    }

    if (!files.audioFile) {
      newErrors.audioFile = 'Audio file is required';
    }

    if (!files.coverImage) {
      newErrors.coverImage = 'Cover image is required';
    }

    if (!formData.episodeNumber || formData.episodeNumber < 1) {
      newErrors.episodeNumber = 'Episode number must be at least 1';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Create FormData for file upload
      const formDataToSend = new FormData();
      
      // Add form fields
      Object.entries(formData).forEach(([key, value]) => {
        if (key === 'showNotes' || key === 'tags') {
          const arrayValue = Array.isArray(value) ? value.filter(item => item.trim() !== '') : [];
          arrayValue.forEach((item, index) => {
            formDataToSend.append(`${key}[${index}]`, item);
          });
        } else {
          formDataToSend.append(key, value.toString());
        }
      });
      
      // Add files
      if (files.audioFile) {
        formDataToSend.append('audioFile', files.audioFile);
      }
      if (files.coverImage) {
        formDataToSend.append('coverImage', files.coverImage);
      }

      const response = await fetch('http://localhost:5000/api/v1/podcasts', {
        method: 'POST',
        body: formDataToSend, // Don't set Content-Type header for FormData
      });

      const result = await response.json();

      if (result.success) {
        showSuccessAlert('Podcast created successfully!');
        setTimeout(() => router.push('/admin/podcasts'), 1500);
      } else {
        showErrorAlert(result.message || 'Failed to create podcast');
      }
    } catch (error) {
      console.error('Error creating podcast:', error);
      showErrorAlert('Failed to create podcast. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle input changes
  const handleInputChange = (field: keyof PodcastFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  // Handle show notes
  const handleShowNotesChange = (index: number, value: string) => {
    const newShowNotes = [...formData.showNotes];
    newShowNotes[index] = value;
    setFormData(prev => ({ ...prev, showNotes: newShowNotes }));
  };

  const addShowNote = () => {
    setFormData(prev => ({ ...prev, showNotes: [...prev.showNotes, ''] }));
  };

  const removeShowNote = (index: number) => {
    const newShowNotes = formData.showNotes.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, showNotes: newShowNotes }));
  };

  // Handle tags
  const handleTagsChange = (value: string) => {
    const tags = value.split(',').map(tag => tag.trim().toLowerCase());
    setFormData(prev => ({ ...prev, tags }));
  };

  // Handle file uploads
  const handleFileChange = (field: keyof FileUploads, file: File | null) => {
    setFiles(prev => ({ ...prev, [field]: file }));
    
    // Clear error when user selects a file
    if (file && errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  // Format file size
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: 3 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <IconButton
          onClick={() => router.back()}
          sx={{ mr: 2 }}
          color="primary"
        >
          <ArrowBack />
        </IconButton>
        <Box>
          <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
            Add New Podcast
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Create a new podcast episode with audio and cover image
          </Typography>
        </Box>
      </Box>

      {/* Form */}
      <Box component="form" onSubmit={handleSubmit}>
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Basic Information
            </Typography>
            
            <Grid container spacing={3}>
              {/* Title */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Title"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  error={!!errors.title}
                  helperText={errors.title}
                  placeholder="Enter podcast title"
                  required
                />
              </Grid>

              {/* Episode Number */}
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Episode Number"
                  type="number"
                  value={formData.episodeNumber}
                  onChange={(e) => handleInputChange('episodeNumber', parseInt(e.target.value) || 1)}
                  error={!!errors.episodeNumber}
                  helperText={errors.episodeNumber}
                  inputProps={{ min: 1 }}
                  required
                />
              </Grid>

              {/* Duration */}
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Duration"
                  value={formData.duration}
                  onChange={(e) => handleInputChange('duration', e.target.value)}
                  error={!!errors.duration}
                  helperText={errors.duration || 'Format: MM:SS (e.g., 45:30)'}
                  placeholder="45:30"
                  required
                />
              </Grid>

              {/* Category */}
              <Grid item xs={12} md={6}>
                <FormControl fullWidth error={!!errors.category} required>
                  <InputLabel>Category</InputLabel>
                  <Select
                    value={formData.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    label="Category"
                  >
                    {categories.map(category => (
                      <MenuItem key={category} value={category}>{category}</MenuItem>
                    ))}
                  </Select>
                  {errors.category && (
                    <Typography variant="caption" color="error" sx={{ mt: 0.5 }}>
                      {errors.category}
                    </Typography>
                  )}
                </FormControl>
              </Grid>

              {/* Host */}
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Host"
                  value={formData.host}
                  onChange={(e) => handleInputChange('host', e.target.value)}
                  placeholder="Dr. Syed M Quadri"
                />
              </Grid>

              {/* Description */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  error={!!errors.description}
                  helperText={errors.description}
                  placeholder="Describe the podcast episode content"
                  multiline
                  rows={4}
                  required
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Media Section */}
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Media Files
            </Typography>
          
            <Grid container spacing={3}>
              {/* Audio File Upload */}
              <Grid item xs={12}>
                <Typography variant="subtitle1" gutterBottom>
                  Audio File *
                </Typography>
                <Paper
                  sx={{
                    p: 3,
                    border: '2px dashed',
                    borderColor: 'grey.300',
                    textAlign: 'center',
                    cursor: 'pointer',
                    '&:hover': { borderColor: 'grey.400' }
                  }}
                >
                  <input
                    type="file"
                    accept=".mp3,.wav,.m4a,.aac,.ogg"
                    onChange={(e) => handleFileChange('audioFile', e.target.files?.[0] || null)}
                    style={{ display: 'none' }}
                    id="audio-upload"
                  />
                  <label htmlFor="audio-upload" style={{ cursor: 'pointer', width: '100%', display: 'block' }}>
                    <AudioFile sx={{ fontSize: 48, color: 'grey.400', mb: 1 }} />
                    <Typography variant="body1" color="primary" sx={{ mb: 1 }}>
                      Upload audio file or drag and drop
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      MP3, WAV, M4A, AAC, OGG up to 500MB
                    </Typography>
                    {files.audioFile && (
                      <Typography variant="body2" color="success.main" sx={{ mt: 1 }}>
                        ✓ {files.audioFile.name} ({formatFileSize(files.audioFile.size)})
                      </Typography>
                    )}
                  </label>
                </Paper>
                {errors.audioFile && (
                  <Typography variant="caption" color="error" sx={{ mt: 1, display: 'block' }}>
                    {errors.audioFile}
                  </Typography>
                )}
              </Grid>

              {/* Cover Image Upload */}
              <Grid item xs={12}>
                <Typography variant="subtitle1" gutterBottom>
                  Cover Image *
                </Typography>
                <Paper
                  sx={{
                    p: 3,
                    border: '2px dashed',
                    borderColor: 'grey.300',
                    textAlign: 'center',
                    cursor: 'pointer',
                    '&:hover': { borderColor: 'grey.400' }
                  }}
                >
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange('coverImage', e.target.files?.[0] || null)}
                    style={{ display: 'none' }}
                    id="image-upload"
                  />
                  <label htmlFor="image-upload" style={{ cursor: 'pointer', width: '100%', display: 'block' }}>
                    <ImageIcon sx={{ fontSize: 48, color: 'grey.400', mb: 1 }} />
                    <Typography variant="body1" color="primary" sx={{ mb: 1 }}>
                      Upload cover image or drag and drop
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      PNG, JPG, GIF up to 10MB
                    </Typography>
                    {files.coverImage && (
                      <Box sx={{ mt: 2 }}>
                        <Typography variant="body2" color="success.main" sx={{ mb: 1 }}>
                          ✓ {files.coverImage.name} ({formatFileSize(files.coverImage.size)})
                        </Typography>
                        <Avatar
                          src={URL.createObjectURL(files.coverImage)}
                          sx={{ width: 80, height: 80, mx: 'auto' }}
                          variant="rounded"
                        />
                      </Box>
                    )}
                  </label>
                </Paper>
                {errors.coverImage && (
                  <Typography variant="caption" color="error" sx={{ mt: 1, display: 'block' }}>
                    {errors.coverImage}
                  </Typography>
                )}
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Content Section */}
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Content Details
            </Typography>
              
              <Grid container spacing={3}>
                {/* Tags */}
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

                {/* Show Notes */}
                <Grid item xs={12}>
                  <Typography variant="subtitle1" gutterBottom>
                    Show Notes
                  </Typography>
                  {formData.showNotes.map((note, index) => (
                    <Box key={index} sx={{ display: 'flex', gap: 1, mb: 1 }}>
                      <TextField
                        fullWidth
                        value={note}
                        onChange={(e) => handleShowNotesChange(index, e.target.value)}
                        placeholder="Introduction (0:00 - 5:00)"
                        size="small"
                      />
                      {formData.showNotes.length > 1 && (
                        <IconButton
                          onClick={() => removeShowNote(index)}
                          color="error"
                          size="small"
                        >
                          <Delete />
                        </IconButton>
                      )}
                    </Box>
                  ))}
                  <Button
                    startIcon={<Add />}
                    onClick={addShowNote}
                    size="small"
                    sx={{ mt: 1 }}
                  >
                    Add Show Note
                  </Button>
                </Grid>

                {/* Settings */}
                <Grid item xs={12}>
                  <Typography variant="subtitle1" gutterBottom>
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
                          checked={formData.isPublished}
                          onChange={(e) => handleInputChange('isPublished', e.target.checked)}
                        />
                      }
                      label="Published"
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          checked={formData.isActive}
                          onChange={(e) => handleInputChange('isActive', e.target.checked)}
                        />
                      }
                      label="Active"
                    />
                  </Box>
                </Grid>
              </Grid>
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
            {loading ? 'Creating...' : 'Create Podcast'}
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
            Creating podcast...
          </Typography>
        </Box>
      </Backdrop>
    </Box>
  );
}
