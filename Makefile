COMPOSE_LOCAL := docker-compose.yml

build-loc:
	docker compose -f $(COMPOSE_LOCAL) build

up:
	docker compose -f $(COMPOSE_LOCAL) up

up-d:
	docker compose -f $(COMPOSE_LOCAL) up -d

loc:
	@make build-loc
	@make up

loc-d:
	@make build-loc
	@make up-d

down:
	docker compose -f $(COMPOSE_LOCAL) down


cleanup:
	- docker rm -f `docker ps -aq`
	docker system prune -af
	
# backend
exec:
	docker compose -f $(COMPOSE_LOCAL) exec -it api-django bash

makemigrations:
	docker compose -f $(COMPOSE_LOCAL) exec -it api-django bash -c "python manage.py makemigrations"

migrate:
	docker compose -f $(COMPOSE_LOCAL) exec -it api-django bash -c "python manage.py migrate"

createsuperuser:
	docker compose -f $(COMPOSE_LOCAL) exec -it api-django bash -c "python manage.py createsuperuser"

# frontend
front-exec :
	docker compose -f $(COMPOSE_LOCAL) exec -it react bash

start :
	docker compose -f $(COMPOSE_LOCAL) exec -it react npm start


