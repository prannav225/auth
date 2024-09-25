# Use an official Node.js image as a base image
FROM node:16-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN yarn

# Copy the rest of your application files
COPY . .

# Build the NestJS application
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Start the NestJS application
CMD ["yarn", "run", "start:prod"]
