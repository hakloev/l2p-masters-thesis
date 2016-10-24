from rest_framework import serializers
from api.models.assignment import Assignment, AssignmentType


class AssignmentSerializer(serializers.ModelSerializer):

    assignment_type = serializers.SlugRelatedField(
        read_only=True,
        slug_field='type_name'
    )

    class Meta:
        model = Assignment


class AssignmentTypeSerializer(serializers.ModelSerializer):

    class Meta:
        model = AssignmentType
