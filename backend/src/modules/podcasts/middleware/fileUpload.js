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
 * File type validation for podcasts
 */
const podcastFileFilter = (req, file, cb) => {
  // Define allowed file types
  const allowedTypes = {
    image: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
    audio: ['audio/mpeg', 'audio/mp4', 'audio/wav', 'audio/ogg', 'audio/x-m4a', 'audio/aac']
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
  } else if (file.fieldname === 'audioFile') {
    if (allowedTypes.audio.includes(file.mimetype) || ['.mp3', '.m4a', '.wav', '.ogg', '.aac'].includes(ext)) {
      cb(null, true);
    } else {
      cb(new AppError('Only MP3, M4A, WAV, OGG, and AAC files are allowed for podcast audio', 400), false);
    }
  } else {
    cb(new AppError('Invalid file field', 400), false);
  }
};

/**
 * Upload file to Cloudinary based on file type
 */
const uploadPodcastToCloudinary = async (file, type, podcastTitle = 'podcast') => {
  return new Promise((resolve, reject) => {
    const timestamp = Date.now();
    const safePodcastTitle = podcastTitle.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
    
    let uploadOptions = {
      resource_type: 'auto',
      folder: `dr-quadri/podcasts/${type}s`,
    };

    // Configure based on file type
    if (type === 'cover') {
      uploadOptions = {
        ...uploadOptions,
        folder: 'dr-quadri/podcasts/covers',
        transformation: [
          { width: 800, height: 800, crop: 'fill', quality: 'auto:good' }
        ],
        public_id: `podcast-cover-${safePodcastTitle}-${timestamp}`
      };
    } else if (type === 'audio') {
      uploadOptions = {
        ...uploadOptions,
        resource_type: 'video', // Cloudinary treats audio as video
        folder: 'dr-quadri/podcasts/audio',
        public_id: `podcast-audio-${safePodcastTitle}-${timestamp}`
      };
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
 * Process uploaded podcast files and save to Cloudinary
 */
const processPodcastFileUploads = async (req, res, next) => {
  try {
    if (!req.files) {
      return next();
    }

    const uploadPromises = [];
    const fileResults = {};
    const podcastTitle = req.body.title || 'untitled-podcast';

    // Process cover image
    if (req.files.coverImage && req.files.coverImage[0]) {
      const coverFile = req.files.coverImage[0];
      
      // Validate file size for cover images (10MB max)
      if (coverFile.size > 10 * 1024 * 1024) {
        throw new AppError('Cover image file size cannot exceed 10MB', 400);
      }

      uploadPromises.push(
        uploadPodcastToCloudinary(coverFile, 'cover', podcastTitle).then(result => {
          fileResults.coverImage = {
            url: result.secure_url,
            publicId: result.public_id,
            originalName: coverFile.originalname,
            fileSize: coverFile.size,
            mimeType: coverFile.mimetype,
            width: result.width,
            height: result.height
          };
        })
      );
    }

    // Process audio file
    if (req.files.audioFile && req.files.audioFile[0]) {
      const audioFile = req.files.audioFile[0];
      
      // Validate file size for audio files (500MB max)
      if (audioFile.size > 500 * 1024 * 1024) {
        throw new AppError('Audio file size cannot exceed 500MB', 400);
      }

      uploadPromises.push(
        uploadPodcastToCloudinary(audioFile, 'audio', podcastTitle).then(result => {
          fileResults.audioFile = {
            url: result.secure_url,
            publicId: result.public_id,
            originalName: audioFile.originalname,
            fileSize: audioFile.size,
            mimeType: audioFile.mimetype,
            duration: result.duration || null, // Cloudinary provides duration for audio/video
            bitrate: result.bit_rate || null,
            sampleRate: result.audio?.sample_rate || null,
            format: result.format || null
          };
        })
      );
    }

    // Wait for all uploads to complete
    if (uploadPromises.length > 0) {
      await Promise.all(uploadPromises);
      console.log('✅ All podcast files uploaded successfully:', fileResults);
    }

    // Attach file results to request
    req.uploadedFiles = fileResults;

    next();
  } catch (error) {
    console.error('Podcast file upload error:', error);
    next(error);
  }
};

/**
 * Create multer upload middleware for podcasts
 */
const createPodcastUploadMiddleware = () => {
  return multer({
    storage: multer.memoryStorage(), // We'll handle storage manually
    fileFilter: podcastFileFilter,
    limits: {
      fileSize: 500 * 1024 * 1024, // 500MB max file size
      files: 2 // Max 2 files (cover image, audio file)
    }
  });
};

/**
 * Delete podcast file from Cloudinary
 */
const deletePodcastFromCloudinary = async (publicId, resourceType = 'image') => {
  try {
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType
    });
    console.log('🗑️ Deleted from Cloudinary:', publicId, result);
    return result;
  } catch (error) {
    console.error('Error deleting podcast file from Cloudinary:', error);
    throw error;
  }
};

/**
 * Main upload middleware for podcasts
 */
const uploadPodcastFiles = [
  createPodcastUploadMiddleware().fields([
    { name: 'coverImage', maxCount: 1 },
    { name: 'audioFile', maxCount: 1 }
  ]),
  processPodcastFileUploads
];

export {
  uploadPodcastFiles,
  uploadPodcastToCloudinary,
  deletePodcastFromCloudinary,
  processPodcastFileUploads,
  cloudinary
};
