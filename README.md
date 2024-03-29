# l2p-masters-thesis

This code is the artifact created during our master's thesis. The artifact was used to perform an experiment during the latter phase of the thesis. Below, there is a simple description on how to start a development version of the system.

## Development

### Requirements:

* [NodeJS](https://nodejs.org) v. 7.1.0 or newer
* [Docker Community Edition](https://www.docker.com/community-edition)
* [Python 3.5](https://www.python.org/downloads/) 

**NB:** The application requires [Docker](https://www.docker.com/community-edition) to be installed for one of the following commands (`make pull-docker-images`) to work. Additionaly, the code execution in the web-application also requires Docker.

**Frontend** *(done within the `frontend`-folder)*:
```bash
# Done in a separate terminal window/session
# yarn or npm is needed to install the npm-packages
# npm install -g yarn
yarn install or npm install # Downloads the required npm-packages
npm run dev-server # Starts the webpack-dev-server on port 3000
```
---

**Backend**:
```bash
# Done in a separate terminal window/session
export DJANGO_SETTINGS_MODULE=l2p.settings.development # Export the Django-settings file to the PATH-variable
make env # Creates the virtual environment for Python, only required to do once
make pull-docker-images # Optional if the images are pulled already
make development # Install all development dependencies to the virtual environment
make migrate # Apply initialy and/or if new migrations are available
make load-fixtures # If not previously loaded, this will populate the SQLite datebase
make superuser # Creates a superuser for the Django-application
make run # Starts the server on port 8000
```

Alternatively, if it is the first time you start the development version of the application:

```bash
export DJANGO_SETTINGS_MODULE=l2p.settings.development
make init # Executes pull-docker-images env development migrate load-fixtures (in that order)
make superuser
make run
```

## Authors

[Fredrik Berg](https://github.com/Bergalerga) and [Håkon Løvdal](https://github.com/hakloev/)
