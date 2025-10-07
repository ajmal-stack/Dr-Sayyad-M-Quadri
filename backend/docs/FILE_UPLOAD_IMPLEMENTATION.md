# File Upload Implementation for Books

## Overview

This document describes the complete implementation of file upload functionality for e-books and audiobooks in the Dr. Syed M Quadri backend API.

## Features Implemented

### 1. **Database Schema Updates**
- Added `files` object to Book model with support for:
  - **E-book files**: PDF, EPUB, TXT formats
  - **Audiobook files**: MP3, M4A, WAV, OGG formats
- Each file type stores:
  - `url`: Cloudinary secure URL
  - `publicId`: Cloudinary public ID for deletion
  - `originalName`: Original filename
  - `fileSize`: File size in bytes
  - `mimeType`: MIME type
  - `uploadedAt`: Upload timestamp
  - `duration`: Audio duration (audiobooks only)

### 2. **File Upload Middleware**
- **Location**: `src/shared/middleware/fileUpload.js`
- **Features**:
  - Multi-file upload support (cover image, e-book, audiobook)
  - File type validation based on MIME type and extension
  - File size limits: 50MB for e-books, 500MB for audiobooks
  - Cloudinary integration with organized folder structure
  - Automatic cleanup on upload failures

### 3. **API Endpoints**

#### Core CRUD Operations
```
POST   /api/v1/books              - Create book with file uploads
PUT    /api/v1/books/:id          - Update book with file uploads
DELETE /api/v1/books/:id          - Delete book and cleanup files
```

#### File Management Operations
```
POST   /api/v1/books/:id/files/ebook      - Upload/update e-book file
POST   /api/v1/books/:id/files/audiobook  - Upload/update audiobook file
DELETE /api/v1/books/:id/files/ebook      - Remove e-book file
DELETE /api/v1/books/:id/files/audiobook  - Remove audiobook file
```

### 4. **File Storage Structure**

#### Cloudinary Organization
```
dr-quadri/
├── books/
│   ├── covers/          # Book cover images
│   ├── ebooks/          # E-book files (PDF, EPUB, TXT)
│   └── audiobooks/      # Audiobook files (MP3, M4A, WAV, OGG)
```

#### File Naming Convention
- **Covers**: `cover-{book-title}-{timestamp}`
- **E-books**: `ebook-{book-title}-{timestamp}.{ext}`
- **Audiobooks**: `audiobook-{book-title}-{timestamp}.{ext}`

## Technical Implementation

### File Upload Flow

1. **Request Processing**:
   ```javascript
   // Middleware processes multipart/form-data
   uploadBookFiles = [
     multer.fields([
       { name: 'coverImage', maxCount: 1 },
       { name: 'ebookFile', maxCount: 1 },
       { name: 'audiobookFile', maxCount: 1 }
     ]),
     processFileUploads
   ]
   ```

2. **File Validation**:
   - MIME type checking
   - File extension validation
   - Size limit enforcement
   - Error handling with cleanup

3. **Cloudinary Upload**:
   - Automatic resource type detection
   - Organized folder structure
   - Transformation for images
   - Metadata extraction for audio files

4. **Database Storage**:
   ```javascript
   files: {
     ebook: {
       url: "https://res.cloudinary.com/...",
       publicId: "dr-quadri/books/ebooks/ebook-title-123456.pdf",
       originalName: "my-book.pdf",
       fileSize: 5242880,
       mimeType: "application/pdf",
       uploadedAt: "2025-01-01T00:00:00.000Z"
     },
     audiobook: {
       url: "https://res.cloudinary.com/...",
       publicId: "dr-quadri/books/audiobooks/audiobook-title-123456.mp3",
       originalName: "my-audiobook.mp3",
       fileSize: 52428800,
       mimeType: "audio/mpeg",
       duration: "02:15:30",
       uploadedAt: "2025-01-01T00:00:00.000Z"
     }
   }
   ```

### Error Handling & Cleanup

1. **Upload Failure Cleanup**:
   - Automatic deletion of uploaded files if database save fails
   - Graceful error messages for validation failures

2. **Update Operations**:
   - Old files are automatically deleted when new files are uploaded
   - Preserves existing files when only updating metadata

3. **Delete Operations**:
   - Cascading deletion of all associated files
   - Fire-and-forget cleanup to avoid blocking responses

## API Usage Examples

### 1. Create Book with Files

