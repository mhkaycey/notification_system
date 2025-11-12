ARG NODE_VERSION=24.4.0
FROM node:24.4.0-alpine
RUN apk add --no-cache python3 make g++
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
ENV PORT=8000
EXPOSE 8000
CMD ["npm", "start"]
