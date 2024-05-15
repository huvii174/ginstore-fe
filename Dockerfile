# Stage 1: Build the React app
FROM node:13.14.0 AS build

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the dependencies
RUN npm install

RUN npm install sass

# Copy the rest of the application code to the working directory
COPY . .

# Build the React app
RUN npm run build

# Stage 2: Serve the React app
FROM node:14

# Set the working directory
WORKDIR /app

# Install serve to serve the React app
RUN npm install -g serve

# Copy the build output to the working directory
COPY --from=build /app/build /app/build

# Expose port 5000
EXPOSE 5000

# Start the React app using serve
CMD ["serve", "-s", "build", "-l", "5000"]
