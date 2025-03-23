# Use Node.js 22 official image
FROM node:22-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --only=production

# Copy the rest of the app's code
COPY . .

# Expose the port your app runs on
EXPOSE 8000

# Define the command to run the app
CMD ["node", "dist/server.js"]
