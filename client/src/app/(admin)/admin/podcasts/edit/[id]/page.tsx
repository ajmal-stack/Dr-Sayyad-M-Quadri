'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
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
  PlayArrow,
  Pause,
  VolumeUp,
} from '@mui/icons-material';

interface PodcastFormData {
  title: string;
  description: string;
  duration: string;
  category: string;
  audioUrl: string;
  coverImage: string;
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

interface AudioPlayerState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
}

export default function EditPodcastPage() {
  const router = useRouter();
  const params = useParams();
  const podcastId = params.id as string;

  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [files, setFiles] = useState<FileUploads>({
    audioFile: null,
    coverImage: null
  });
  
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    message: '',
    severity: 'success'
  });

  const [audioPlayer, setAudioPlayer] = useState<AudioPlayerState>({
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: 1
  });

  const audioRef = React.useRef<HTMLAudioElement>(null);

  // Utility functions
  const showSuccessAlert = (message: string) => {
    setSnackbar({ open: true, message, severity: 'success' });
  };

  const showErrorAlert = (message: string) => {
    setSnackbar({ open: true, message, severity: 'error' });
  };

  const [formData, setFormData] = useState<PodcastFormData>({
    title: '',
    description: '',
    duration: '',
    category: '',
    audioUrl: '',
    coverImage: '',
    featured: false,
    host: 'Dr. Syed M Quadri',
    episodeNumber: 1,
    transcript: '',
    showNotes: [''],
    tags: [],
    isActive: true,
    isPublished: false
  });

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

  // Fetch podcast data
  useEffect(() => {
    const fetchPodcast = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/v1/podcasts/${podcastId}`);
        const result = await response.json();

        if (result.success) {
          const podcast = result.data;
          setFormData({
            title: podcast.title || '',
            description: podcast.description || '',
            duration: podcast.duration || '',
            category: podcast.category || '',
            audioUrl: podcast.audioUrl || '',
            coverImage: podcast.coverImage || '',
            featured: podcast.featured || false,
            host: podcast.host || 'Dr. Syed M Quadri',
            episodeNumber: podcast.episodeNumber || 1,
            transcript: podcast.transcript || '',
            showNotes: podcast.showNotes?.length > 0 ? podcast.showNotes : [''],
            tags: podcast.tags || [],
            isActive: podcast.isActive !== undefined ? podcast.isActive : true,
            isPublished: podcast.isPublished !== undefined ? podcast.isPublished : false
          });
        } else {
          alert('Failed to fetch podcast data');
          router.push('/admin/podcasts');
        }
      } catch (error) {
        console.error('Error fetching podcast:', error);
        alert('Failed to fetch podcast data');
        router.push('/admin/podcasts');
      } finally {
        setFetchLoading(false);
      }
    };

    if (podcastId) {
      fetchPodcast();
    }
  }, [podcastId, router]);

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

    // Audio is optional in edit mode if there's already an existing file
    if (!formData.audioUrl.trim() && !files.audioFile) {
      newErrors.audioFile = 'Audio file is required';
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
      
      // Add files if selected
      if (files.audioFile) {
        formDataToSend.append('audioFile', files.audioFile);
      }
      if (files.coverImage) {
        formDataToSend.append('coverImage', files.coverImage);
      }

      const response = await fetch(`http://localhost:5000/api/v1/podcasts/${podcastId}`, {
        method: 'PUT',
        body: formDataToSend, // Don't set Content-Type header for FormData
      });

      const result = await response.json();

      if (result.success) {
        showSuccessAlert('Podcast updated successfully!');
        setTimeout(() => router.push('/admin/podcasts'), 1500);
      } else {
        showErrorAlert(result.message || 'Failed to update podcast');
      }
    } catch (error) {
      console.error('Error updating podcast:', error);
      showErrorAlert('Failed to update podcast. Please try again.');
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

  if (fetchLoading) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-gray-600">Loading podcast...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center mb-6">
        <IconButton
          onClick={() => router.back()}
          sx={{ mr: 2 }}
          color="primary"
        >
          <ArrowBack />
        </IconButton>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Edit Podcast</h1>
          <p className="text-gray-600 mt-1">Update podcast episode details</p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Title */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.title ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Enter podcast title"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">{errors.title}</p>
              )}
            </div>

            {/* Episode Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Episode Number *
              </label>
              <input
                type="number"
                min="1"
                value={formData.episodeNumber}
                onChange={(e) => handleInputChange('episodeNumber', parseInt(e.target.value) || 1)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.episodeNumber ? 'border-red-300' : 'border-gray-300'
                }`}
              />
              {errors.episodeNumber && (
                <p className="mt-1 text-sm text-red-600">{errors.episodeNumber}</p>
              )}
            </div>

            {/* Duration */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Duration (MM:SS) *
              </label>
              <input
                type="text"
                value={formData.duration}
                onChange={(e) => handleInputChange('duration', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.duration ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="e.g., 45:30"
              />
              {errors.duration && (
                <p className="mt-1 text-sm text-red-600">{errors.duration}</p>
              )}
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.category ? 'border-red-300' : 'border-gray-300'
                }`}
              >
                <option value="">Select Category</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              {errors.category && (
                <p className="mt-1 text-sm text-red-600">{errors.category}</p>
              )}
            </div>

            {/* Host */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Host
              </label>
              <input
                type="text"
                value={formData.host}
                onChange={(e) => handleInputChange('host', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                rows={4}
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.description ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Describe the podcast episode content"
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">{errors.description}</p>
              )}
            </div>
          </div>
        </div>

        {/* Media Section */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Media Files</h2>
          
          <div className="space-y-6">
            {/* Current Audio File with Player */}
            {formData.audioUrl && (
              <Card sx={{ mb: 2, bgcolor: 'grey.50' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <AudioFile color="primary" />
                    Current Audio File
                  </Typography>
                  
                  {/* Audio Player */}
                  <Box sx={{ mt: 2 }}>
                    <audio
                      ref={audioRef}
                      src={formData.audioUrl}
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
                    
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      {formData.audioUrl}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            )}

            {/* Audio File Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {formData.audioUrl ? 'Replace Audio File' : 'Upload Audio File'}
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-gray-400 transition-colors">
                <div className="space-y-1 text-center">
                  <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div className="flex text-sm text-gray-600">
                    <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                      <span>Upload audio file</span>
                      <input
                        type="file"
                        className="sr-only"
                        accept=".mp3,.wav,.m4a,.aac,.ogg"
                        onChange={(e) => handleFileChange('audioFile', e.target.files?.[0] || null)}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">MP3, WAV, M4A, AAC, OGG up to 500MB</p>
                  {files.audioFile && (
                    <div className="mt-2 text-sm text-green-600">
                      ✓ {files.audioFile.name} ({formatFileSize(files.audioFile.size)})
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Current Cover Image */}
            {formData.coverImage && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Current Cover Image</h3>
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <img 
                      src={formData.coverImage} 
                      alt="Current cover" 
                      className="h-16 w-16 object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900 truncate">{formData.coverImage}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Cover Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {formData.coverImage ? 'Replace Cover Image' : 'Upload Cover Image'}
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-gray-400 transition-colors">
                <div className="space-y-1 text-center">
                  <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div className="flex text-sm text-gray-600">
                    <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                      <span>Upload cover image</span>
                      <input
                        type="file"
                        className="sr-only"
                        accept="image/*"
                        onChange={(e) => handleFileChange('coverImage', e.target.files?.[0] || null)}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                  {files.coverImage && (
                    <div className="mt-2 text-sm text-green-600">
                      ✓ {files.coverImage.name} ({formatFileSize(files.coverImage.size)})
                    </div>
                  )}
                  {files.coverImage && (
                    <div className="mt-2">
                      <img 
                        src={URL.createObjectURL(files.coverImage)} 
                        alt="Preview" 
                        className="mx-auto h-20 w-20 object-cover rounded-lg"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Content Details</h2>
          
          <div className="space-y-4">
            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tags (comma-separated)
              </label>
              <input
                type="text"
                value={formData.tags.join(', ')}
                onChange={(e) => handleTagsChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="mental-health, wellness, psychology"
              />
            </div>

            {/* Show Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Show Notes
              </label>
              {formData.showNotes.map((note, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={note}
                    onChange={(e) => handleShowNotesChange(index, e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Introduction (0:00 - 5:00)"
                  />
                  {formData.showNotes.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeShowNote(index)}
                      className="px-3 py-2 text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addShowNote}
                className="text-blue-600 hover:text-blue-800 text-sm"
              >
                + Add Show Note
              </button>
            </div>

            {/* Transcript */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Transcript (Optional)
              </label>
              <textarea
                rows={6}
                value={formData.transcript}
                onChange={(e) => handleInputChange('transcript', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter the full transcript of the podcast episode..."
              />
            </div>
          </div>
        </div>

        {/* Settings Section */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Settings</h2>
          
          <div className="space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="featured"
                checked={formData.featured}
                onChange={(e) => handleInputChange('featured', e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="featured" className="ml-2 block text-sm text-gray-700">
                Featured Episode
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="isPublished"
                checked={formData.isPublished}
                onChange={(e) => handleInputChange('isPublished', e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="isPublished" className="ml-2 block text-sm text-gray-700">
                Published
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="isActive"
                checked={formData.isActive}
                onChange={(e) => handleInputChange('isActive', e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="isActive" className="ml-2 block text-sm text-gray-700">
                Active
              </label>
            </div>
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Updating...
              </>
            ) : (
              <>
                <CloudUpload />
                Update Podcast
              </>
            )}
          </button>
        </div>
      </form>

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
            Updating podcast...
          </Typography>
        </Box>
      </Backdrop>
    </div>
  );
}
