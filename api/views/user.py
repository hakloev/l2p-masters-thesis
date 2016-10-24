import math

from django.contrib.auth import authenticate, login as django_login, logout as django_logout
from django.contrib.auth.decorators import login_required
from django.db.models import Avg
from django.http import HttpResponseRedirect
from django.shortcuts import render

from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from api.serializers.user import UserSerializer
from api.models.user import Student
from api.models.assignment import AssignmentType
from api.models.score import ScoreTypeTracker, SkillTypeLevel


class UserViewSet(viewsets.ReadOnlyModelViewSet):

    permission_classes = (IsAuthenticated, )
    queryset = Student.objects.all()
    serializer_class = UserSerializer
