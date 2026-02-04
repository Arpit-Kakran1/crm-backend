import express from 'express';
import {
  getProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
} from '../controllers/propertyController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/getproperty', getProperties);
router.get('/getproperty/:id', getPropertyById);
router.post('/createproperty', authMiddleware, createProperty);
router.put('/updateproperty/:id', authMiddleware, updateProperty);
router.delete('/deleteproperty/:id', authMiddleware, deleteProperty);

export default router;
