# #!/bin/bash

# # Function to handle interrupt signal
# cleanup() {
#     echo "Exiting..."
#     # Kill the background Python processes
#     pkill -P $$  # Kill processes started by this script
#     exit 1
# }

# # Trap interrupt signal (Ctrl+C)
# trap cleanup SIGINT

# # Run http server to serve images
# cd /home/blore005/data/derivatives
# python -m http.server 8080 &

# # Store the PID of the background process
# pid_http_server=$!

# # Run images.py in the background
# python /home/blore005/course-project-bic/flask_backend/app/images.py &

# # Store the PID of the background process
# pid_images=$!

# # Run npm dev server
# cd /home/blore005/course-project-bic/react_frontend
# npm run dev

# # If npm run dev exits, kill the background processes
# cleanup

#!/bin/bash

# Function to handle interrupt signal
cleanup() {
    echo "Exiting..."
    # Kill the background processes
    kill "$pid_http_server" "$pid_images" >/dev/null 2>&1
    exit 1
}

# Trap interrupt signal (Ctrl+C)
trap cleanup SIGINT

# Run http server to serve images
cd /home/blore005/data/derivatives
python3 -m http.server --bind 127.0.0.1 8080 &

# Store the PID of the background process
pid_http_server=$!

# Run images.py in the background
python3 /home/inaz001/course-project-bic/flask_backend/app/images.py &

# Store the PID of the background process
pid_images=$!

# Run npm dev server
cd /home/inaz001/course-project-bic/react_frontend
npm run dev

# If npm run dev exits, kill the background processes
cleanup
