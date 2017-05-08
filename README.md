# l2p-masters-thesis

## Development

```bash
export DJANGO_SETTINGS_MODULE=l2p.settings.dev
make env
make pull-docker-images
make development
make migrate
make load-fixtures
make superuser
make run
```
