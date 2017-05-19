from rest_framework import serializers
from api.models.assignment import Assignment, AssignmentType


class AssignmentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Assignment


class AssignmentTypeSerializer(serializers.ModelSerializer):

    class Meta:
        model = AssignmentType
