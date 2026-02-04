import express from 'express';
import { uploadImage } from '../controllers/uploadController.js'
import { authMiddleware } from '../middleware/authMiddleware.js';
import { uploadSingle } from '../middleware/uploadMiddleware.js';

const uploadRouter = express.Router();

uploadRouter.post('/image',authMiddleware, uploadSingle, uploadImage);

export default uploadRouter;
