# Dockerfile for a Next.js Application

# === Builder Stage ===
FROM node:20-alpine AS deps
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json package-lock.json ./
RUN npm ci

# === Builder Stage ===
FROM node:20-alpine AS builder
WORKDIR /app

# Set environment to production
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build Next.js application
RUN npm run build

# === Production Stage ===
FROM node:20-alpine AS runner
WORKDIR /app

# Set environment to production
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Create a non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy only necessary files
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Set correct permissions
USER nextjs

# Set the PORT environment variable for Cloud Run
ENV PORT 8080

# Expose the port the app runs on
EXPOSE $PORT

# Start the server
CMD ["node", "server.js"]