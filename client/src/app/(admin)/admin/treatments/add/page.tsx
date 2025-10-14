'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Switch,
  Chip,
  Paper,
  Snackbar,
  Alert,
  CircularProgress,
  Breadcrumbs,
  Link,
  Divider,
  InputAdornment,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import {
  Save,
  ArrowBack,
  Add as AddIcon,
  Close,
  ExpandMore,
  LocalHospital,
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { treatmentsApi } from '@/services/api/treatmentsApi';

interface TreatmentFormData {
  name: string;
  description: string;
  detailedDescription: string;
  category: 'Mental Health' | 'General Health' | '';
  subcategory: string;
  image: string;
  gradient: string;
  icon: string;
  duration: string;
  methods: string[];
  conditions: string[];
  keyPoints: string[];
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  status: 'draft' | 'published' | 'archived';
  featured: boolean;
  active: boolean;
  sessionCost: string;
  packageCost: string;
  insuranceAccepted: boolean;
  inPerson: boolean;
  telehealth: boolean;
  emergency: boolean;
}

interface ValidationErrors {
  name?: string;
  description?: string;
  category?: string;
}

export default function AddTreatmentPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<TreatmentFormData>({
    name: '',
    description: '',
    detailedDescription: '',
    category: '',
    subcategory: '',
    image: '',
    gradient: 'from-blue-500 to-indigo-600',
    icon: 'HeartIcon',
    duration: '8-12 sessions',
    methods: [],
    conditions: [],
    keyPoints: [],
    metaTitle: '',
    metaDescription: '',
    keywords: [],
    status: 'draft',
    featured: false,
    active: true,
    sessionCost: '',
    packageCost: '',
    insuranceAccepted: true,
    inPerson: true,
    telehealth: true,
    emergency: false,
  });

  const [methodInput, setMethodInput] = useState('');
  const [conditionInput, setConditionInput] = useState('');
  const [keyPointInput, setKeyPointInput] = useState('');
  const [keywordInput, setKeywordInput] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error' | 'warning' | 'info';
  }>({
    open: false,
    message: '',
    severity: 'success',
  });

  const handleInputChange = (field: keyof TreatmentFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear validation error for this field
    if (validationErrors[field as keyof ValidationErrors]) {
      setValidationErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleAddItem = (
    field: 'methods' | 'conditions' | 'keyPoints' | 'keywords',
    input: string,
    setInput: React.Dispatch<React.SetStateAction<string>>
  ) => {
    if (input.trim() && !formData[field].includes(input.trim())) {
      setFormData((prev) => ({
        ...prev,
        [field]: [...prev[field], input.trim()],
      }));
      setInput('');
    }
  };

  const handleRemoveItem = (
    field: 'methods' | 'conditions' | 'keyPoints' | 'keywords',
    itemToRemove: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((item) => item !== itemToRemove),
    }));
  };

  const handleKeyPress = (
    e: React.KeyboardEvent,
    field: 'methods' | 'conditions' | 'keyPoints' | 'keywords',
    input: string,
    setInput: React.Dispatch<React.SetStateAction<string>>
  ) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddItem(field, input, setInput);
    }
  };

  const validateForm = (): boolean => {
    const errors: ValidationErrors = {};

    if (!formData.name.trim()) {
      errors.name = 'Treatment name is required';
    } else if (formData.name.length < 3) {
      errors.name = 'Name must be at least 3 characters';
    }

    if (!formData.description.trim()) {
      errors.description = 'Description is required';
    } else if (formData.description.length < 10) {
      errors.description = 'Description must be at least 10 characters';
    }

    if (!formData.category) {
      errors.category = 'Category is required';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      showSnackbar('Please fix validation errors', 'error');
      return;
    }

    try {
      setSubmitting(true);

      // Prepare data
      const treatmentData: any = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        detailedDescription: formData.detailedDescription.trim(),
        category: formData.category,
        subcategory: formData.subcategory.trim() || undefined,
        image: formData.image.trim() || undefined,
        gradient: formData.gradient,
        icon: formData.icon,
        duration: formData.duration.trim() || undefined,
        methods: formData.methods,
        conditions: formData.conditions,
        keyPoints: formData.keyPoints,
        metaTitle: formData.metaTitle.trim() || undefined,
        metaDescription: formData.metaDescription.trim() || undefined,
        keywords: formData.keywords,
        status: formData.status,
        featured: formData.featured,
        active: formData.active,
      };

      // Add pricing if provided
      if (formData.sessionCost || formData.packageCost) {
        treatmentData.pricing = {
          sessionCost: formData.sessionCost ? parseFloat(formData.sessionCost) : undefined,
          packageCost: formData.packageCost ? parseFloat(formData.packageCost) : undefined,
          insuranceAccepted: formData.insuranceAccepted,
        };
      }

      // Add availability
      treatmentData.availability = {
        inPerson: formData.inPerson,
        telehealth: formData.telehealth,
        emergency: formData.emergency,
      };

      const response = await treatmentsApi.create(treatmentData);

      if (response.success) {
        showSnackbar('Treatment created successfully!', 'success');
        setTimeout(() => {
          router.push('/admin/treatments');
        }, 1500);
      } else {
        showSnackbar(response.message || 'Failed to create treatment', 'error');
      }
    } catch (error: any) {
      console.error('Error creating treatment:', error);
      showSnackbar(error.message || 'Failed to create treatment', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const showSnackbar = (message: string, severity: 'success' | 'error' | 'warning' | 'info') => {
    setSnackbar({ open: true, message, severity });
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Breadcrumbs sx={{ mb: 2 }}>
          <Link
            underline="hover"
            color="inherit"
            href="/admin/treatments"
            sx={{ cursor: 'pointer' }}
            onClick={(e) => {
              e.preventDefault();
              router.push('/admin/treatments');
            }}
          >
            Treatments
          </Link>
          <Typography color="text.primary">Add Treatment</Typography>
        </Breadcrumbs>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="h4" gutterBottom fontWeight="bold">
              Add New Treatment
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Create a new treatment service
            </Typography>
          </Box>
          <Button
            variant="outlined"
            startIcon={<ArrowBack />}
            onClick={() => router.push('/admin/treatments')}
          >
            Back
          </Button>
        </Box>
      </Box>

      {/* Form */}
      <Grid container spacing={3}>
        {/* Main Content */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Basic Information
            </Typography>
            <Divider sx={{ mb: 3 }} />

            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Treatment Name"
                  required
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  error={!!validationErrors.name}
                  helperText={validationErrors.name}
                  placeholder="e.g., Anxiety Disorders, Diabetes Management"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Short Description"
                  required
                  multiline
                  rows={2}
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  error={!!validationErrors.description}
                  helperText={validationErrors.description || 'Brief description (max 500 characters)'}
                  inputProps={{ maxLength: 500 }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Detailed Description"
                  multiline
                  rows={4}
                  value={formData.detailedDescription}
                  onChange={(e) => handleInputChange('detailedDescription', e.target.value)}
                  helperText="Longer description for treatment details (max 1000 characters)"
                  inputProps={{ maxLength: 1000 }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required error={!!validationErrors.category}>
                  <InputLabel>Category</InputLabel>
                  <Select
                    value={formData.category}
                    label="Category"
                    onChange={(e) => handleInputChange('category', e.target.value)}
                  >
                    <MenuItem value="Mental Health">Mental Health</MenuItem>
                    <MenuItem value="General Health">General Health</MenuItem>
                  </Select>
                  {validationErrors.category && (
                    <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 2 }}>
                      {validationErrors.category}
                    </Typography>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Subcategory"
                  value={formData.subcategory}
                  onChange={(e) => handleInputChange('subcategory', e.target.value)}
                  placeholder="e.g., Anxiety & Stress, Chronic Disease"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Duration"
                  value={formData.duration}
                  onChange={(e) => handleInputChange('duration', e.target.value)}
                  placeholder="e.g., 8-12 sessions, Ongoing care"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Image URL"
                  value={formData.image}
                  onChange={(e) => handleInputChange('image', e.target.value)}
                  placeholder="https://example.com/image.jpg"
                />
              </Grid>
            </Grid>
          </Paper>

          {/* Treatment Details */}
          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography variant="h6" fontWeight="bold">
                Treatment Details
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                {/* Methods */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Treatment Methods"
                    value={methodInput}
                    onChange={(e) => setMethodInput(e.target.value)}
                    onKeyPress={(e) => handleKeyPress(e, 'methods', methodInput, setMethodInput)}
                    placeholder="Add method and press Enter"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => handleAddItem('methods', methodInput, setMethodInput)}
                            edge="end"
                          >
                            <AddIcon />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                    {formData.methods.map((method) => (
                      <Chip
                        key={method}
                        label={method}
                        onDelete={() => handleRemoveItem('methods', method)}
                        color="primary"
                        variant="outlined"
                      />
                    ))}
                  </Box>
                </Grid>

                {/* Conditions */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Conditions Treated"
                    value={conditionInput}
                    onChange={(e) => setConditionInput(e.target.value)}
                    onKeyPress={(e) => handleKeyPress(e, 'conditions', conditionInput, setConditionInput)}
                    placeholder="Add condition and press Enter"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => handleAddItem('conditions', conditionInput, setConditionInput)}
                            edge="end"
                          >
                            <AddIcon />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                    {formData.conditions.map((condition) => (
                      <Chip
                        key={condition}
                        label={condition}
                        onDelete={() => handleRemoveItem('conditions', condition)}
                        color="secondary"
                        variant="outlined"
                      />
                    ))}
                  </Box>
                </Grid>

                {/* Key Points */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Key Points"
                    value={keyPointInput}
                    onChange={(e) => setKeyPointInput(e.target.value)}
                    onKeyPress={(e) => handleKeyPress(e, 'keyPoints', keyPointInput, setKeyPointInput)}
                    placeholder="Add key point and press Enter"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => handleAddItem('keyPoints', keyPointInput, setKeyPointInput)}
                            edge="end"
                          >
                            <AddIcon />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                    {formData.keyPoints.map((point) => (
                      <Chip
                        key={point}
                        label={point}
                        onDelete={() => handleRemoveItem('keyPoints', point)}
                        color="success"
                        variant="outlined"
                      />
                    ))}
                  </Box>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>

          {/* Pricing */}
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography variant="h6" fontWeight="bold">
                Pricing & Availability
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Session Cost"
                    type="number"
                    value={formData.sessionCost}
                    onChange={(e) => handleInputChange('sessionCost', e.target.value)}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Package Cost"
                    type="number"
                    value={formData.packageCost}
                    onChange={(e) => handleInputChange('packageCost', e.target.value)}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.insuranceAccepted}
                        onChange={(e) => handleInputChange('insuranceAccepted', e.target.checked)}
                      />
                    }
                    label="Insurance Accepted"
                  />
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="subtitle2" gutterBottom>
                    Availability Options
                  </Typography>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.inPerson}
                        onChange={(e) => handleInputChange('inPerson', e.target.checked)}
                      />
                    }
                    label="In-Person"
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.telehealth}
                        onChange={(e) => handleInputChange('telehealth', e.target.checked)}
                      />
                    }
                    label="Telehealth"
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.emergency}
                        onChange={(e) => handleInputChange('emergency', e.target.checked)}
                      />
                    }
                    label="Emergency Services"
                  />
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>

          {/* SEO */}
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography variant="h6" fontWeight="bold">
                SEO & Metadata
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Meta Title"
                    value={formData.metaTitle}
                    onChange={(e) => handleInputChange('metaTitle', e.target.value)}
                    helperText={`${formData.metaTitle.length}/60 characters`}
                    inputProps={{ maxLength: 60 }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Meta Description"
                    multiline
                    rows={2}
                    value={formData.metaDescription}
                    onChange={(e) => handleInputChange('metaDescription', e.target.value)}
                    helperText={`${formData.metaDescription.length}/160 characters`}
                    inputProps={{ maxLength: 160 }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Keywords"
                    value={keywordInput}
                    onChange={(e) => setKeywordInput(e.target.value)}
                    onKeyPress={(e) => handleKeyPress(e, 'keywords', keywordInput, setKeywordInput)}
                    placeholder="Add keyword and press Enter"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => handleAddItem('keywords', keywordInput, setKeywordInput)}
                            edge="end"
                          >
                            <AddIcon />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                    {formData.keywords.map((keyword) => (
                      <Chip
                        key={keyword}
                        label={keyword}
                        onDelete={() => handleRemoveItem('keywords', keyword)}
                        size="small"
                      />
                    ))}
                  </Box>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Grid>

        {/* Sidebar */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, position: 'sticky', top: 20 }}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Publish Settings
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Status</InputLabel>
              <Select
                value={formData.status}
                label="Status"
                onChange={(e) => handleInputChange('status', e.target.value)}
              >
                <MenuItem value="draft">Draft</MenuItem>
                <MenuItem value="published">Published</MenuItem>
                <MenuItem value="archived">Archived</MenuItem>
              </Select>
            </FormControl>

            <FormControlLabel
              control={
                <Switch
                  checked={formData.featured}
                  onChange={(e) => handleInputChange('featured', e.target.checked)}
                />
              }
              label="Featured Treatment"
              sx={{ mb: 2 }}
            />

            <FormControlLabel
              control={
                <Switch
                  checked={formData.active}
                  onChange={(e) => handleInputChange('active', e.target.checked)}
                />
              }
              label="Active"
              sx={{ mb: 3 }}
            />

            <Button
              fullWidth
              variant="contained"
              size="large"
              startIcon={submitting ? <CircularProgress size={20} /> : <Save />}
              onClick={handleSubmit}
              disabled={submitting}
            >
              {submitting ? 'Creating...' : 'Create Treatment'}
            </Button>
          </Paper>
        </Grid>
      </Grid>

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
