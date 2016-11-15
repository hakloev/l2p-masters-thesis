from rest_framework import generics, views, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from api.models.score import UserStreakTracker, AssignmentTypeScoreTracker, AssignmentType
from api.serializers.score import UserStreakTrackerSerializer, AssignmentTypeScoreTrackerSerializer


class UserStreakView(views.APIView):
    permission_classes = (IsAuthenticated, )

    def get(self, request, format=None, **kwargs):
        user_streaks, created_user_streak = UserStreakTracker.objects.get_or_create(user=request.user)
        assignment_type_streaks = AssignmentTypeScoreTracker.objects.filter(user=request.user)

        # Create if not existing; applies to old users
        if not assignment_type_streaks:
            assignment_types = AssignmentType.objects.all()

            assignment_type_streaks = []

            for assignment_type in assignment_types:
                score_type_tracker, created = AssignmentTypeScoreTracker.objects.get_or_create(
                    user=request.user,
                    assignment_type=assignment_type
                )
                assignment_type_streaks.append(score_type_tracker)

        return Response({
            'user_streak': UserStreakTrackerSerializer(
                user_streaks
            ).data if user_streaks else {},
            'assignment_type_streaks': AssignmentTypeScoreTrackerSerializer(
                assignment_type_streaks,
                many=True
            ).data if assignment_type_streaks else {},
        }, status=status.HTTP_200_OK)
