'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  IconButton,
  Chip,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  CircularProgress,
  Skeleton,
  Tooltip,
  Paper,
} from '@mui/material';
import {
  Add,
  Search,
  Edit,
  Delete,
  Visibility,
  LocalHospital,
  TrendingUp,
  Phone,
  Star,
  FilterList,
  Refresh,
  Psychology,
  HealthAndSafety,
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { treatmentsApi, type Treatment } from '@/services/api/treatmentsApi';

export default function TreatmentsPage() {
  const router = useRouter();
  const [treatments, setTreatments] = useState<Treatment[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [categories, setCategories] = useState<Array<{ name: string; slug: string; count: number }>>([]);
  const [stats, setStats] = useState({
    total: 0,
    published: 0,
    featured: 0,
    totalViews: 0,
    totalInquiries: 0,
    totalBookings: 0,
  });
  const [confirmDialog, setConfirmDialog] = useState<{
    open: boolean;
    treatmentId: string | null;
    treatmentName: string;
  }>({
    open: false,
    treatmentId: null,
    treatmentName: '',
  });
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error' | 'warning' | 'info';
  }>({
    open: false,
    message: '',
    severity: 'success',
  });

  // Load initial data
  useEffect(() => {
    loadInitialData();
  }, []);

  // Filter treatments when search or filters change
  useEffect(() => {
    fetchTreatments();
  }, [searchQuery, filterCategory, filterStatus]);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      
      // Load stats and categories in parallel
      const [statsResponse, categoriesResponse] = await Promise.all([
        treatmentsApi.getStats(),
        treatmentsApi.getCategories(),
      ]);

      if (statsResponse.success) {
        setStats({
          total: statsResponse.data.total || 0,
          published: statsResponse.data.published || 0,
          featured: statsResponse.data.featured || 0,
          totalViews: statsResponse.data.engagement?.totalViews || 0,
          totalInquiries: statsResponse.data.engagement?.totalInquiries || 0,
          totalBookings: statsResponse.data.engagement?.totalBookings || 0,
        });
      }

      if (categoriesResponse.success) {
        setCategories(categoriesResponse.data || []);
      }

      // Load treatments
      await fetchTreatments();
    } catch (error) {
      console.error('Error loading initial data:', error);
      showSnackbar('Failed to load data', 'error');
    } finally {
      setLoading(false);
    }
  };

  const fetchTreatments = async () => {
    try {
      let response;

      if (searchQuery) {
        response = await treatmentsApi.search(searchQuery);
      } else {
        const params: any = {
          limit: 50,
          adminView: true, // Show all treatments including drafts
        };

        if (filterCategory) {
          params.category = filterCategory;
        }

        if (filterStatus) {
          params.status = filterStatus;
        }

        response = await treatmentsApi.getAll(params);
      }

      if (response.success) {
        setTreatments(response.data || []);
      }
    } catch (error) {
      console.error('Error fetching treatments:', error);
      showSnackbar('Failed to fetch treatments', 'error');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      setDeleting(id);
      const response = await treatmentsApi.delete(id);

      if (response.success) {
        showSnackbar('Treatment deleted successfully!', 'success');
        await loadInitialData();
      } else {
        showSnackbar(response.message || 'Failed to delete treatment', 'error');
      }
    } catch (error: any) {
      console.error('Error deleting treatment:', error);
      showSnackbar(error.message || 'Failed to delete treatment', 'error');
    } finally {
      setDeleting(null);
      setConfirmDialog({ open: false, treatmentId: null, treatmentName: '' });
    }
  };

  const handleRefresh = () => {
    setSearchQuery('');
    setFilterCategory('');
    setFilterStatus('');
    loadInitialData();
  };

  const handleViewTreatment = (slug: string) => {
    window.open(`/treatments/${slug}`, '_blank');
  };

  const showSnackbar = (message: string, severity: 'success' | 'error' | 'warning' | 'info') => {
    setSnackbar({ open: true, message, severity });
  };

  const getCategoryIcon = (category: string) => {
    return category === 'Mental Health' ? <Psychology /> : <HealthAndSafety />;
  };

  const getCategoryColor = (category: string) => {
    return category === 'Mental Health' ? 'primary' : 'success';
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h4" gutterBottom fontWeight="bold">
            Treatments Management
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage your treatment services and content
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => router.push('/admin/treatments/add')}
          size="large"
        >
          Add Treatment
        </Button>
      </Box>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="text.secondary" variant="body2">
                    Total Treatments
                  </Typography>
                  <Typography variant="h4" fontWeight="bold">
                    {stats.total}
                  </Typography>
                </Box>
                <LocalHospital sx={{ fontSize: 48, color: 'primary.main', opacity: 0.3 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="text.secondary" variant="body2">
                    Total Views
                  </Typography>
                  <Typography variant="h4" fontWeight="bold">
                    {stats.totalViews.toLocaleString()}
                  </Typography>
                </Box>
                <Visibility sx={{ fontSize: 48, color: 'info.main', opacity: 0.3 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="text.secondary" variant="body2">
                    Total Inquiries
                  </Typography>
                  <Typography variant="h4" fontWeight="bold">
                    {stats.totalInquiries}
                  </Typography>
                </Box>
                <Phone sx={{ fontSize: 48, color: 'warning.main', opacity: 0.3 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="text.secondary" variant="body2">
                    Featured
                  </Typography>
                  <Typography variant="h4" fontWeight="bold">
                    {stats.featured}
                  </Typography>
                </Box>
                <Star sx={{ fontSize: 48, color: 'warning.main', opacity: 0.3 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Filters */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              placeholder="Search treatments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={filterCategory}
                label="Category"
                onChange={(e) => setFilterCategory(e.target.value)}
              >
                <MenuItem value="">All Categories</MenuItem>
                {categories.map((cat) => (
                  <MenuItem key={cat.slug} value={cat.name}>
                    {cat.name} ({cat.count})
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={filterStatus}
                label="Status"
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <MenuItem value="">All Status</MenuItem>
                <MenuItem value="published">Published</MenuItem>
                <MenuItem value="draft">Draft</MenuItem>
                <MenuItem value="archived">Archived</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={2}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<Refresh />}
              onClick={handleRefresh}
            >
              Reset
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Treatments Grid */}
      {loading ? (
        <Grid container spacing={3}>
          {[...Array(8)].map((_, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Card>
                <Skeleton variant="rectangular" height={200} />
                <CardContent>
                  <Skeleton variant="text" height={32} />
                  <Skeleton variant="text" />
                  <Skeleton variant="text" />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : treatments.length === 0 ? (
        <Paper
          sx={{
            p: 8,
            textAlign: 'center',
            backgroundColor: 'background.default',
          }}
        >
          <LocalHospital sx={{ fontSize: 80, color: 'text.disabled', mb: 2 }} />
          <Typography variant="h5" gutterBottom>
            {searchQuery || filterCategory || filterStatus
              ? 'No treatments found'
              : 'No treatments yet'}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            {searchQuery || filterCategory || filterStatus
              ? 'Try adjusting your search or filters'
              : 'Get started by adding your first treatment'}
          </Typography>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => router.push('/admin/treatments/add')}
          >
            Add Treatment
          </Button>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {treatments.map((treatment) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={treatment._id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 6,
                  },
                  position: 'relative',
                }}
              >
                {/* Featured Badge */}
                {treatment.featured && (
                  <Chip
                    icon={<Star />}
                    label="Featured"
                    color="warning"
                    size="small"
                    sx={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      zIndex: 1,
                      fontWeight: 'bold',
                    }}
                  />
                )}

                {/* Image */}
                <CardMedia
                  component="div"
                  sx={{
                    height: 200,
                    backgroundColor: 'grey.200',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                  }}
                >
                  {treatment.image ? (
                    <img
                      src={treatment.image.startsWith('http') ? treatment.image : `https://via.placeholder.com/400x200/e0e0e0/666?text=${encodeURIComponent(treatment.name.substring(0, 20))}`}
                      alt={treatment.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                      onError={(e) => {
                        const target = e.currentTarget as HTMLImageElement;
                        target.src = `https://via.placeholder.com/400x200/f5f5f5/999?text=${encodeURIComponent(treatment.category || 'Treatment')}`;
                      }}
                    />
                  ) : (
                    <LocalHospital sx={{ fontSize: 80, color: 'grey.400' }} />
                  )}

                  {/* Status Badge */}
                  <Chip
                    label={treatment.status}
                    size="small"
                    color={
                      treatment.status === 'published'
                        ? 'success'
                        : treatment.status === 'draft'
                        ? 'warning'
                        : 'default'
                    }
                    sx={{
                      position: 'absolute',
                      bottom: 8,
                      left: 8,
                      fontWeight: 'bold',
                      textTransform: 'capitalize',
                    }}
                  />
                </CardMedia>

                {/* Content */}
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{
                      fontWeight: 'bold',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      minHeight: '3.6em',
                    }}
                  >
                    {treatment.name}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      mb: 2,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      minHeight: '2.8em',
                    }}
                  >
                    {treatment.description}
                  </Typography>

                  {/* Category & Duration */}
                  <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                    <Chip
                      icon={getCategoryIcon(treatment.category)}
                      label={treatment.category}
                      size="small"
                      color={getCategoryColor(treatment.category)}
                      variant="outlined"
                    />
                    {treatment.duration && (
                      <Chip
                        label={treatment.duration}
                        size="small"
                        variant="outlined"
                      />
                    )}
                  </Box>

                  {/* Stats */}
                  <Box sx={{ display: 'flex', gap: 2, mb: 1 }}>
                    <Tooltip title="Views">
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <Visibility sx={{ fontSize: 16, color: 'text.secondary' }} />
                        <Typography variant="caption" color="text.secondary">
                          {treatment.views}
                        </Typography>
                      </Box>
                    </Tooltip>
                    <Tooltip title="Inquiries">
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <Phone sx={{ fontSize: 16, color: 'text.secondary' }} />
                        <Typography variant="caption" color="text.secondary">
                          {treatment.inquiries}
                        </Typography>
                      </Box>
                    </Tooltip>
                    <Tooltip title="Bookings">
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <TrendingUp sx={{ fontSize: 16, color: 'text.secondary' }} />
                        <Typography variant="caption" color="text.secondary">
                          {treatment.bookings}
                        </Typography>
                      </Box>
                    </Tooltip>
                  </Box>

                  <Typography variant="caption" color="text.secondary">
                    Updated: {new Date(treatment.updatedAt).toLocaleDateString()}
                  </Typography>
                </CardContent>

                {/* Actions */}
                <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
                  <Button
                    size="small"
                    startIcon={<Visibility />}
                    onClick={() => handleViewTreatment(treatment.slug || treatment._id)}
                    fullWidth
                    variant="outlined"
                  >
                    Preview
                  </Button>
                  <Tooltip title="Edit">
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() => router.push(`/admin/treatments/edit/${treatment._id}`)}
                    >
                      <Edit />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() =>
                        setConfirmDialog({
                          open: true,
                          treatmentId: treatment._id,
                          treatmentName: treatment.name,
                        })
                      }
                      disabled={deleting === treatment._id}
                    >
                      {deleting === treatment._id ? (
                        <CircularProgress size={20} />
                      ) : (
                        <Delete />
                      )}
                    </IconButton>
                  </Tooltip>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={confirmDialog.open}
        onClose={() => setConfirmDialog({ open: false, treatmentId: null, treatmentName: '' })}
      >
        <DialogTitle>Delete Treatment</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete <strong>{confirmDialog.treatmentName}</strong>?
            This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setConfirmDialog({ open: false, treatmentId: null, treatmentName: '' })}
          >
            Cancel
          </Button>
          <Button
            onClick={() => confirmDialog.treatmentId && handleDelete(confirmDialog.treatmentId)}
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
