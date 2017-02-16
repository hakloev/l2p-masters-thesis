import sys
import os
import random
from django.contrib.auth import authenticate, get_user_model

"""
In order to run this script successfully, it must be executed with the Python-interpreter within the
virtualenv used for the project. Also the settings module below must be set to the correct one.
"""

if __name__ == "__main__":
    sys.path.append('../l2p')
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "l2p.settings.dev")
    import django
    django.setup()

User = get_user_model()

GROUPS = 3
PARTICIPANTS_FROM_GROUP = 10
users = []


def generate_user_id():
    id = ""
    for x in range(3):
        id += chr(random.randint(65, 90))
    return id


def generate_user_password():
    password = ""
    for x in range(1, 6):
        if x % 2 == 0:
            password += chr(random.randint(97, 122))  # Random character from a to z
        else:
            password += chr(random.randint(49, 57))  # Random digit
    return password


for group in range(1, GROUPS + 1):
    for participant_id in range(1, PARTICIPANTS_FROM_GROUP + 1):
        username = '{}{:02d}-{}'.format(group, participant_id, generate_user_id())
        password = generate_user_password()
        print('User {} with password: {}'.format(username, password))

        try:
            print('\t Creating user in Django')
            user = User.objects.create_user(username=username)
            user.set_password(password)
            user.save()

            assert authenticate(username=username, password=password)
            print('\t User {} successfully created'.format(username))

            users.append({
                'username': username,
                'password': password,
            })
        except:
            print('\t Unable to create user {}. Error: {}'.format(username, sys.exc_info()[1]))

with open('./scripts/users.txt', 'w+') as f:
    for user in users:
        f.write('{} - {}\n'.format(user['username'], user['password']))

print('---- DONE')
