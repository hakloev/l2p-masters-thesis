from rest_framework import generics
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from api.models.assignment import AssignmentType
from api.models.score import ScoreTypeTracker, SkillTypeLevel
from api.serializers.score import ScoreTypeSerializer, SkillTypeSerializer


class UserSkillsListView(generics.ListAPIView):
    """
    Return the user skill levels for all assignment types
    """
    permission_classes = (IsAuthenticated,)
    serializer_class = SkillTypeSerializer

    def get_queryset(self):
        assignment_types = AssignmentType.objects.all()

        user_skill_levels = []

        for assignment_type in assignment_types:
            skill_type_tracker, created = SkillTypeLevel.objects.get_or_create(
                user=self.request.user,
                assignment_type=assignment_type
            )
            user_skill_levels.append(skill_type_tracker)

        return user_skill_levels


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
