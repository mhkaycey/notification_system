# 🚀 Distributed Notification System (HNG Stage 4)

This project is a scalable, fault-tolerant notification system built with a "true" microservice architecture. All services are fully decoupled, containerized, and orchestrated with Docker Compose.

This system handles notification requests asynchronously, manages user data in a dedicated database, and uses a message queue to communicate between services.

## 🏗️ Architecture: A "True" Microservice Monorepo

This monorepo follows a strict, independent service model.

* **100% Decoupled:** Each service in the `apps/` folder is a **completely independent application**.
* **Independent Dependencies:** Each service has its *own* `package.json` and `node_modules` folder. They do not share a root `node_modules`.
* **Self-Contained Builds:** Each service has its *own* `Dockerfile` and builds in its *own* context.

NOTIFICATION_SYSTEM/├── apps/│   ├── api-gateway/     (NestJS: The main entry point. Has its own package.json)│   ├── user-service/    (NestJS: Manages users & auth. Has its own package.json)│   ├── email-service/   (NestJS: Listens to the email queue. Has its own package.json)│   └── ...├── shared/              (Shared DTOs/types. Will be its own local package)├── docker-compose.yml   (The master orchestrator)└── README.md            (You are here!)
## 🛠️ Tech Stack

* **Services:** NestJS (TypeScript), PHP (for `template-service`)
* **Database:** PostgreSQL
* **Database Admin:** PgAdmin
* **Message Queue:** RabbitMQ
* **Cache:** Redis
* **Containerization:** Docker & Docker Compose

## ⚡ Local Development Setup

Follow these steps to build and run the *entire* system on your local machine.

### Prerequisites

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/en) (v18 or later)
* [Docker Desktop](https://www.docker.com/products/docker-desktop/) **(Must be running)**

### Step 1: Install All Dependencies

Because each app is independent, you must install dependencies for *each one*.

```bash
# Run from the project root

# Install dependencies for api-gateway
cd apps/api-gateway
npm install
cd ../..

# Install dependencies for user-service
cd apps/user-service
npm install
cd ../..

# Install dependencies for email-service
cd apps/email-service
npm install
cd ../..

# ... repeat for all other services ...
(Note: A more advanced setup would use npm workspaces in the root package.json to do this with a single npm install command. We can set this up later.)Step 2: Set Up Environment VariablesEach service requires its own .env file.Go to apps/api-gateway/ and create a .env file.Go to apps/user-service/ and create a .env file.Fill them with the required variables (like database credentials from docker-compose.yml, JWT secrets, etc.).Step 3: Build Your Applications (CRITICAL STEP)Our Dockerfiles are production-style. They copy a pre-built dist folder. You must compile your TypeScript to JavaScript before running Docker.Run these commands from the project root:Bash# Build the api-gateway
npm run build api-gateway

# Build the user-service
npm run build user-service

# Build the email-service
npm run build email-service
(This assumes your root package.json has a script: "build": "nest build". If not, you may need to run npx nest build <app-name>.)Step 4: Run the Entire SystemNow that your dist folders are ready, you can build and run the containers.Bash# Run from the project root
docker compose up --build -d
--build: Forces Docker to re-build your images, using the new dist folders.-d: Runs the containers in "detached" mode (in the background).To see the live logs for all services, run:Bashdocker compose logs -f
📊 Service Dashboard & PortsYour system is now running! You can access the following services from your browser:ServiceLocal URLCredentialsAPI Gatewayhttp://localhost:3001(Your API endpoints)User Servicehttp://localhost:3003(Internal; use Gateway)PgAdminhttp://localhost:8080admin@admin.com / adminRabbitMQhttp://localhost:15672guest / guestPostgreSQLlocalhost:5433(Connect with a DB client)🧪 Testing the Full, End-to-End FlowUse Postman or curl to test the complete, real flow.Test 1: Create a UserFirst, we must create a user in the database.Request: POST http://localhost:3001/api/v1/usersBody (JSON):JSON{
  "name": "Emma",
  "email": "emma.b@example.com",
  "password": "mySecurePassword123",
  "preferences": {
    "email": true,
    "push": true
  }
}
Response: You will get a JSON response with the new user. Copy the id from the response.Test 2: Send a NotificationNow, use that id to send a notification.Request: POST http://localhost:3001/api/v1/notificationsBody (JSON):JSON{
  "notification_type": "email",
  "user_id": "PASTE_THE_USER_ID_YOU_COPIED_HERE",
  "template_code": "welcome_email",
  "variables": {
    "name": "Emma",
    "link": "[https://yourapp.com/confirm](https://yourapp.com/confirm)"
  },
  "request_id": "YOUR_OWN_UNIQUE_ID_HERE"
}
Response: {"request_id":"...","status":"queued"}Test 3: Verify the ResultCheck the logs: Your docker compose logs -f terminal should show:api-gateway fetched the user and published the message.email-service (if running) received the message.Check RabbitMQ: Go to http://localhost:15672. Log in and click the "Queues" tab. You should see a message in the email.queue.
