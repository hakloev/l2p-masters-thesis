from rest_framework import serializers
from api.models.issue import Issue

from api.models.assignment import Assignment


class IssueSerializer(serializers.ModelSerializer):

    class Meta:
        model = Issue

    name = serializers.CharField()
    email = serializers.EmailField()
    issue = serializers.CharField()
    assignmentId = serializers.PrimaryKeyRelatedField(
        queryset=Assignment.objects.all(), required=False)

    def create(self, data):
        return Issue.objects.create(**data)
