from rest_framework import generics, views, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from api.models.assignment import AssignmentType
from api.models.score import ScoreTypeTracker, StreakTracker
from api.serializers.score import ScoreTypeSerializer, StreakTrackerSerializer


class UserStreakListView(views.APIView):
    """
    Return the user skill levels for all assignment types
    """
    permission_classes = (IsAuthenticated,)
    serializer_class = StreakTrackerSerializer

    def get(self, request):
        streak = StreakTracker.objects.filter(user=request.user).first()
        if not streak:
            return Response({}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(StreakTrackerSerializer(streak).data, status=status.HTTP_200_OK)


class UserScoreListView(generics.ListAPIView):
    """
    Return the user score for all assignment types
    """
    permission_classes = (IsAuthenticated,)
    serializer_class = ScoreTypeSerializer

    def get_queryset(self):
        assignment_types = AssignmentType.objects.all()

        user_assignment_scores = []

        for assignment_type in assignment_types:
            score_type_tracker, created = ScoreTypeTracker.objects.get_or_create(
                user=self.request.user,
                assignment_type=assignment_type
            )
            user_assignment_scores.append(score_type_tracker)

        return user_assignment_scores
