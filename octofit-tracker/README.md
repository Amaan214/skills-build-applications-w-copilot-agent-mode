# 🐙 OctoFit Tracker

A modern multi-tier fitness tracking application built with GitHub Copilot Agent Mode.

## Architecture

```
octofit-tracker/
├── frontend/          # React 19 + Vite (Port 5173)
└── backend/           # Node.js + Express + TypeScript (Port 8000)
```

## Prerequisites

- Node.js 18+
- MongoDB (running on port 27017)

## Frontend Setup

```bash
cd octofit-tracker/frontend
npm install
npm run dev
```

Frontend will run on: `http://localhost:5173`

## Backend Setup

```bash
cd octofit-tracker/backend
npm install
cp .env.example .env
npm run dev
```

Backend will run on: `http://localhost:8000`

## MongoDB Setup

Ensure MongoDB is running locally:

```bash
mongod --port 27017
```

Or use Docker:

```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

## API Endpoints

- `GET /api/health` - Health check
- `GET /api` - Welcome message

## Development

Start both servers:

1. Terminal 1 (Frontend):
   ```bash
   cd frontend
   npm run dev
   ```

2. Terminal 2 (Backend):
   ```bash
   cd backend
   npm run dev
   ```

3. Terminal 3 (MongoDB):
   ```bash
   mongod --port 27017
   ```

## Build

### Frontend
```bash
cd frontend
npm run build
```

### Backend
```bash
cd backend
npm run build
npm start
```
