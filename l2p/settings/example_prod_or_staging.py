import datetime

from l2p.settings.base import *

SECRET_KEY = 'super secret key'

DEBUG = False

ADMINS = (
    ('Håkon Ødegård Løvdal', 'post@email.com'),
    ('Fredrik Christoffer Berg', 'post@email.com'),
)

SERVER_EMAIL = 'learnpython@localhost'

ALLOWED_HOSTS = ['hakloev.no']

SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
CSRF_COOKIE_HTTPONLY = True
X_FRAME_OPTIONS = 'DENY'


JWT_AUTH = {
    'JWT_EXPIRATION_DELTA': datetime.timedelta(days=1),  # 30 minutes
}

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'db_name',
        'USER': 'db_user',
        'PASSWORD': 'db_password',
        'HOST': 'localhost',
        'PORT': '5432',
    },
    #'default': {
        #'ENGINE': 'django.db.backends.sqlite3',
        #'NAME': 'db.db',
        #'USER': '',
        #'PASSWORD': '',
        #'HOST': '',
        #'PORT': '',
    #},
}

if not DEBUG:
    WEBPACK_LOADER = {
        'DEFAULT': {
            'BUNDLE_DIR_NAME': 'dist/',
            'STATS_FILE': os.path.join(BASE_DIR, 'frontend', 'webpack-stats-prod.json'),
        }
    }
