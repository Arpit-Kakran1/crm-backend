import express from 'express';
import {
  createEnquiry,
  getEnquiries,
  getEnquiryById,
  updateEnquiry,
  deleteEnquiry,
  createGeneralEnquiry
} from '../controllers/enquiryController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', createEnquiry);
router.post('/general',createGeneralEnquiry)
router.get('/', authMiddleware, getEnquiries);
router.get('/:id', authMiddleware, getEnquiryById);
router.put('/:id', authMiddleware, updateEnquiry);
router.delete('/:id', authMiddleware, deleteEnquiry);

export default router;
