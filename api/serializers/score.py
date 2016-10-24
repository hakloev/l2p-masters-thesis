from rest_framework import serializers
from api.models.score import ScoreTypeTracker, SkillTypeLevel


class SkillTypeSerializer(serializers.ModelSerializer):
    assignment_type = serializers.SlugRelatedField(
        read_only=True,
        slug_field='type_name'
    )

    class Meta:
        model = SkillTypeLevel
        fields = ('assignment_type', 'skill_level', 'this_level_wrong', 'this_level_correct')


class ScoreTypeSerializer(serializers.ModelSerializer):
    assignment_type = serializers.SlugRelatedField(
        read_only=True,
        slug_field='type_name'
    )

    class Meta:
        model = ScoreTypeTracker
        fields = ('assignment_type', 'score', 'current_streak', 'maximum_streak')
