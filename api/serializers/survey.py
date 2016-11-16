from rest_framework import serializers
from api.models.survey import ProgressSurvey


class ProgressSurveySerializer(serializers.ModelSerializer):

    class Meta:
        model = ProgressSurvey
        fields = '__all__'