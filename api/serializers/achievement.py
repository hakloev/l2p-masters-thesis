from rest_framework import serializers
from api.models.achievement import Achievement


class AchievementSerializer(serializers.ModelSerializer):

    class Meta:
        model = Achievement
