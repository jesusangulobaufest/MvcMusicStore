# Node.js and PostgreSQL devcontainer

# Use the official Node.js image as a parent image
FROM node:20

# Install PostgreSQL
RUN apt-get update && \
    apt-get install -y postgresql postgresql-contrib && \
    rm -rf /var/lib/apt/lists/*

# Create a non-root user
RUN useradd -ms /bin/bash node

# Set the working directory
WORKDIR /workspace

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the application port
EXPOSE 3000

# Set the default command to run the application
CMD ["npm", "run", "start:dev"]
