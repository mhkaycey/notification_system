# 🚀 Distributed Notification System (HNG Stage 4)

Welcome to the HNG Stage 4 Backend task! This project is a scalable, fault-tolerant notification system built with a polyglot (multi-language) microservice architecture.

The system is designed to handle notification requests (Email and Push) asynchronously, manage user data, and store templates, with each core function isolated in its own containerized service.

## 🏗️ Project Structure

This is a monorepo containing all the independent microservices. Each service is treated as a standalone application with its own dependencies (if applicable) and Dockerfile, orchestrated by a central `docker-compose.yml` file.

NOTIFICATION_SYSTEM/ ├── apps/ │ ├── api-gateway/ (NestJS: The main entry point) │ ├── user-service/ (NestJS: Manages users & prefs) │ ├── email-service/ (NestJS: Listens to the email queue) │ ├── push-service/ (NestJS: Listens to the push queue) │ └── template-service/ (PHP: Manages templates) ├── shared/ (Shared DTOs and types for TS services) ├── docker-compose.yml (The master plan) └── README.md (You are here!)


## 🛠️ Tech Stack

* **Services:** NestJS (TypeScript), PHP
* **Database:** PostgreSQL (for relational data)
* **Cache:** Redis (for caching, rate limiting)
* **Message Queue:** RabbitMQ (for asynchronous communication)
* **Containerization:** Docker & Docker Compose

## ⚡ Getting Started

Follow these instructions to get the entire distributed system running on your local machine.

### Prerequisites

You must have the following tools installed on your system:
* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/en) (v18 or later)
* [Docker Desktop](https://www.docker.com/products/docker-desktop/) (Must be **running** before you start)

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd notification_system
2. Install Dependencies
If your project relies on a root package.json with workspaces (as we discussed), you only need to install from the root.

Bash

# Run from the project root directory
npm install
3. Environment Variables
This is a critical step. Each service in the apps/ folder may require its own .env file for secrets (like database passwords, API keys, etc.).

Important: Your team's docker-compose.yml (from the dev branch) now likely controls all environment variables. Check that file to see what's being set.

If a service needs a database password, it will be defined in the docker-compose.yml and passed to the service.

4. Run the Entire System
Thanks to Docker Compose, this is the only command you need to start all 5 microservices, the database, the cache, and the message queue.

Bash

# Run from the project root directory
# --build: Re-builds your custom service images if code has changed
docker compose up --build
You will see logs from all services streaming in your terminal. Wait for them all to start (especially the database and RabbitMQ) before testing.

🏃‍♂️ Smoke Test: Verify Service Communication
To prove the system is working, you can use the test endpoint we built. This test verifies that the api-gateway can successfully make a network call to the user-service.

Wait for all containers to be "healthy" in your docker compose up logs.

Open a new, separate terminal.

Run the following curl command:

Bash

# This hits the api-gateway, which then calls the user-service
curl http://localhost:3001/api/v1/users/test-call
Expected Response:

JSON

{"email":true,"push":true}
If you see this, your core application is wired correctly!

📦 Key API Endpoints (Primary)
POST /api/v1/notifications (via api-gateway): The main endpoint to queue a new notification.

POST /api/v1/users (via api-gateway): The proxy endpoint to create a new user in the user-service.
