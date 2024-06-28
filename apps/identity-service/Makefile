default: dev
project:=string
service:=identity_service
current_dir:=$(shell pwd)

.PHONY: dev
dev:
	@echo "Starting development environment..."
	docker-compose -p ${project} up

.PHONY: start-db
start-db:
	@echo "Starting database..."
	docker-compose -p ${project} up -d ${service}_db

.PHONY: migrate
migrate:
	@echo "Starting database..."
	docker-compose -p ${project} up -d ${service}_db
	diesel migration run
	docker-compose -p ${project} down -d ${service}_db
