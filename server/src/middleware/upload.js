import { upload } from '../config/cloudinary.js';

// Single file upload middleware
export const uploadSingle = (fieldName) => {
  return (req, res, next) => {
    const uploadMiddleware = upload.single(fieldName);

    uploadMiddleware(req, res, (err) => {
      if (err) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          return res.status(400).json({
            success: false,
            error: 'File too large. Maximum size is 10MB.',
          });
        }

        return res.status(400).json({
          success: false,
          error: err.message || 'File upload failed',
        });
      }

      next();
    });
  };
};

// Multiple files upload middleware
export const uploadMultiple = (fieldName, maxCount = 5) => {
  return (req, res, next) => {
    const uploadMiddleware = upload.array(fieldName, maxCount);

    uploadMiddleware(req, res, (err) => {
      if (err) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          return res.status(400).json({
            success: false,
            error:
              'One or more files are too large. Maximum size is 10MB per file.',
          });
        }

        if (err.code === 'LIMIT_UNEXPECTED_FILE') {
          return res.status(400).json({
            success: false,
            error: `Too many files. Maximum allowed is ${maxCount}.`,
          });
        }

        return res.status(400).json({
          success: false,
          error: err.message || 'File upload failed',
        });
      }

      next();
    });
  };
};

// Fields upload middleware (multiple fields with different names)
export const uploadFields = (fields) => {
  return (req, res, next) => {
    const uploadMiddleware = upload.fields(fields);

    uploadMiddleware(req, res, (err) => {
      if (err) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          return res.status(400).json({
            success: false,
            error:
              'One or more files are too large. Maximum size is 10MB per file.',
          });
        }

        return res.status(400).json({
          success: false,
          error: err.message || 'File upload failed',
        });
      }

      next();
    });
  };
};

// Helper function to format file response
export const formatFileResponse = (file) => {
  if (!file) return null;

  return {
    url: file.path,
    publicId: file.filename,
    originalName: file.originalname,
    fileType: file.mimetype,
    fileSize: file.size,
  };
};

// Helper function to format multiple files response
export const formatFilesResponse = (files) => {
  if (!files || !Array.isArray(files)) return [];

  return files.map(formatFileResponse);
};
