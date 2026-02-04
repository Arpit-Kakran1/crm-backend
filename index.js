import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDb from './src/config/db.js';
import authRouter from './src/routes/authRoutes.js';
import propertyRouter from './src/routes/propertyRoutes.js';
import enquiryRouter from './src/routes/enquiryRoutes.js';
import uploadRouter from './src/routes/uploadRoutes.js';
import { notFound, errorHandler } from './src/middleware/errorMiddleware.js';

const app = express();

const allowedOrigins = [
  'http://localhost:5173',
  'https://property-real-state.vercel.app',
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      console.log('CORS blocked:', origin);
      return callback(null, false);
    },
    credentials: true,
  })
);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/auth', authRouter);
app.use('api/upload',uploadRouter)
app.use('/api/properties', propertyRouter);
app.use('/api/enquiries', enquiryRouter);


app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 8000;

connectDb()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('Database connection failed:', err.message);
    process.exit(1);
  });
