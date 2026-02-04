import express from 'express';
import { registerAdmin, loginAdmin, logoutAdmin, getMe } from '../controllers/authController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const authRouter = express.Router();

authRouter.post('/register', registerAdmin);
authRouter.post('/login', loginAdmin);
authRouter.post('/logout', logoutAdmin);
authRouter.get('/me', authMiddleware, getMe);

export default authRouter;
