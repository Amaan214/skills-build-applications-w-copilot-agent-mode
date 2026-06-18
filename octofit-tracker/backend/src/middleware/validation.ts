import { Request, Response, NextFunction } from 'express';

/**
 * Validate workout log request
 */
export const validateWorkoutLog = (req: Request, res: Response, next: NextFunction): void => {
  const { userId, exerciseName, duration, caloriesBurned } = req.body;

  if (!userId) {
    res.status(400).json({ error: 'userId is required' });
    return;
  }

  if (!exerciseName || typeof exerciseName !== 'string') {
    res.status(400).json({ error: 'Valid exerciseName is required' });
    return;
  }

  if (!duration || duration < 1) {
    res.status(400).json({ error: 'Valid duration (>0) is required' });
    return;
  }

  if (caloriesBurned === undefined || caloriesBurned < 0) {
    res.status(400).json({ error: 'Valid caloriesBurned (>=0) is required' });
    return;
  }

  next();
};

/**
 * Validate user update request
 */
export const validateUserUpdate = (req: Request, res: Response, next: NextFunction): void => {
  const { firstName, lastName, goal } = req.body;

  if (firstName && typeof firstName !== 'string') {
    res.status(400).json({ error: 'firstName must be a string' });
    return;
  }

  if (lastName && typeof lastName !== 'string') {
    res.status(400).json({ error: 'lastName must be a string' });
    return;
  }

  if (goal && typeof goal !== 'string') {
    res.status(400).json({ error: 'goal must be a string' });
    return;
  }

  next();
};