```javascript
const formData = new FormData();
formData.append('title', 'My Mental Health Guide');
formData.append('author', 'Dr. Syed M Quadri');
formData.append('category', 'Mental Health');
formData.append('description', 'A comprehensive guide...');
formData.append('price', '24.99');
formData.append('format', JSON.stringify(['E-book', 'Audiobook']));
formData.append('coverImage', coverImageFile);
formData.append('ebookFile', ebookFile);
formData.append('audiobookFile', audioFile);

const response = await fetch('/api/v1/books', {
  method: 'POST',
  body: formData
});
```

### 2. Update Book Files Only

```javascript
const formData = new FormData();
formData.append('ebookFile', newEbookFile);

const response = await fetch('/api/v1/books/book-id', {
  method: 'PUT',
  body: formData
});
```

### 3. Remove Specific File

```javascript
const response = await fetch('/api/v1/books/book-id/files/ebook', {
  method: 'DELETE'
});
```

## Frontend Integration

### File Upload Component Structure

The frontend should send files using these field names:
- `coverImage`: Book cover image
- `ebookFile`: E-book file (PDF, EPUB, TXT)
- `audiobookFile`: Audio file (MP3, M4A, WAV, OGG)

### Response Format

```javascript
{
  "success": true,
  "data": {
    "id": "book-id",
    "title": "Book Title",
    "files": {
      "ebook": {
        "url": "https://res.cloudinary.com/...",
        "originalName": "book.pdf",
        "fileSize": 5242880,
        "mimeType": "application/pdf",
        "uploadedAt": "2025-01-01T00:00:00.000Z"
      },
      "audiobook": {
        "url": "https://res.cloudinary.com/...",
        "originalName": "audiobook.mp3",
        "fileSize": 52428800,
        "mimeType": "audio/mpeg",
        "duration": "02:15:30",
        "uploadedAt": "2025-01-01T00:00:00.000Z"
      }
    }
  }
}
```

## Environment Variables Required

```env
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

## File Size Limits

- **Cover Images**: 5MB maximum
- **E-book Files**: 50MB maximum
- **Audiobook Files**: 500MB maximum

## Supported File Formats

### E-books
- PDF (application/pdf)
- EPUB (application/epub+zip)
- TXT (text/plain)

### Audiobooks
- MP3 (audio/mpeg)
- M4A (audio/mp4, audio/x-m4a)
- WAV (audio/wav)
- OGG (audio/ogg)

### Cover Images
- JPEG (image/jpeg)
- PNG (image/png)
- GIF (image/gif)
- WebP (image/webp)

## Security Considerations

1. **File Type Validation**: Both MIME type and extension checking
2. **Size Limits**: Enforced at middleware level
3. **Cloudinary Security**: Uses secure URLs and organized folder structure
4. **Error Handling**: No sensitive information exposed in error messages
5. **Cleanup**: Automatic cleanup prevents orphaned files

## Performance Optimizations

1. **Parallel Uploads**: Multiple files uploaded simultaneously
2. **Fire-and-Forget Cleanup**: File deletion doesn't block responses
3. **Cloudinary Transformations**: Automatic image optimization
4. **Streaming**: Large files handled efficiently with streams

## Testing

### Manual Testing Steps

1. **Create Book with Files**:
   - Upload book with cover, e-book, and audiobook
   - Verify all files are stored correctly
   - Check Cloudinary dashboard for file organization

2. **Update Operations**:
   - Update book with new files
   - Verify old files are cleaned up
   - Test partial updates (only one file type)

3. **Delete Operations**:
   - Delete book and verify all files are removed
   - Test individual file removal endpoints

4. **Error Scenarios**:
   - Upload invalid file types
   - Exceed file size limits
   - Test network interruption scenarios

## Troubleshooting

### Common Issues

1. **Upload Fails**: Check Cloudinary credentials and network connectivity
2. **File Not Found**: Verify file paths and Cloudinary URLs
3. **Size Limit Exceeded**: Check file sizes against defined limits
4. **Invalid File Type**: Ensure files match supported formats

### Debugging

Enable detailed logging by setting:
```javascript
console.log('Uploaded files:', req.uploadedFiles);
```

## Future Enhancements

1. **Progress Tracking**: Real-time upload progress
2. **Batch Operations**: Multiple book uploads
3. **File Versioning**: Keep file history
4. **CDN Integration**: Enhanced delivery performance
5. **Compression**: Automatic file compression for large files
