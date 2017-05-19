# l2p-masters-thesis

This code is the artifact created during our master's thesis. The artifact was used to perform an experiment during the latter phase of the thesis. Below, there is a simple description on how to start a development version of the system.

## Development

**Frontend** *(done within the `frontend`-folder)*:
```bash
# Done in a separate terminal window/session
yarn install # Downloads the required npm-packages
npm run dev-server # Starts the webpack-dev-server on port 3000
```

**Backend**:
```bash
# Done in a separate terminal window/session
export DJANGO_SETTINGS_MODULE=l2p.settings.dev # Export the Django-settings file to the PATH-variable
make env # Creates the virtual environment for Python, only required to do once
make pull-docker-images # Optional if the images are already pulled
make development # Installs all development dependencies to the virtual environment
make migrate # Apply initialy, and if new migrations are available
make load-fixtures # If not previously loaded, this will populate the SQLite datebase
make superuser # Creates a superuser for the Django-application
make run # Starts the server on port 8000
```
