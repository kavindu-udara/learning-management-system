#!/bin/bash

# Install dependencies
npm install

# Navigate to the frontend directory, copy .env.example to .env
cd frontend
cp .env.example .env

# Navigate to the backend directory, copy .env.example to .env
cd ../backend
cp .env.example .env

echo "Setup complete! Setup your .env files in the frontend and backend directories and run 'npm run dev' to start the application."
