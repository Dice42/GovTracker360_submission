# Clone the repository
Write-Host "Cloning repository..."
git clone https://github.com/Dice42/govTracker360.git

# Navigate to project directory
Write-Host "Navigating to project directory..."
cd govTracker360

# Install frontend dependencies
Write-Host "Installing frontend dependencies..."
npm install

# Start frontend in background
Write-Host "Starting frontend development server..."
Start-Process npm -ArgumentList "run dev"

# Navigate to backend directory
Write-Host "Setting up backend..."
cd backend

# Create virtual environment
Write-Host "Creating Python virtual environment..."
python -m venv .venv

# Activate virtual environment
Write-Host "Activating virtual environment..."
.\.venv\Scripts\Activate

# Install Python dependencies
Write-Host "Installing Python dependencies..."
pip install -r requirements.txt

# Start backend server
Write-Host "Starting backend server..."
python -m uvicorn main:app --reload

Write-Host "Setup complete! Both servers should be running." 