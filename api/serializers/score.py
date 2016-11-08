from rest_framework import serializers
from api.models.score import ScoreTypeTracker, StreakTracker


class StreakTrackerSerializer(serializers.ModelSerializer):

    class Meta:
        model = StreakTracker
        fields = ('maximum_streak', 'streak')


class ScoreTypeSerializer(serializers.ModelSerializer):
    assignment_type = serializers.SlugRelatedField(
        read_only=True,
        slug_field='type_name'
    )

    class Meta:
        model = ScoreTypeTracker
        fields = ('assignment_type', 'score', 'current_streak', 'maximum_streak')
