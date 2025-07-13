#!/bin/bash

# Download images from GitHub repository
echo "Downloading images from GitHub repository..."

# Create images directory if it doesn't exist
mkdir -p src/assets/images

# Clone the repository temporarily
git clone https://github.com/grabby/simplymacarons-client.git temp-repo

# Copy images from the cloned repo
if [ -d "temp-repo/assets/images" ]; then
    echo "Copying images..."
    cp -r temp-repo/assets/images/* src/assets/images/
    echo "✅ Images copied successfully!"
else
    echo "❌ Images directory not found in the repository"
    echo "Please check the repository structure and update the script accordingly"
fi

# Clean up
rm -rf temp-repo

echo "Done! Images should now be in src/assets/images/"
echo ""
echo "Expected image files:"
echo "- vanilla-macaron.jpg"
echo "- chocolate-macaron.jpg"
echo "- strawberry-macaron.jpg"
echo "- lemon-macaron.jpg"
echo "- raspberry-macaron.jpg"
echo "- caramel-macaron.jpg"
echo "- pistachio-macaron.jpg"
echo "- lavender-macaron.jpg"
echo "- rose-macaron.jpg"
echo "- coffee-macaron.jpg"
echo "- matcha-macaron.jpg"
echo "- passion-fruit-macaron.jpg" 