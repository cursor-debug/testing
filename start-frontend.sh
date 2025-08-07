#!/bin/bash

echo "Starting Student Management System Frontend..."
echo "============================================="

cd frontend/student-management-frontend

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Error: Node.js is not installed or not in PATH"
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "Error: npm is not installed or not in PATH"
    exit 1
fi

echo "Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "Dependencies installed successfully!"
    echo "Starting Angular development server..."
    echo "Frontend will be available at: http://localhost:4200"
    echo ""
    echo "Press Ctrl+C to stop the server"
    echo "============================================="
    npm start
else
    echo "Error: Failed to install dependencies"
    exit 1
fi