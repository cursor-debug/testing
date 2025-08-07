#!/bin/bash

echo "Starting Student Management System Backend..."
echo "========================================"

cd backend

# Check if Maven is installed
if ! command -v mvn &> /dev/null; then
    echo "Error: Maven is not installed or not in PATH"
    exit 1
fi

# Check if Java is installed
if ! command -v java &> /dev/null; then
    echo "Error: Java is not installed or not in PATH"
    exit 1
fi

echo "Installing dependencies..."
mvn clean install -q

if [ $? -eq 0 ]; then
    echo "Dependencies installed successfully!"
    echo "Starting Spring Boot application..."
    echo "Backend will be available at: http://localhost:8080"
    echo "H2 Console will be available at: http://localhost:8080/h2-console"
    echo ""
    echo "Press Ctrl+C to stop the server"
    echo "========================================"
    mvn spring-boot:run
else
    echo "Error: Failed to install dependencies"
    exit 1
fi