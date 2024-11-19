#!/bin/bash

# Function to detect OS and activate virtual environment accordingly
activate_venv() {
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        source .venv/bin/activate
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        # Linux
        source .venv/bin/activate
    else
        echo "Unsupported operating system"
        exit 1
    fi
}

# Clone the repository
echo "Cloning repository..."
git clone https://github.com/Dice42/govTracker360.git

# Navigate to project directory
echo "Navigating to project directory..."
cd govTracker360

# Install frontend dependencies
echo "Installing frontend dependencies..."
npm install

# Start frontend in background
echo "Starting frontend development server..."
npm run dev &

# Navigate to backend directory
echo "Setting up backend..."
cd backend

# Create virtual environment
echo "Creating Python virtual environment..."
python3 -m venv .venv

# Activate virtual environment
echo "Activating virtual environment..."
activate_venv

# Install Python dependencies
echo "Installing Python dependencies..."
pip install -r requirements.txt

# Start backend server
echo "Starting backend server..."
python3 -m uvicorn main:app --reload

echo "Setup complete! Both servers should be running." 