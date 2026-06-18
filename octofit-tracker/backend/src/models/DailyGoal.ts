import mongoose, { Schema, Document } from 'mongoose';

export interface IDailyGoal extends Document {
  userId: mongoose.Types.ObjectId;
  date: Date;
  targetCalories: number;
  targetWorkoutMinutes: number;
  caloriesAchieved: number;
  workoutMinutesAchieved: number;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const dailyGoalSchema = new Schema<IDailyGoal>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, required: true, default: () => new Date() },
    targetCalories: { type: Number, default: 2000 },
    targetWorkoutMinutes: { type: Number, default: 30 },
    caloriesAchieved: { type: Number, default: 0 },
    workoutMinutesAchieved: { type: Number, default: 0 },
    completed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const DailyGoal = mongoose.model<IDailyGoal>('DailyGoal', dailyGoalSchema);