.PHONY: up up-prod up-local down build build-local build-prod start-api start-ui start
CONN='Host=localhost;Port=5432;Username=postgres;Password=mypgdbpass;Database=monocle'
EF-PROJECT=src/WebApi/Monocle.Api
up-prod:
	docker compose -f docker-compose.base.yml -f docker-compose.prod.yml up
up:
	docker compose -f docker-compose.base.yml -f docker-compose.local.yml up -d
stop:
	docker compose -f docker-compose.base.yml -f docker-compose.local.yml stop 
down:
	docker compose -f docker-compose.base.yml -f docker-compose.local.yml down
build:
	docker compose -f docker-compose.base.yml -f docker-compose.local.yml build
build-prod:
	docker compose -f docker-compose.base.yml -f docker-compose.prod.yml build
ef:
	dotnet ef database $(command) -p $(EF-PROJECT) -- --conn $(CONN)
ef-migrations-add:
	dotnet ef migrations add $(name) -p $(EF-PROJECT) -- --conn $(CONN)
ef-migrations-remove:
	dotnet ef migrations remove -p $(EF-PROJECT) -- --conn $(CONN)
ef-migrations-script:
	dotnet ef migrations script $(name) -p $(EF-PROJECT) -o $(EF-PROJECT)/Migrations/Sql/$(name).sql --idempotent -- --conn $(CONN)
