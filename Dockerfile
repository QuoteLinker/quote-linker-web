# Dockerfile for a Next.js Standalone Application

# === Base Image for Dependencies (deps) ===
# Use the official Node.js 20 image on Alpine Linux for a small footprint
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# === Builder Image ===
# Build the application
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Set NEXT_TELEMETRY_DISABLED to 1 to prevent telemetry during build
ENV NEXT_TELEMETRY_DISABLED 1
RUN npm run build

# === Production Image ===
# This is the final, small image that will be deployed
FROM node:20-alpine AS runner
WORKDIR /app
# Set the environment to production
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Create a non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy the standalone output from the builder stage
COPY --from=builder /app/.next/standalone ./
# Copy the public and static assets
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static ./.next/static

# Set the correct user and permissions
USER nextjs
# Expose the port the app runs on. Default is 3000, but your server.js uses 3001
EXPOSE 3001
# Set the port environment variable your server.js will use
ENV PORT 3001

# The command to start the application using the custom server
CMD ["node", "server.js"]