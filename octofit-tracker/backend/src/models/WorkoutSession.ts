import mongoose, { Schema, Document } from 'mongoose';

export interface IWorkoutSession extends Document {
  userId: mongoose.Types.ObjectId;
  exerciseName: string;
  duration: number; // in minutes
  caloriesBurned: number;
  intensity: 'low' | 'moderate' | 'high';
  notes: string;
  createdAt: Date;
  updatedAt: Date;
}

const workoutSessionSchema = new Schema<IWorkoutSession>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    exerciseName: { type: String, required: true },
    duration: { type: Number, required: true, min: 1 },
    caloriesBurned: { type: Number, required: true, min: 0 },
    intensity: { type: String, enum: ['low', 'moderate', 'high'], default: 'moderate' },
    notes: { type: String, default: '' },
  },
  { timestamps: true }
);

export const WorkoutSession = mongoose.model<IWorkoutSession>('WorkoutSession', workoutSessionSchema);