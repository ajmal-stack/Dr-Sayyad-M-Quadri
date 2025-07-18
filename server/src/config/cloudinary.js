import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure Cloudinary storage for multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'dr-quadri', // Folder name in Cloudinary
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp', 'pdf'],
    transformation: [
      { width: 1000, height: 1000, crop: 'limit', quality: 'auto:good' },
    ],
  },
});

// Configure multer with Cloudinary storage
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    // Allow images and PDFs
    if (
      file.mimetype.startsWith('image/') ||
      file.mimetype === 'application/pdf'
    ) {
      cb(null, true);
    } else {
      cb(new Error('Only images and PDF files are allowed!'), false);
    }
  },
});

// Helper function to delete file from Cloudinary
const deleteFromCloudinary = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    console.error('Error deleting from Cloudinary:', error);
    throw error;
  }
};

// Helper function to upload file to Cloudinary
const uploadToCloudinary = async (file, folder = 'dr-quadri') => {
  try {
    const result = await cloudinary.uploader.upload(file, {
      folder: folder,
      resource_type: 'auto',
    });
    return result;
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    throw error;
  }
};

export { cloudinary, upload, deleteFromCloudinary, uploadToCloudinary };
