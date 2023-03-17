# Use an official Node.js runtime as a parent image
FROM node:16-alpine

# Set the working directory to /dashboard
WORKDIR /frontend

# Copy the package.json and package-lock.json files to the container
COPY ./frontend/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY frontend/ .

# Build the production version of the dashboard
RUN npm run build

# Expose port 5000 for the application to run on
EXPOSE 5000

# Define the command to run the application
CMD ["npm", "start"]
