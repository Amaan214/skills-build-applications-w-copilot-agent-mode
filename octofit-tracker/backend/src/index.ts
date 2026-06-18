import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

// Import middleware
import { errorHandler, notFoundHandler } from './middleware/errorHandler';

// Import routes
import userRoutes from './routes/users';
import workoutRoutes from './routes/workouts';
import goalRoutes from './routes/goals';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit-tracker';

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('✓ Connected to MongoDB');
  })
  .catch((error) => {
    console.error('✗ MongoDB connection error:', error);
    process.exit(1);
  });

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'OctoFit Tracker API is running',
    timestamp: new Date().toISOString(),
  });
});

// API root
app.get('/api', (req, res) => {
  res.json({
    message: 'Welcome to OctoFit Tracker API',
    version: '1.0.0',
    endpoints: {
      users: '/api/users',
      workouts: '/api/workouts',
      goals: '/api/goals',
      health: '/api/health',
    },
  });
});

// Routes
app.use('/api/users', userRoutes);
app.use('/api/workouts', workoutRoutes);
app.use('/api/goals', goalRoutes);

// Error handling middleware
app.use(notFoundHandler);
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 MongoDB: ${MONGODB_URI}`);
  console.log(`📚 API Documentation: http://localhost:${PORT}/api`);
});

export default app;