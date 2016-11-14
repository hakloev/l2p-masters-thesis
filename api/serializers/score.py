from rest_framework import serializers
from api.models.score import UserStreakTracker, AssignmentTypeScoreTracker


class UserStreakTrackerSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserStreakTracker
        fields = ('maximum_streak', 'streak')


class AssignmentTypeScoreTrackerSerializer(serializers.ModelSerializer):

    class Meta:
        model = AssignmentTypeScoreTracker
        fields = ('assignment_type', 'score', 'current_streak', 'maximum_streak')

