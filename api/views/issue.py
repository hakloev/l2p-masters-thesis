from rest_framework import views
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.core.mail import send_mail

from api.models.issue import Issue
from api.serializers.issue import IssueSerializer


class IssueViewSet(views.APIView):
    permission_classes = (IsAuthenticated,)
    queryset = Issue.objects.all()
    serializer_class = IssueSerializer

    def post(self, request):
        serializer = IssueSerializer(data=request.data)
        if 'name' not in request.data:
            request.data['name'] = 'Anonymous'
        if 'issue' not in request.data:
            return Response({'Issue': request.data['name']}, status=204)
        serializer.is_valid(self)
        serializer.save()
        self.send_issue_email(request)
        return Response({'Issue': request.data['name']})

    def send_issue_email(self, request):
        send_mail(
            request.data['name'] + ' (' + str(request.user) + ')' + ' posted a general issue',
            request.data['issue'],
            'post@post.no',
            ['fredrik.c.berg1@gmail.com']
        )


