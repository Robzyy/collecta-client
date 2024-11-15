# STAGE 1: Build angular app
# --------------------------------------

# Pull node image
FROM node:alpine AS build

# Set working directory
WORKDIR /app

# Copy package.json
COPY package*.json .

# Install Angular CLI globally
RUN npm install -g @angular/cli

# Install dependencies  
RUN npm install

# Copy project files
COPY . .

# Build the application
RUN ng build

# STAGE 2: Run the application
# --------------------------------------

# Pull nginx image
FROM nginx:alpine

# Copy built application to nginx html directory
COPY --from=build /app/dist/collecta-client/browser /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf  

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
