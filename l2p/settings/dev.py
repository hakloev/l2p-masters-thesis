from l2p.settings.base import *

SECRET_KEY = 'sdfs%$234DSf2342'

DEBUG = True

ALLOWED_HOSTS = []

DATABASES = {
    # 'default': {
    #     'ENGINE': 'django.db.backends.postgresql_psycopg2',
    #     'NAME': 'l2p',
    #     'USER': 'learnpython',
    #     'PASSWORD': 'learnpython',
    #     'HOST': '',
    #     'PORT': '5432',
    # },
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': 'dev.db',
        'USER': '',
        'PASSWORD': '',
        'HOST': '',
        'PORT': '',
    },
}

WEBPACK_LOADER = {
    'DEFAULT': {
        'BUNDLE_DIR_NAME': 'dist/',
        'STATS_FILE': os.path.join(BASE_DIR, 'frontend', 'webpack-stats-dev.json'),
    }
}

#INSTALLED_APPS += (
#    'corsheaders',  # Enable CORS for dev
#)

JWT_AUTH = {
    'JWT_EXPIRATION_DELTA': datetime.timedelta(days=7),
    'JWT_ALLOW_REFRESH': True,
    'JWT_REFRESH_EXPIRATION_DELTA': datetime.timedelta(days=14),
}

CSRF_COOKIE_SECURE = False
CSRF_COOKIE_HTTPONLY = False
CORS_ORIGIN_ALLOW_ALL = True  # In order for React Frontend to do queries in dev-mode
