# l2p-masters-thesis

## Development

```bash
export DJANGO_SETTINGS_MODULE=l2p.settings.dev
make env # creates the virtual environment for python
make pull-docker-images # optional if images already pulled
make development # installs all development dependencies
make migrate # if new migrations are available
make load-fixtures # if not previously loaded into the datebase
make superuser # creates a superuser
make run # starts server on port 8000
```
