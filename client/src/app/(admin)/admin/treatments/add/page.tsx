'use client';

import React, { useState, useEffect } from 'react';
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
  Autocomplete,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
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
import { treatmentCategoriesApi } from '@/services/api/treatmentCategoriesApi';
import RichTextEditor from '@/components/ui/RichTextEditor';
import ImageUpload from '@/components/ui/ImageUpload';

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
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
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

  // Category and Subcategory state
  const [categories, setCategories] = useState<string[]>([]);
  const [subcategories, setSubcategories] = useState<string[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [loadingSubcategories, setLoadingSubcategories] = useState(false);
  
  // Dialog state for adding new category/subcategory
  const [categoryDialog, setCategoryDialog] = useState(false);
  const [subcategoryDialog, setSubcategoryDialog] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newSubcategoryName, setNewSubcategoryName] = useState('');
  const [addingCategory, setAddingCategory] = useState(false);
  const [addingSubcategory, setAddingSubcategory] = useState(false);

  // Load categories on mount
  useEffect(() => {
    loadCategories();
  }, []);

  // Load subcategories when category changes
  useEffect(() => {
    if (formData.category) {
      loadSubcategories(formData.category);
    } else {
      setSubcategories([]);
    }
  }, [formData.category]);

  const loadCategories = async () => {
    try {
      setLoadingCategories(true);
      const allCategories = await treatmentCategoriesApi.getAllCategories();
      const categoryNames = allCategories.map(cat => cat.name);
      setCategories(categoryNames);
    } catch (error) {
      console.error('Error loading categories:', error);
      showSnackbar('Failed to load categories', 'error');
    } finally {
      setLoadingCategories(false);
    }
  };

  const loadSubcategories = async (categoryName: string) => {
    try {
      setLoadingSubcategories(true);
      const type = categoryName as 'Mental Health' | 'General Health';
      const subs = await treatmentCategoriesApi.getSubcategories(categoryName, type);
      const subNames = subs.map(sub => sub.name);
      setSubcategories(subNames);
    } catch (error) {
      console.error('Error loading subcategories:', error);
      setSubcategories([]);
    } finally {
      setLoadingSubcategories(false);
    }
  };

  const handleAddNewCategory = async () => {
    if (!newCategoryName.trim()) {
      showSnackbar('Please enter a category name', 'warning');
      return;
    }

    try {
      setAddingCategory(true);
      const result = await treatmentCategoriesApi.getOrCreateCategory(
        newCategoryName,
        formData.category as 'Mental Health' | 'General Health'
      );
      
      showSnackbar(
        result.created ? 'Category created successfully' : 'Category already exists',
        'success'
      );
      
      await loadCategories();
      setCategoryDialog(false);
      setNewCategoryName('');
    } catch (error) {
      console.error('Error adding category:', error);
      showSnackbar('Failed to add category', 'error');
    } finally {
      setAddingCategory(false);
    }
  };

  const handleAddNewSubcategory = async () => {
    if (!newSubcategoryName.trim()) {
      showSnackbar('Please enter a subcategory name', 'warning');
      return;
    }

    if (!formData.category) {
      showSnackbar('Please select a category first', 'warning');
      return;
    }

    try {
      setAddingSubcategory(true);
      const result = await treatmentCategoriesApi.addSubcategory(
        formData.category,
        formData.category as 'Mental Health' | 'General Health',
        newSubcategoryName
      );
      
      showSnackbar(
        result.created ? 'Subcategory added successfully' : 'Subcategory already exists',
        'success'
      );
      
      await loadSubcategories(formData.category);
      setSubcategoryDialog(false);
      setNewSubcategoryName('');
      
      // Auto-select the new subcategory
      handleInputChange('subcategory', newSubcategoryName);
    } catch (error) {
      console.error('Error adding subcategory:', error);
      showSnackbar('Failed to add subcategory', 'error');
    } finally {
      setAddingSubcategory(false);
    }
  };

  const showSnackbar = (message: string, severity: 'success' | 'error' | 'warning' | 'info') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleInputChange = (field: keyof TreatmentFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear validation error for this field
    if (validationErrors[field as keyof ValidationErrors]) {
      setValidationErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleImageUpload = (file: File | null, preview: string | null) => {
    setImageFile(file);
    setImagePreview(preview);
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

      let response;

      // If image file is uploaded, use FormData
      if (imageFile) {
        const formDataToSend = new FormData();
        
        // Add all form fields
        formDataToSend.append('name', formData.name.trim());
        formDataToSend.append('description', formData.description.trim());
        formDataToSend.append('detailedDescription', formData.detailedDescription.trim());
        formDataToSend.append('category', formData.category);
        if (formData.subcategory.trim()) {
          formDataToSend.append('subcategory', formData.subcategory.trim());
        }
        formDataToSend.append('gradient', formData.gradient);
        formDataToSend.append('icon', formData.icon);
        if (formData.duration.trim()) {
          formDataToSend.append('duration', formData.duration.trim());
        }
        formDataToSend.append('methods', JSON.stringify(formData.methods));
        formDataToSend.append('conditions', JSON.stringify(formData.conditions));
        formDataToSend.append('keyPoints', JSON.stringify(formData.keyPoints));
        if (formData.metaTitle.trim()) {
          formDataToSend.append('metaTitle', formData.metaTitle.trim());
        }
        if (formData.metaDescription.trim()) {
          formDataToSend.append('metaDescription', formData.metaDescription.trim());
        }
        formDataToSend.append('keywords', JSON.stringify(formData.keywords));
        formDataToSend.append('status', formData.status);
        formDataToSend.append('featured', String(formData.featured));
        formDataToSend.append('active', String(formData.active));

        // Add pricing if provided
        if (formData.sessionCost || formData.packageCost) {
          const pricing = {
            sessionCost: formData.sessionCost ? parseFloat(formData.sessionCost) : undefined,
            packageCost: formData.packageCost ? parseFloat(formData.packageCost) : undefined,
            insuranceAccepted: formData.insuranceAccepted,
          };
          formDataToSend.append('pricing', JSON.stringify(pricing));
        }

        // Add availability
        const availability = {
          inPerson: formData.inPerson,
          telehealth: formData.telehealth,
          emergency: formData.emergency,
        };
        formDataToSend.append('availability', JSON.stringify(availability));

        // Add image file
        formDataToSend.append('image', imageFile);

        response = await treatmentsApi.create(formDataToSend);
      } else {
        // Use JSON if no image file
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

        response = await treatmentsApi.create(treatmentData);
      }

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
                <RichTextEditor
                  label="Detailed Description"
                  value={formData.detailedDescription}
                  onChange={(value) => handleInputChange('detailedDescription', value)}
                  placeholder="Enter detailed treatment information. You can copy and paste content from NIMH or other sources..."
                  helperText="Rich text editor - supports formatting, lists, headings, links, and more. Perfect for copying content from medical websites."
                  height={300}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-start' }}>
                  <FormControl fullWidth required error={!!validationErrors.category}>
                    <InputLabel>Category</InputLabel>
                    <Select
                      value={formData.category}
                      label="Category"
                      onChange={(e) => {
                        handleInputChange('category', e.target.value);
                        handleInputChange('subcategory', ''); // Reset subcategory when category changes
                      }}
                      disabled={loadingCategories}
                    >
                      {categories.map((cat) => (
                        <MenuItem key={cat} value={cat}>
                          {cat}
                        </MenuItem>
                      ))}
                    </Select>
                    {validationErrors.category && (
                      <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 2 }}>
                        {validationErrors.category}
                      </Typography>
                    )}
                  </FormControl>
                  <IconButton
                    color="primary"
                    onClick={() => setCategoryDialog(true)}
                    sx={{ mt: 1 }}
                    title="Add new category"
                  >
                    <AddIcon />
                  </IconButton>
                </Box>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-start' }}>
                  <Autocomplete
                    fullWidth
                    freeSolo
                    options={subcategories}
                    value={formData.subcategory}
                    onChange={(_, newValue) => handleInputChange('subcategory', newValue || '')}
                    onInputChange={(_, newInputValue) => handleInputChange('subcategory', newInputValue)}
                    disabled={!formData.category || loadingSubcategories}
                    loading={loadingSubcategories}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Subcategory"
                        placeholder={formData.category ? "Select or type new subcategory" : "Select category first"}
                        InputProps={{
                          ...params.InputProps,
                          endAdornment: (
                            <>
                              {loadingSubcategories ? <CircularProgress color="inherit" size={20} /> : null}
                              {params.InputProps.endAdornment}
                            </>
                          ),
                        }}
                      />
                    )}
                  />
                  <IconButton
                    color="primary"
                    onClick={() => setSubcategoryDialog(true)}
                    disabled={!formData.category}
                    sx={{ mt: 1 }}
                    title="Add new subcategory"
                  >
                    <AddIcon />
                  </IconButton>
                </Box>
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

              <Grid item xs={12}>
                <ImageUpload
                  label="Treatment Image"
                  value={imagePreview || undefined}
                  onChange={handleImageUpload}
                  maxSize={10}
                  acceptedFormats={['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/svg+xml']}
                  helperText="Upload a high-quality image for the treatment (max 10MB). Supported formats: JPG, PNG, WebP, SVG. Recommended size: 1200x630px"
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

      {/* Add Category Dialog */}
      <Dialog open={categoryDialog} onClose={() => setCategoryDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Category</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Category Type</InputLabel>
              <Select
                value={formData.category}
                label="Category Type"
                onChange={(e) => handleInputChange('category', e.target.value)}
              >
                <MenuItem value="Mental Health">Mental Health</MenuItem>
                <MenuItem value="General Health">General Health</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Category Name"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="e.g., Mood Disorders, Cardiovascular"
              autoFocus
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddNewCategory();
                }
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCategoryDialog(false)}>Cancel</Button>
          <Button
            onClick={handleAddNewCategory}
            variant="contained"
            disabled={addingCategory || !newCategoryName.trim() || !formData.category}
            startIcon={addingCategory ? <CircularProgress size={16} /> : <AddIcon />}
          >
            {addingCategory ? 'Adding...' : 'Add Category'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Subcategory Dialog */}
      <Dialog open={subcategoryDialog} onClose={() => setSubcategoryDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Subcategory</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              fullWidth
              label="Parent Category"
              value={formData.category}
              disabled
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Subcategory Name"
              value={newSubcategoryName}
              onChange={(e) => setNewSubcategoryName(e.target.value)}
              placeholder="e.g., Anxiety & Stress, Heart Disease"
              autoFocus
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddNewSubcategory();
                }
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSubcategoryDialog(false)}>Cancel</Button>
          <Button
            onClick={handleAddNewSubcategory}
            variant="contained"
            disabled={addingSubcategory || !newSubcategoryName.trim()}
            startIcon={addingSubcategory ? <CircularProgress size={16} /> : <AddIcon />}
          >
            {addingSubcategory ? 'Adding...' : 'Add Subcategory'}
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
