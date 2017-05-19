from rest_framework import serializers
from api.models.issue import Issue

from api.models.assignment import Assignment


class IssueSerializer(serializers.ModelSerializer):
    name = serializers.CharField(
        required=False
    )
    email = serializers.EmailField()
    issue = serializers.CharField()
    assignmentId = serializers.PrimaryKeyRelatedField(
        queryset=Assignment.objects.all(),
        required=False
    )

    def create(self, data):
        return Issue.objects.create(**data)

    class Meta:
        model = Issue
