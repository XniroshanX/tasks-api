# Use Node.js image
FROM node:20.11.0

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install --production


# Copy the rest of the app
COPY . .
RUN npm run build

# Expose the port
EXPOSE 8000

EXPOSE 27017



# Start the server
CMD ["node", "./build/index.js"]
