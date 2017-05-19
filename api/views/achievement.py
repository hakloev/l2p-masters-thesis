from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from api.models.user import Student
from api.serializers.achievement import AchievementSerializer


class UserAchievementListView(generics.ListAPIView):
    serializer_class = AchievementSerializer

    def get_queryset(self):
        """
        This view should return a list of all achievements
        for the current authenticated user
        """
        user = self.request.user
        return Student.objects.get(user=user).achievements
