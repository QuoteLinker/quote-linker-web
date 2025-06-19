# Dockerfile for a Next.js Application

# === Builder Stage ===
FROM node:20-alpine AS builder
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci

# Copy all files and build the application
COPY . .
ENV NEXT_TELEMETRY_DISABLED 1
RUN npm run build

# === Production Stage ===
FROM node:20-alpine AS production
WORKDIR /app

# Set environment to production
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Copy only necessary files from builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./

# Expose the port the app runs on
EXPOSE $PORT

# Start the application
CMD ["npm", "run", "start"]