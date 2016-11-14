from rest_framework import generics, views, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from api.models.score import UserStreakTracker, AssignmentTypeScoreTracker
from api.serializers.score import UserStreakTrackerSerializer, AssignmentTypeScoreTrackerSerializer


class UserStreakView(views.APIView):
    permission_classes = (IsAuthenticated, )

    def get(self, request, format=None, **kwargs):
        user_streaks = UserStreakTracker.objects.filter(user=request.user)
        assignment_type_streaks = AssignmentTypeScoreTracker.objects.filter(user=request.user)

        return Response({
            'user_streaks': UserStreakTrackerSerializer(
                user_streaks, many=True
            ).data if user_streaks else {},
            'assignment_type_streaks': AssignmentTypeScoreTrackerSerializer(
                assignment_type_streaks,
                many=True
            ).data if assignment_type_streaks else {},
        }, status=status.HTTP_200_OK)
