import express from 'express';
import {
  logWorkout,
  getWorkoutHistory,
  getWorkoutStats,
  deleteWorkout,
} from '../controllers/workoutController';

const router = express.Router();

// Workout routes
router.post('/', logWorkout);
router.get('/user/:userId/history', getWorkoutHistory);
router.get('/user/:userId/stats', getWorkoutStats);
router.delete('/:workoutId', deleteWorkout);

export default router;