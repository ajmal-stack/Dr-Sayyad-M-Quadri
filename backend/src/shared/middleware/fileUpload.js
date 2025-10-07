import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { v2 as cloudinary } from 'cloudinary';
import path from 'path';
import { AppError } from './errorHandler.js';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * File type validation
 */
const fileFilter = (req, file, cb) => {
  // Define allowed file types
  const allowedTypes = {
    image: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
    ebook: ['application/pdf', 'application/epub+zip', 'text/plain'],
    audio: ['audio/mpeg', 'audio/mp4', 'audio/wav', 'audio/ogg', 'audio/x-m4a']
  };

  // Get file extension
  const ext = path.extname(file.originalname).toLowerCase();
  
  // Check file type based on field name
  if (file.fieldname === 'coverImage') {
    if (allowedTypes.image.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new AppError('Only image files (JPEG, PNG, GIF, WebP) are allowed for cover images', 400), false);
    }
  } else if (file.fieldname === 'ebookFile') {
    if (allowedTypes.ebook.includes(file.mimetype) || ['.pdf', '.epub', '.txt'].includes(ext)) {
      cb(null, true);
    } else {
      cb(new AppError('Only PDF, EPUB, and TXT files are allowed for e-books', 400), false);
    }
  } else if (file.fieldname === 'audiobookFile') {
    if (allowedTypes.audio.includes(file.mimetype) || ['.mp3', '.m4a', '.wav', '.ogg'].includes(ext)) {
      cb(null, true);
    } else {
      cb(new AppError('Only MP3, M4A, WAV, and OGG files are allowed for audiobooks', 400), false);
    }
  } else {
    cb(new AppError('Invalid file field', 400), false);
  }
};

/**
 * Cloudinary storage configuration for images
 */
const imageStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'dr-quadri/books/covers',
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
    transformation: [
      { width: 600, height: 800, crop: 'fill', quality: 'auto:good' }
    ],
    public_id: (req, file) => {
      const timestamp = Date.now();
      const bookTitle = req.body.title ? req.body.title.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase() : 'book';
      return `cover-${bookTitle}-${timestamp}`;
    }
  },
});

/**
 * Cloudinary storage configuration for e-books
 */
const ebookStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'dr-quadri/books/ebooks',
    resource_type: 'raw', // For non-image files
    public_id: (req, file) => {
      const timestamp = Date.now();
      const bookTitle = req.body.title ? req.body.title.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase() : 'book';
      const ext = path.extname(file.originalname);
      return `ebook-${bookTitle}-${timestamp}${ext}`;
    }
  },
});

/**
 * Cloudinary storage configuration for audiobooks
 */
const audiobookStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'dr-quadri/books/audiobooks',
    resource_type: 'video', // Cloudinary treats audio as video
    public_id: (req, file) => {
      const timestamp = Date.now();
      const bookTitle = req.body.title ? req.body.title.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase() : 'book';
      const ext = path.extname(file.originalname);
      return `audiobook-${bookTitle}-${timestamp}${ext}`;
    }
  },
});

/**
 * Create multer upload middleware with multiple storage types
 */
const createUploadMiddleware = () => {
  return multer({
    storage: multer.memoryStorage(), // We'll handle storage manually
    fileFilter: fileFilter,
    limits: {
      fileSize: 500 * 1024 * 1024, // 500MB max file size
      files: 3 // Max 3 files (cover, ebook, audiobook)
    }
  });
};

/**
 * Upload file to Cloudinary based on file type
 */
const uploadToCloudinary = async (file, type) => {
  return new Promise((resolve, reject) => {
    let uploadOptions = {
      resource_type: 'auto',
      folder: `dr-quadri/books/${type}s`,
    };

    // Configure based on file type
    if (type === 'cover') {
      uploadOptions = {
        ...uploadOptions,
        folder: 'dr-quadri/books/covers',
        transformation: [
          { width: 600, height: 800, crop: 'fill', quality: 'auto:good' }
        ]
      };
    } else if (type === 'ebook') {
      uploadOptions = {
        ...uploadOptions,
        resource_type: 'raw',
        folder: 'dr-quadri/books/ebooks'
      };
    } else if (type === 'audiobook') {
      uploadOptions = {
        ...uploadOptions,
        resource_type: 'video',
        folder: 'dr-quadri/books/audiobooks'
      };
    }

    const uploadStream = cloudinary.uploader.upload_stream(
      uploadOptions,
      (error, result) => {
        if (error) {
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
 * Process uploaded files and save to Cloudinary
 */
const processFileUploads = async (req, res, next) => {
  try {
    if (!req.files) {
      return next();
    }

    const uploadPromises = [];
    const fileResults = {};

    // Process cover image
    if (req.files.coverImage && req.files.coverImage[0]) {
      const coverFile = req.files.coverImage[0];
      uploadPromises.push(
        uploadToCloudinary(coverFile, 'cover').then(result => {
          fileResults.coverImage = {
            url: result.secure_url,
            publicId: result.public_id,
            originalName: coverFile.originalname,
            fileSize: coverFile.size,
            mimeType: coverFile.mimetype
          };
        })
      );
    }

    // Process e-book file
    if (req.files.ebookFile && req.files.ebookFile[0]) {
      const ebookFile = req.files.ebookFile[0];
      
      // Validate file size for e-books (50MB max)
      if (ebookFile.size > 50 * 1024 * 1024) {
        throw new AppError('E-book file size cannot exceed 50MB', 400);
      }

      uploadPromises.push(
        uploadToCloudinary(ebookFile, 'ebook').then(result => {
          fileResults.ebookFile = {
            url: result.secure_url,
            publicId: result.public_id,
            originalName: ebookFile.originalname,
            fileSize: ebookFile.size,
            mimeType: ebookFile.mimetype
          };
        })
      );
    }

    // Process audiobook file
    if (req.files.audiobookFile && req.files.audiobookFile[0]) {
      const audiobookFile = req.files.audiobookFile[0];
      
      // Validate file size for audiobooks (500MB max)
      if (audiobookFile.size > 500 * 1024 * 1024) {
        throw new AppError('Audiobook file size cannot exceed 500MB', 400);
      }

      uploadPromises.push(
        uploadToCloudinary(audiobookFile, 'audiobook').then(result => {
          fileResults.audiobookFile = {
            url: result.secure_url,
            publicId: result.public_id,
            originalName: audiobookFile.originalname,
            fileSize: audiobookFile.size,
            mimeType: audiobookFile.mimetype,
            duration: result.duration || null // Cloudinary provides duration for audio/video
          };
        })
      );
    }

    // Wait for all uploads to complete
    await Promise.all(uploadPromises);

    // Attach file results to request
    req.uploadedFiles = fileResults;

    next();
  } catch (error) {
    console.error('File upload error:', error);
    next(error);
  }
};

/**
 * Delete file from Cloudinary
 */
const deleteFromCloudinary = async (publicId, resourceType = 'image') => {
  try {
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType
    });
    return result;
  } catch (error) {
    console.error('Error deleting file from Cloudinary:', error);
    throw error;
  }
};

/**
 * Main upload middleware for books
 */
const uploadBookFiles = [
  createUploadMiddleware().fields([
    { name: 'coverImage', maxCount: 1 },
    { name: 'ebookFile', maxCount: 1 },
    { name: 'audiobookFile', maxCount: 1 }
  ]),
  processFileUploads
];

export {
  uploadBookFiles,
  uploadToCloudinary,
  deleteFromCloudinary,
  processFileUploads,
  cloudinary
};
