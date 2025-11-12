<<<<<<< HEAD
# This Dockerfile assumes its build context is the MONOREPO ROOT
# The docker-compose file will handle this
FROM node:18-alpine
WORKDIR /app

# 1. Install all monorepo dependencies
# We only copy the package.json files first to leverage Docker caching
COPY package.json package-lock.json* ./
RUN npm ci

# 2. Copy all shared config and code
COPY nest-cli.json tsconfig.build.json tsconfig.json ./
COPY shared/ shared/

# 3. Copy THIS service's source code
# This is the only line that will be different in other Dockerfiles
COPY apps/user-service/ apps/user-service/

# 4. Set the default command
# This tells NestJS to run this *specific* app from the monorepo
CMD ["npm", "run", "start:dev", "user-service"]
=======
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY tsconfig*.json ./

# Install dependencies
RUN npm ci

RUN npm install

# Copy source code
COPY src ./src

# Build the application
RUN npm run build

# Production stage
FROM node:20-alpine

WORKDIR /app

# Copy package files and install production dependencies only
COPY package*.json ./
RUN npm ci --only=production

# Copy built application from builder
COPY --from=builder /app/dist ./dist

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nestjs -u 1001

USER nestjs

EXPOSE 3001

CMD ["node", "dist/main"]



# FROM node:20-alpine AS builder

# WORKDIR /app
# COPY package*.json ./
# RUN npm install --legacy-peer-deps
# COPY . .
# RUN npm run build

# FROM node:20-alpine
# WORKDIR /app
# COPY --from=builder /app/dist ./dist
# COPY package*.json ./
# RUN npm install --only=production --legacy-peer-deps
# COPY .env .env
# EXPOSE 3001
# CMD ["node", "dist/main"]
>>>>>>> fbf6066521f22cb875aedb7f1de4dad246dfd824
