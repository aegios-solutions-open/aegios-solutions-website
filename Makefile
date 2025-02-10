# Define service name and image
SERVICE_NAME = aegios-website
IMAGE_NAME = aegios-website-react

# Define Docker Compose commands
DOCKER_COMPOSE = docker compose

# Build the Docker image
build:
	$(DOCKER_COMPOSE) build $(SERVICE_NAME)

# Start the services in the background
up:
	$(DOCKER_COMPOSE) up -d $(SERVICE_NAME)

# Start the services and attach to the logs
up-logs:
	$(DOCKER_COMPOSE) up $(SERVICE_NAME)

# Stop the services
down:
	$(DOCKER_COMPOSE) down

# Remove stopped containers, networks, and volumes
clean:
	$(DOCKER_COMPOSE) down -v

# Run tests (if you have tests set up for the React app)
test:
	$(DOCKER_COMPOSE) exec $(SERVICE_NAME) npm test

# Rebuild the service without using the cache
rebuild:
	$(DOCKER_COMPOSE) build --no-cache $(SERVICE_NAME)

# View logs
