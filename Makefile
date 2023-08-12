dev:
	docker compose up -d

production:
	docker compose -f docker-compose-production.yml up -d

stop:
	docker compose down