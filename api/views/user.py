import logging

from rest_framework.response import Response
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics
from rest_framework import status

from rest_framework_jwt.settings import api_settings

from api.serializers.user import StudentSerializer, RegistrationSerializer
from api.models.user import Student

log = logging.getLogger(__name__)


def create_token_for_user(user):
    jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
    jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

    payload = jwt_payload_handler(user)
    token = jwt_encode_handler(payload)

    return token


class StudentViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer


class RegistrationView(generics.CreateAPIView):
    """
    Endpoint that creates a user
    """
    serializer_class = RegistrationSerializer

    def post(self, request):
        log.debug('User creation requested')
        serializer = RegistrationSerializer(data=request.data)

        if not serializer.is_valid():
            log.debug('Unable to create user with the provided data')
            log.debug(serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        user = serializer.save()

        log.info('User %s created succesfully' % user.username)
        token = create_token_for_user(user)

        if token:
            return Response({
                'token': token
            }, status=status.HTTP_201_CREATED)
        return Response(user.username, status=status.HTTP_201_CREATED)
