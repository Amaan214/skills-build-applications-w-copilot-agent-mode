import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { User } from '../models/User';
import { WorkoutSession } from '../models/WorkoutSession';
import { DailyGoal } from '../models/DailyGoal';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit-tracker';

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('✓ Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await WorkoutSession.deleteMany({});
    await DailyGoal.deleteMany({});
    console.log('✓ Cleared existing data');

    // Create sample users
    const users = await User.insertMany([
      {
        username: 'octofit_user1',
        email: 'user1@octofit.com',
        password: 'hashedpassword123', // In production, use bcrypt
        firstName: 'Alex',
        lastName: 'Octopus',
        goal: 'Build strength and endurance',
      },
      {
        username: 'octofit_user2',
        email: 'user2@octofit.com',
        password: 'hashedpassword456',
        firstName: 'Mona',
        lastName: 'GitHub',
        goal: 'Improve cardiovascular health',
      },
      {
        username: 'octofit_user3',
        email: 'user3@octofit.com',
        password: 'hashedpassword789',
        firstName: 'Octo',
        lastName: 'Cat',
        goal: 'Maintain fitness and wellness',
      },
    ]);
    console.log(`✓ Created ${users.length} users`);

    // Create sample workout sessions
    const workouts = await WorkoutSession.insertMany([
      {
        userId: users[0]._id,
        exerciseName: 'Running',
        duration: 30,
        caloriesBurned: 350,
        intensity: 'high',
        notes: 'Morning run in the park',
      },
      {
        userId: users[0]._id,
        exerciseName: 'Weight Training',
        duration: 45,
        caloriesBurned: 400,
        intensity: 'high',
        notes: 'Upper body workout',
      },
      {
        userId: users[0]._id,
        exerciseName: 'Yoga',
        duration: 60,
        caloriesBurned: 180,
        intensity: 'low',
        notes: 'Relaxing evening session',
      },
      {
        userId: users[1]._id,
        exerciseName: 'Cycling',
        duration: 45,
        caloriesBurned: 320,
        intensity: 'moderate',
        notes: 'Weekend bike ride',
      },
      {
        userId: users[1]._id,
        exerciseName: 'Swimming',
        duration: 40,
        caloriesBurned: 380,
        intensity: 'moderate',
        notes: 'Pool workout',
      },
      {
        userId: users[2]._id,
        exerciseName: 'Pilates',
        duration: 50,
        caloriesBurned: 250,
        intensity: 'moderate',
        notes: 'Core strengthening',
      },
      {
        userId: users[2]._id,
        exerciseName: 'Hiking',
        duration: 90,
        caloriesBurned: 520,
        intensity: 'moderate',
        notes: 'Mountain trail',
      },
    ]);
    console.log(`✓ Created ${workouts.length} workout sessions`);

    // Create daily goals
    const today = new Date();
    const startOfDay = new Date(today.toDateString());

    const dailyGoals = await DailyGoal.insertMany([
      {
        userId: users[0]._id,
        date: startOfDay,
        targetCalories: 2500,
        targetWorkoutMinutes: 60,
        caloriesAchieved: 750,
        workoutMinutesAchieved: 75,
        completed: true,
      },
      {
        userId: users[1]._id,
        date: startOfDay,
        targetCalories: 2000,
        targetWorkoutMinutes: 45,
        caloriesAchieved: 700,
        workoutMinutesAchieved: 85,
        completed: true,
      },
      {
        userId: users[2]._id,
        date: startOfDay,
        targetCalories: 2200,
        targetWorkoutMinutes: 50,
        caloriesAchieved: 770,
        workoutMinutesAchieved: 140,
        completed: true,
      },
    ]);
    console.log(`✓ Created ${dailyGoals.length} daily goals`);

    console.log('\n✅ Database seeded successfully!');
    console.log(`\nSample User IDs:`);
    users.forEach((user, index) => {
      console.log(`  User ${index + 1}: ${user._id} (${user.username})`);
    });

    process.exit(0);
  } catch (error) {
    console.error('✗ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();