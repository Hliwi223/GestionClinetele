# Stage 1: Build the React app
FROM node:20 AS build

# Set the working directory
WORKDIR /app

# Install dependencies and build the app
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application code
COPY . ./

# Build the React app (Vite output goes to /app/dist by default)
RUN npm run build

# Stage 2: Serve the React app using Nginx
FROM nginx:alpine

# Copy the build output from the first stage to the Nginx folder
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 to access the app
EXPOSE 5173

# Run Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
