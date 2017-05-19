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
    # Make email required as well
    email = serializers.EmailField(
        required=True,
    )
    # Add attendSurvey to the serializer
    attendSurvey = serializers.BooleanField(
        required=False,
        default=False,
    )

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
        )
        user.set_password(validated_data['password'])
        user.student.attend_survey = validated_data['attendSurvey']
        user.save()
        return user

    class Meta:
        model = User
        lookup_field = 'username'
        write_only_fields = ('password',)
