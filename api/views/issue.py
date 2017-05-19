import logging
from django.conf import settings
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.core.mail import send_mail
from smtplib import SMTPException

from api.serializers.issue import IssueSerializer

log = logging.getLogger(__name__)


def send_issue_email(request):
    recipients = list(email for name, email in settings.ADMINS)
    message = 'The following issue was posted by the user:\n\n{content}'.format(
        content=request.data['issue']
    )

    if 'assignmentId' in request.data:
        subject = '{name} ({user}) posted an issue for assignment {id}'.format(
            name=request.data['name'],
            user=request.user.username,
            id=request.data['assignmentId']
        )
    else:
        subject = '{name} ({user}) posted an general issue'.format(
            name=request.data['name'],
            user=request.user.username,
        )

    try:
        log.debug('Sending mail to {}'.format(recipients))
        send_mail(
            subject,
            message,
            'issue@learnpython.no',
            recipients
        )
        log.debug('Sent issue mail from {user} to {recipients}'.format(
            user=request.user.username,
            recipients=recipients,
        ))
    except SMTPException as e:
        log.debug('Unable to send email for issue from {user}'.format(
            user=request.user.username,
        ))
        log.debug(message)


@api_view(('POST',))
def add_new_issue(request, format=None):
    """
    View to POST general issue or for a specific task. Keep in mind that Django
    send_mail is blocking. Should probably change to asynchronous mail sending.
    """
    log.debug('Issue request from {}: {}'.format(request.user, request.data))
    serializer = IssueSerializer(data=request.data)

    if not serializer.is_valid():
        log.debug('Unable to create issue with the provided data')
        log.debug(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    serializer.save()

    if 'name' not in request.data:
        request.data['name'] = 'Anonymous'

    send_issue_email(request)

    return Response(serializer.data, status=status.HTTP_201_CREATED)
