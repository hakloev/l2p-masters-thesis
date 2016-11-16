from rest_framework import views, viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from api.models.survey import ProgressSurvey
from api.serializers.survey import ProgressSurveySerializer


class ProgressSurveyViewSet(viewsets.ViewSet):
    permission_classes = (IsAuthenticated, )

    def list(self, request):
        queryset = ProgressSurvey.objects.all()
        serializer = ProgressSurveySerializer(queryset, many=True)
        return Response(serializer.data)

    def create(self, request):
        request.data['user'] = request.user.id
        serializer = ProgressSurveySerializer(data=request.data)

        if serializer.is_valid():
            survey = serializer.create(serializer.validated_data)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
