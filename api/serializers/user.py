from django.contrib.auth.models import User
from rest_framework import serializers
from api.models.user import Student


class StudentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Student
        fields = (
            'id',
            'aggregated_score',
            'attempted_assignments',
            'achievements',
            'assignments_solved'
        )


class RegistrationSerializer(serializers.ModelSerializer):

    def create(self, validated_data):
        user = User(
            username=validated_data['username']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

    class Meta:
        model = User
        lookup_field = 'username'
        write_only_fields = ('password',)
