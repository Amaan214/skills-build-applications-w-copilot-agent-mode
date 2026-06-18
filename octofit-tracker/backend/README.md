# OctoFit Tracker Backend API

A modern REST API for the OctoFit Tracker fitness application built with Express.js, TypeScript, and MongoDB.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB running on port 27017
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Seed the database (optional)
npm run seed

# Start development server
npm run dev
```

The API will be available at `http://localhost:8000`

## 📚 API Endpoints

### Users
- `GET /api/users/:id` - Get user profile
- `PATCH /api/users/:id` - Update user profile
- `DELETE /api/users/:id` - Delete user account

### Workouts
- `POST /api/workouts` - Log a new workout
- `GET /api/workouts/user/:userId/history` - Get workout history
- `GET /api/workouts/user/:userId/stats` - Get workout statistics
- `DELETE /api/workouts/:workoutId` - Delete a workout

### Daily Goals
- `GET /api/goals/user/:userId` - Get today's daily goal
- `PATCH /api/goals/:goalId` - Update goal targets
- `PATCH /api/goals/:goalId/complete` - Mark goal as completed
- `GET /api/goals/:goalId/progress` - Get goal progress

### Health
- `GET /api/health` - API health check
- `GET /api` - API information

## 🗄️ Database Models

### User
```typescript
- username: string (unique)
- email: string (unique)
- password: string
- firstName: string
- lastName: string
- goal: string
- timestamps
```

### WorkoutSession
```typescript
- userId: ObjectId (ref: User)
- exerciseName: string
- duration: number (minutes)
- caloriesBurned: number
- intensity: 'low' | 'moderate' | 'high'
- notes: string
- timestamps
```

### DailyGoal
```typescript
- userId: ObjectId (ref: User)
- date: Date
- targetCalories: number
- targetWorkoutMinutes: number
- caloriesAchieved: number
- workoutMinutesAchieved: number
- completed: boolean
- timestamps
```

## 🛠️ Development

### Build TypeScript
```bash
npm run build
```

### Seed Sample Data
```bash
npm run seed
```

This creates 3 sample users with workout sessions and daily goals.

### Linting
```bash
npm run lint
```

## 📝 Sample Requests

### Log a Workout
```bash
curl -X POST http://localhost:8000/api/workouts \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "<USER_ID>",
    "exerciseName": "Running",
    "duration": 30,
    "caloriesBurned": 350,
    "intensity": "high",
    "notes": "Morning run"
  }'
```

### Get User Profile
```bash
curl http://localhost:8000/api/users/<USER_ID>
```

### Get Daily Goal Progress
```bash
curl http://localhost:8000/api/goals/<GOAL_ID>/progress
```

## 🔧 Configuration

Edit `.env` to configure:
- `PORT` - Server port (default: 8000)
- `MONGODB_URI` - MongoDB connection string
- `NODE_ENV` - Environment (development/production)

## 🤝 Contributing

Contributions welcome! Please follow the existing code style and add tests for new features.

## 📄 License

MIT
