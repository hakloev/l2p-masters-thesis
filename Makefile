ENV=./env/bin
SHELL := /bin/bash
PYTHON=$(ENV)/python
PIP=$(ENV)/pip
MANAGE=$(PYTHON) manage.py

pull-docker-images:
	cat ./docker-images.txt | xargs -I images docker pull images

migrate:
	$(MANAGE) migrate

make-migrations:
	$(MANAGE) makemigrations	

load-fixtures:
	$(MANAGE) loaddata ./fixtures/achievements.json
	$(MANAGE) loaddata ./fixtures/assignments.json

superuser:
	$(MANAGE) createsuperuser

collect-static:
	mkdir -p static
	$(MANAGE) collectstatic --no-input

development:
	$(PIP) install -r py-requirements/development.txt --upgrade

staging:
	$(PIP) install -r py-requirements/staging.txt --upgrade

production:
	$(PIP) install -r py-requirements/production.txt --upgrade

env:
	virtualenv -p `which python3` env

delete-env:
	rm -rf ./env

run:
	$(MANAGE) runserver 0.0.0.0:8000
