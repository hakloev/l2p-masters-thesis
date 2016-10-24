from rest_framework import serializers
from api.models.user import Student


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = Student
        fields = (
            'id',
            'aggregated_score',
            'attempted_assignments',
            'achievements',
            'assignments_solved'
        )
