# Dockerfile for a Next.js application

# === Base Image for Dependencies (deps) ===
# Use the official Node.js 18 image on Alpine Linux for a small footprint
FROM node:18-alpine AS deps
# Set the working directory inside the container
WORKDIR /app
# Copy package.json and package-lock.json to leverage Docker's layer caching
COPY package*.json ./
# Install production dependencies
RUN npm ci

# === Builder Image ===
# Use the same base image to build the application
FROM node:18-alpine AS builder
WORKDIR /app
# Copy dependencies from the 'deps' stage
COPY --from=deps /app/node_modules ./node_modules
# Copy the rest of your application source code
COPY . .
# Build the Next.js application for production
RUN npm run build

# === Production Image ===
# Use a lean final image for the running application
FROM node:18-alpine AS runner
WORKDIR /app
# Set the environment to production
ENV NODE_ENV production
# Next.js recommends not running as root user.
# Create a new user 'nextjs' with a home directory and no shell
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
# Copy only the necessary built files from the 'builder' stage
COPY --from=builder /app/public ./public
# Standalone output mode in Next.js bundles only necessary files
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Set the user to the non-root user 'nextjs'
USER nextjs

# Expose the port the app runs on (Next.js default is 3000)
EXPOSE 3000

# The command to start the application
CMD ["npm", "start"]