default: dev
project:=assertly
service:=ai_service
current_dir:=$(shell pwd)

.PHONY: dev
dev:
	@echo "Starting development environment..."
	docker-compose -p ${project} up

.PHONY: dev
dev-build:
	@echo "Starting development environment..."
	docker-compose -p ${project} up --build

.PHONY: start-db
start-db:
	@echo "Starting database..."
	docker-compose -p ${project} up -d ${service}_db

.PHONY: down
down:
	docker-compose -p ${project} down --remove-orphans

.PHONY: ps
ps:
	docker-compose -p ${project} ps

.PHONY: shell
shell:
	docker-compose -p ${project} run ${service} sh

.PHONY: build
build:
	docker-compose -p ${project} build --no-cache

.PHONY: test
test:
	npm run test

.PHONY: coverage
coverage:
	npm run test:cov

.PHONY: e2e
e2e:
	npm run test:e2e

.PHONY: format
format:
	npm run format