dev:
	docker compose up -d

production:
	docker compose -f docker-compose-production.yml up -d

production-build:
	docker compose -f docker-compose-production.yml up -d --build

test:
	docker compose -f docker-compose-test.yml up --build

stop:
	docker compose down
