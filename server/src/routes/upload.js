import express from 'express';
import {
  uploadSingle,
  uploadMultiple,
  formatFileResponse,
  formatFilesResponse,
} from '../middleware/upload.js';
import { deleteFromCloudinary } from '../config/cloudinary.js';
import { authenticate, requirePermission } from '../middleware/auth.js';

const router = express.Router();

// All upload routes require authentication and write permission
router.use(authenticate);
router.use(requirePermission('canWrite'));

// Upload single image
router.post('/image', uploadSingle('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: 'No image file provided',
      });
    }

    const fileData = formatFileResponse(req.file);

    res.status(200).json({
      success: true,
      message: 'Image uploaded successfully',
      data: fileData,
    });
  } catch (error) {
    console.error('Image upload error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to upload image',
    });
  }
});

// Upload multiple images
router.post('/images', uploadMultiple('images', 10), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'No image files provided',
      });
    }

    const filesData = formatFilesResponse(req.files);

    res.status(200).json({
      success: true,
      message: `${req.files.length} images uploaded successfully`,
      data: filesData,
    });
  } catch (error) {
    console.error('Images upload error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to upload images',
    });
  }
});

// Upload book cover and PDF
router.post('/book', uploadMultiple('files', 2), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'No files provided',
      });
    }

    const filesData = formatFilesResponse(req.files);

    // Separate cover image and PDF
    const coverImage = filesData.find((file) =>
      file.fileType.startsWith('image/')
    );
    const pdfFile = filesData.find(
      (file) => file.fileType === 'application/pdf'
    );

    res.status(200).json({
      success: true,
      message: 'Book files uploaded successfully',
      data: {
        coverImage,
        pdfFile,
        allFiles: filesData,
      },
    });
  } catch (error) {
    console.error('Book files upload error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to upload book files',
    });
  }
});

// Upload podcast audio and cover
router.post('/podcast', uploadMultiple('files', 2), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'No files provided',
      });
    }

    const filesData = formatFilesResponse(req.files);

    // Separate audio and cover image
    const coverImage = filesData.find((file) =>
      file.fileType.startsWith('image/')
    );
    const audioFile = filesData.find((file) =>
      file.fileType.startsWith('audio/')
    );

    res.status(200).json({
      success: true,
      message: 'Podcast files uploaded successfully',
      data: {
        coverImage,
        audioFile,
        allFiles: filesData,
      },
    });
  } catch (error) {
    console.error('Podcast files upload error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to upload podcast files',
    });
  }
});

// Delete file from Cloudinary (requires delete permission)
router.delete(
  '/:publicId',
  requirePermission('canDelete'),
  async (req, res) => {
    try {
      const { publicId } = req.params;

      if (!publicId) {
        return res.status(400).json({
          success: false,
          error: 'Public ID is required',
        });
      }

      const result = await deleteFromCloudinary(publicId);

      if (result.result === 'ok' || result.result === 'not found') {
        res.status(200).json({
          success: true,
          message: 'File deleted successfully',
          data: result,
        });
      } else {
        res.status(400).json({
          success: false,
          error: 'Failed to delete file',
        });
      }
    } catch (error) {
      console.error('File deletion error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to delete file',
      });
    }
  }
);

// Get upload statistics (requires analytics permission)
router.get(
  '/stats',
  requirePermission('canAccessAnalytics'),
  async (req, res) => {
    try {
      // This would typically come from your database
      const stats = {
        totalUploads: 0,
        totalSize: '0 MB',
        fileTypes: {
          images: 0,
          pdfs: 0,
          audio: 0,
          other: 0,
        },
        recentUploads: [],
      };

      res.status(200).json({
        success: true,
        data: stats,
      });
    } catch (error) {
      console.error('Stats error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to get upload statistics',
      });
    }
  }
);

export default router;
