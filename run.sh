# #!/bin/bash

# # Run AccessImages.py in the background
# python /home/blore005/course-project-bic/flask_backend/app/AccessImages.py &

# # Run images.py in the background
# python /home/blore005/course-project-bic/flask_backend/app/images.py &

# # Run npm dev server
# cd /home/blore005/course-project-bic/react_frontend
# npm run dev

#!/bin/bash

# Function to handle interrupt signal
cleanup() {
    echo "Exiting..."
    # Kill the background Python processes
    pkill -P $$  # Kill processes started by this script
    exit 1
}

# Trap interrupt signal (Ctrl+C)
trap cleanup SIGINT

# Run AccessImages.py in the background
python /home/blore005/course-project-bic/flask_backend/app/AccessImages.py &

# Store the PID of the background process
pid_access_images=$!

# Run images.py in the background
python /home/blore005/course-project-bic/flask_backend/app/images.py &

# Store the PID of the background process
pid_images=$!

# Run npm dev server
cd /home/blore005/course-project-bic/react_frontend
npm run dev

# If npm run dev exits, kill the background Python processes
cleanup