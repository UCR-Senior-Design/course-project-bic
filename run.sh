#!/bin/bash

# Function to handle interrupt signal
cleanup() {
    echo "Exiting..."
    # Kill the background processes
    kill "$pid_images" >/dev/null 2>&1
    exit 1
}

# Trap interrupt signal (Ctrl+C)
trap cleanup SIGINT

python3 /home/blore005/course-project-bic/flask_backend/app/images.py &

# Store the PID of the background process
pid_images=$!

# Run npm dev server
cd /home/blore005/course-project-bic/react_frontend
npm run dev

# If npm run dev exits, kill the background processes
cleanup
