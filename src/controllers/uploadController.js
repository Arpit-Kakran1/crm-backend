import cloudinary from '../config/cloudinary.js';
import { Readable } from 'stream';

const bufferToStream = (buffer) => Readable.from(buffer);

export const uploadImage = (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'No image file provided' });
  }
  const stream = cloudinary.uploader.upload_stream(
    { folder: process.env.CLOUDINARY_FOLDER || 'crm' },
    (err, result) => {
      if (err) {
        return res.status(500).json({ success: false, message: 'Upload failed', error: err.message });
      }
      return res.status(200).json({
        success: true,
        message: 'Image uploaded',
        data: { url: result.secure_url, publicId: result.public_id },
      });
    }
  );
  bufferToStream(req.file.buffer).pipe(stream);
};
