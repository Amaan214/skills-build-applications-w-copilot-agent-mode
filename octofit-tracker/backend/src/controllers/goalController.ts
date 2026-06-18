import { Request, Response } from 'express';
import { DailyGoal } from '../models/DailyGoal';

/**
 * Create or get today's daily goal
 */
export const getDailyGoal = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.params.userId;
    const today = new Date().toDateString();
    const startOfDay = new Date(today);
    const endOfDay = new Date(startOfDay.getTime() + 24 * 60 * 60 * 1000);

    let dailyGoal = await DailyGoal.findOne({
      userId,
      date: { $gte: startOfDay, $lt: endOfDay },
    });

    if (!dailyGoal) {
      dailyGoal = new DailyGoal({
        userId,
        date: startOfDay,
      });
      await dailyGoal.save();
    }

    res.json(dailyGoal);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch daily goal' });
  }
};

/**
 * Update daily goal targets
 */
export const updateDailyGoal = async (req: Request, res: Response): Promise<void> => {
  try {
    const goalId = req.params.goalId;
    const { targetCalories, targetWorkoutMinutes } = req.body;

    const dailyGoal = await DailyGoal.findByIdAndUpdate(
      goalId,
      {
        targetCalories: targetCalories || undefined,
        targetWorkoutMinutes: targetWorkoutMinutes || undefined,
      },
      { new: true, runValidators: true }
    );

    if (!dailyGoal) {
      res.status(404).json({ error: 'Daily goal not found' });
      return;
    }

    res.json(dailyGoal);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update daily goal' });
  }
};

/**
 * Mark daily goal as completed
 */
export const completeDailyGoal = async (req: Request, res: Response): Promise<void> => {
  try {
    const goalId = req.params.goalId;

    const dailyGoal = await DailyGoal.findByIdAndUpdate(
      goalId,
      { completed: true },
      { new: true }
    );

    if (!dailyGoal) {
      res.status(404).json({ error: 'Daily goal not found' });
      return;
    }

    res.json(dailyGoal);
  } catch (error) {
    res.status(500).json({ error: 'Failed to mark goal as completed' });
  }
};

/**
 * Get goal progress
 */
export const getGoalProgress = async (req: Request, res: Response): Promise<void> => {
  try {
    const goalId = req.params.goalId;
    const dailyGoal = await DailyGoal.findById(goalId);

    if (!dailyGoal) {
      res.status(404).json({ error: 'Daily goal not found' });
      return;
    }

    const progress = {
      caloriesProgress: {
        achieved: dailyGoal.caloriesAchieved,
        target: dailyGoal.targetCalories,
        percentage: Math.round((dailyGoal.caloriesAchieved / dailyGoal.targetCalories) * 100),
      },
      workoutProgress: {
        achieved: dailyGoal.workoutMinutesAchieved,
        target: dailyGoal.targetWorkoutMinutes,
        percentage: Math.round(
          (dailyGoal.workoutMinutesAchieved / dailyGoal.targetWorkoutMinutes) * 100
        ),
      },
      goalCompleted: dailyGoal.completed,
    };

    res.json(progress);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch goal progress' });
  }
};