#!/bin/bash

# Directory where your Node.js project is located
PROJECT_DIR="./nodecode"

# Name of the output ZIP file
ZIP_NAME="storytailor_lambda_function.zip"

# Navigate to the project directory
cd $PROJECT_DIR

# If a previous ZIP exists, remove it
if [ -f "$ZIP_NAME" ]; then
    rm $ZIP_NAME
fi

# Install the required npm packages
# npm install
npm install axios

# Zip the project files and node_modules
zip -r $ZIP_NAME ./* -x "*.git*"   # Excluding .git directories

# Move back to the original directory (optional)
cd -

echo "ZIP file $PROJECT_DIR/$ZIP_NAME created successfully!"
