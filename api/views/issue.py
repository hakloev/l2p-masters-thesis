import logging
from django.conf import settings
from rest_framework import views, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.core.mail import send_mail
from smtplib import SMTPException

from api.models.issue import Issue
from api.serializers.issue import IssueSerializer


class IssueViewSet(views.APIView):
    permission_classes = (IsAuthenticated,)
    queryset = Issue.objects.all()
    serializer_class = IssueSerializer

    log = logging.getLogger(__name__)

    def post(self, request):
        self.log.debug('Issue request from %s' % request.user)
        serializer = IssueSerializer(data=request.data)
        if 'name' not in request.data:
            request.data['name'] = 'Anonymous'
        if 'issue' not in request.data:
            return Response({}, status=status.HTTP_400_BAD_REQUEST)

        serializer.is_valid(self)
        serializer.save()
        self.send_issue_email(request)
        return Response({'issue': 'created'}, status=status.HTTP_200_OK)

    def send_issue_email(self, request):
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
            send_mail(
                subject,
                message,
                'issue@learnpython.no',
                recipients
            )
            self.log.debug('Sent issue mail from {user} to {recipients}'.format(
                user=request.user.username,
                recipients=recipients,
            ))
        except SMTPException as e:
            self.log.debug('Unable to send email for issue from {user}'.format(
                user=request.user.username,
            ))
            self.log.debug(message)


