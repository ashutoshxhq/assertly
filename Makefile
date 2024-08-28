default: dev
project:=assertly
current_dir:=$(shell pwd)
MAKEFLAGS += -j5

dev: dev-app dev-ai-agent-service dev-identity-service dev-engine-service dev-webdriver-service

.PHONY: dev-app
dev-app:
	@echo "Starting web app..."
	cd apps/assertly-app && pnpm dev

.PHONY: dev-ai-agent
dev-ai-agent-service:
	@echo "Building ai-agent service..."
	cd ./apps/ai-agent-service && pnpm dev

.PHONY: dev-identity
dev-identity-service:
	@echo "Building identity service..."
	cd ./apps/identity-service && cargo run

.PHONY: dev-engine
dev-engine-service:
	@echo "Building engine service..."
	cd ./apps/engine-service && pnpm start:dev

.PHONY: dev-webdriver
dev-webdriver-service:
	@echo "Building webdriver service..."
	cd ./apps/webdriver-service && pnpm start:dev