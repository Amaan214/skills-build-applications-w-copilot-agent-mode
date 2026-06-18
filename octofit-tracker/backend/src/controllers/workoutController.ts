import { Request, Response } from 'express';
import { WorkoutSession } from '../models/WorkoutSession';
import { DailyGoal } from '../models/DailyGoal';

/**
 * Log a new workout session
 */
export const logWorkout = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, exerciseName, duration, caloriesBurned, intensity, notes } = req.body;

    if (!userId || !exerciseName || !duration || caloriesBurned === undefined) {
      res.status(400).json({ error: 'Missing required fields' });
      return;
    }

    const workout = new WorkoutSession({
      userId,
      exerciseName,
      duration,
      caloriesBurned,
      intensity: intensity || 'moderate',
      notes: notes || '',
    });

    const savedWorkout = await workout.save();

    // Update daily goal
    const today = new Date().toDateString();
    const dailyGoal = await DailyGoal.findOneAndUpdate(
      { userId, date: { $gte: new Date(today) } },
      {
        $inc: {
          caloriesAchieved: caloriesBurned,
          workoutMinutesAchieved: duration,
        },
      },
      { new: true }
    );

    res.status(201).json({
      workout: savedWorkout,
      dailyGoalUpdate: dailyGoal,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to log workout' });
  }
};

/**
 * Get user's workout history
 */
export const getWorkoutHistory = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.params.userId;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 50;

    const workouts = await WorkoutSession.find({ userId })
      .sort({ createdAt: -1 })
      .limit(limit);

    res.json(workouts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch workout history' });
  }
};

/**
 * Get workout statistics
 */
export const getWorkoutStats = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.params.userId;
    const days = req.query.days ? parseInt(req.query.days as string) : 30;

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const workouts = await WorkoutSession.find({
      userId,
      createdAt: { $gte: startDate },
    });

    const stats = {
      totalWorkouts: workouts.length,
      totalCalories: workouts.reduce((sum, w) => sum + w.caloriesBurned, 0),
      totalMinutes: workouts.reduce((sum, w) => sum + w.duration, 0),
      averageCaloriesPerWorkout:
        workouts.length > 0
          ? Math.round(
              workouts.reduce((sum, w) => sum + w.caloriesBurned, 0) / workouts.length
            )
          : 0,
      averageDuration:
        workouts.length > 0
          ? Math.round(workouts.reduce((sum, w) => sum + w.duration, 0) / workouts.length)
          : 0,
    };

    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch workout statistics' });
  }
};

/**
 * Delete a workout session
 */
export const deleteWorkout = async (req: Request, res: Response): Promise<void> => {
  try {
    const workoutId = req.params.workoutId;
    const workout = await WorkoutSession.findByIdAndDelete(workoutId);

    if (!workout) {
      res.status(404).json({ error: 'Workout not found' });
      return;
    }

    res.json({ message: 'Workout deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete workout' });
  }
};