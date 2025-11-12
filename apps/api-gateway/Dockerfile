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
COPY apps/api-gateway/ apps/api-gateway/

# 4. Set the default command
# This tells NestJS to run this *specific* app from the monorepo
CMD ["npm", "run", "start:dev", "api-gateway"]