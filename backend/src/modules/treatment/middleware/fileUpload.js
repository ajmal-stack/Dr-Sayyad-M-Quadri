import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { v2 as cloudinary } from 'cloudinary';
import path from 'path';
import { AppError } from '../../../shared/middleware/errorHandler.js';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * File type validation for treatment images
 */
const treatmentImageFileFilter = (req, file, cb) => {
  // Define allowed image types (including SVG)
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml'];
  
  // Get file extension
  const ext = path.extname(file.originalname).toLowerCase();
  const allowedExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.svg'];
  
  // Check file type
  if (file.fieldname === 'image') {
    if (allowedTypes.includes(file.mimetype) || allowedExtensions.includes(ext)) {
      cb(null, true);
    } else {
      cb(new AppError('Only image files (JPEG, PNG, WebP, SVG) are allowed', 400), false);
    }
  } else {
    cb(new AppError('Invalid file field', 400), false);
  }
};

/**
 * Upload treatment image to Cloudinary
 */
const uploadTreatmentImageToCloudinary = async (file, treatmentName = 'treatment') => {
  return new Promise((resolve, reject) => {
    const timestamp = Date.now();
    const safeTreatmentName = treatmentName.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
    
    // Check if file is SVG
    const isSvg = file.mimetype === 'image/svg+xml' || path.extname(file.originalname).toLowerCase() === '.svg';
    
    const uploadOptions = {
      resource_type: isSvg ? 'raw' : 'image', // SVG files should be uploaded as 'raw'
      folder: 'dr-quadri/treatments',
      public_id: `treatment-${safeTreatmentName}-${timestamp}`
    };
    
    // Only apply transformations to raster images (not SVG)
    if (!isSvg) {
      uploadOptions.transformation = [
        { width: 1200, height: 630, crop: 'fill', quality: 'auto:good', fetch_format: 'auto' }
      ];
    }

    const uploadStream = cloudinary.uploader.upload_stream(
      uploadOptions,
      (error, result) => {
        if (error) {
          console.error('Cloudinary upload error:', error);
          reject(error);
        } else {
          resolve(result);
        }
      }
    );

    uploadStream.end(file.buffer);
  });
};

/**
 * Process uploaded treatment image and save to Cloudinary
 */
const processTreatmentImageUpload = async (req, res, next) => {
  try {
    if (!req.file && !req.files) {
      return next();
    }

    const treatmentName = req.body.name || 'untitled-treatment';
    let imageFile = null;

    // Handle both single file and multiple files
    if (req.file) {
      imageFile = req.file;
    } else if (req.files && req.files.image && req.files.image[0]) {
      imageFile = req.files.image[0];
    }

    if (!imageFile) {
      return next();
    }

    // Validate file size (10MB max)
    if (imageFile.size > 10 * 1024 * 1024) {
      throw new AppError('Image file size cannot exceed 10MB', 400);
    }

    console.log('📤 Uploading treatment image to Cloudinary:', imageFile.originalname);

    // Upload to Cloudinary
    const result = await uploadTreatmentImageToCloudinary(imageFile, treatmentName);

    console.log('✅ Treatment image uploaded successfully:', result.secure_url);

    // Attach file results to request
    req.uploadedFiles = {
      image: {
        url: result.secure_url,
        publicId: result.public_id,
        originalName: imageFile.originalname,
        fileSize: imageFile.size,
        mimeType: imageFile.mimetype,
        width: result.width,
        height: result.height
      }
    };

    next();
  } catch (error) {
    console.error('Treatment image upload error:', error);
    next(error);
  }
};

/**
 * Create multer upload middleware for treatment images
 */
const createTreatmentImageUploadMiddleware = () => {
  return multer({
    storage: multer.memoryStorage(),
    fileFilter: treatmentImageFileFilter,
    limits: {
      fileSize: 10 * 1024 * 1024, // 10MB max file size
      files: 1, // Max 1 file
      fieldSize: 10 * 1024 * 1024, // 10MB field size for base64 handling
      fieldNameSize: 100,
      fields: 20,
      parts: 25
    }
  });
};

/**
 * Delete treatment image from Cloudinary
 */
const deleteTreatmentImageFromCloudinary = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: 'image'
    });
    console.log('🗑️ Deleted treatment image from Cloudinary:', publicId, result);
    return result;
  } catch (error) {
    console.error('Error deleting treatment image from Cloudinary:', error);
    throw error;
  }
};

/**
 * Main upload middleware for treatment images
 */
const uploadTreatmentImage = [
  createTreatmentImageUploadMiddleware().single('image'),
  processTreatmentImageUpload
];

export {
  uploadTreatmentImage,
  uploadTreatmentImageToCloudinary,
  deleteTreatmentImageFromCloudinary,
  processTreatmentImageUpload,
  cloudinary
};
