import Admin from '../models/Admin.js';
import generateToken from '../utils/generateToken.js';
import jwt from 'jsonwebtoken'

export const registerAdmin = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Name, email and password are required' });
    }
    const existing = await Admin.findOne({ email });
    if (existing) {
      return res.status(409).json({ success: false, message: 'Admin already exists. Please login.' });
    }
    const admin = await Admin.create({ name, email, password });
    const token = generateToken(admin._id);
    res.cookie('accessToken', token, {
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60 * 1000,
    });
    const user = { id: admin._id, name: admin.name, email: admin.email, role: 'Admin' };
    return res.status(201).json({ success: true, message: 'Admin created successfully', user });
  } catch (err) {
    next(err);
  }
};


export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  const user = await Admin.findOne({ email }).select('+password');

  if (!user) {
    return res.status(401).json({
      success: false,
      message: 'Invalid email or password',
    });
  }

  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return res.status(401).json({
      success: false,
      message: 'Invalid email or password',
    });
  }

  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );

  res.status(200).json({
    success: true,
    token,
    user: {
      id: user._id,
      email: user.email,
    },
  });
};


export const logoutAdmin = (req, res) => {
  res.cookie('accessToken', '', {
    httpOnly: true,
    sameSite: 'strict',
    maxAge: 0,
  });
  return res.status(200).json({ success: true, message: 'Logged out successfully' });
};

export const getMe = (req, res) => {
  return res.status(200).json({ success: true, user: req.user });
};