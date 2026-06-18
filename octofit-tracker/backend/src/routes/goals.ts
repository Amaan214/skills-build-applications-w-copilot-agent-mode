import express from 'express';
import {
  getDailyGoal,
  updateDailyGoal,
  completeDailyGoal,
  getGoalProgress,
} from '../controllers/goalController';

const router = express.Router();

// Daily goal routes
router.get('/user/:userId', getDailyGoal);
router.patch('/:goalId', updateDailyGoal);
router.patch('/:goalId/complete', completeDailyGoal);
router.get('/:goalId/progress', getGoalProgress);

export default router;