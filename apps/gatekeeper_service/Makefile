default: dev
project:=codegraph
service:=engine_service
current_dir:=$(shell pwd)

.PHONY: dev
dev:
	@echo "Starting development environment..."
	docker-compose -p ${project} up

.PHONY: start-db
start-db:
	@echo "Starting database..."
	docker-compose -p ${project} up -d ${service}_db
