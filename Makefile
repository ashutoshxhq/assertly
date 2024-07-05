default: dev
project:=assertly
current_dir:=$(shell pwd)
MAKEFLAGS += -j4

dev: dev-engine dev-webapp

.PHONY: dev-engine
dev-engine:
	@echo "Starting engine service..."
	cd ./apps/engine-service && docker compose -p ${project} up

.PHONY: dev-webapp
dev-webapp:
	@echo "Starting web app..."
	cd apps/assertly_app && pnpm dev

.PHONY: dev-api
build-api:
	@echo "Building api service..."
	cd ./apps/api_service && docker-compose -p ${project} build --no-cache