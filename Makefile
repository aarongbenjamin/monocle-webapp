.PHONY: up up-prod up-local down build build-local build-prod start-api start-ui start
up:
	docker compose up -d
up-prod:
	docker compose -f docker-compose.base.yml -f docker-compose.prod.yml up
up-local:
	docker compose -f docker-compose.base.yml -f docker-compose.local.yml up -d
down:
	docker compose -f docker-compose.base.yml -f docker-compose.local.yml down
build:
	docker compose build
build-local:
	docker compose -f docker-compose.base.yml -f docker-compose.local.yml build
build-prod:
	docker compose -f docker-compose.base.yml -f docker-compose.prod.yml build
start-api: 
	(cd src/WebApi && \
	dotnet run --project Monocle.Api) & \

start-ui:
	(cd src/UI && \
	npm start)

