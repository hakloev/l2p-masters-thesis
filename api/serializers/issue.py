from rest_framework import serializers
from api.models.issue import Issue


class IssueSerializer(serializers.ModelSerializer):

    class Meta:
        model = Issue

    name = serializers.CharField()
    email = serializers.EmailField()
    issue = serializers.CharField()

    def create(self, data):
        return Issue.objects.create(**data)
