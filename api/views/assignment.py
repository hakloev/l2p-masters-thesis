import logging
import random

from django.shortcuts import get_object_or_404

from rest_framework import generics
from rest_framework import permissions
from rest_framework import views
from rest_framework import viewsets
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from rest_framework.response import Response

from api.utils import utils
from api.serializers.achievement import AchievementSerializer
from api.utils.sandbox import DockerSandbox
from api.models.assignment import AssignmentType, Assignment
from api.serializers.assignment import AssignmentSerializer, AssignmentTypeSerializer
from api.models.score import ScoreTypeTracker, SkillTypeLevel, StreakTracker


class GetAssignment(views.APIView):
    """
    POST-view to get a assignment for a user
    POST for Javascript fetch to accept body

    * Requires authentication
    """
    log = logging.getLogger(__name__)
    permission_classes = (permissions.IsAuthenticated, )

    def post(self, request, format=None):
        """
        Return an custom assignment for the authenticated user
        """
        assignment_types = request.data.get('assignment_types')
        if assignment_types is not None and not len(assignment_types):
            # Guarantee that there is a list of assignment types
            assignment_types = [a_type.id for a_type in AssignmentType.objects.all()]
        self.log.debug('User %s starting with the following assignment types: %s' % (request.user, assignment_types))

        assignment_type_pk = int(random.choice(assignment_types))  # Choose a random assignment type
        assignment_type = AssignmentType.objects.get(pk=assignment_type_pk)

        # Get an assignment
        assignment = random.choice(Assignment.active_assignments.filter(
            assignment_type=assignment_type
        ))

        # Serialize the assignment and return it
        return Response({
            'assignment': AssignmentSerializer(assignment).data,
        })


class CompileCode(views.APIView):
    """
    POST-view to execute the posted Python code in a Docker container.
    Will return the output from the container.
    """
    log = logging.getLogger(__name__)
    permission_classes = (permissions.IsAuthenticated, )

    def post(self, request, format=None):
        code = request.data['code']
        # TODO: Error handling for not supplying any code
        user = request.user.id
        self.log.debug('Executing code for user: %s' % user)
        with DockerSandbox() as docker:
            result = docker.run(code, 'code_%s.py' % user)
            self.log.debug('Get result %s' % result)

        return Response(result)


class SubmitCode(views.APIView):
    """
    Accept a POST-request that checks if the assignment is answered correctly.
    Return a new question within the users skill level and assignment-type-options
    """
    log = logging.getLogger(__name__)

    def post(self, request, format=None):
        previous_assignment_pk = int(request.data.get('assignment_pk'))
        correct_answer = request.data.get('correct_answer')
        assignment_types = request.data.get('assignment_types')
        if assignment_types is not None and not len(assignment_types):
            # Guarantee that there is a list of assignment types
            assignment_types = [a_type.id for a_type in AssignmentType.objects.all()]
        new_assignment_type = int(random.choice(assignment_types))  # Choose a random assignment type

        self.log.debug('User %s submitted code for assignment %i. The answer was %s' % (request.user,
                                                                                   previous_assignment_pk,
                                                                                   correct_answer))

        previous_assignment = get_object_or_404(Assignment, pk=previous_assignment_pk)

        user_streak_tracker = StreakTracker.objects.get(user=request.user)
        score_type_tracker, created = ScoreTypeTracker.objects.get_or_create(
            user=request.user,
            assignment_type=previous_assignment.assignment_type
        )

        if correct_answer:
            user_streak_tracker.streak += 1
            score_type_tracker.current_streak += 1
            score_type_tracker.score += 1
            request.user.student.aggregated_score += 1
            request.user.student.assignments_solved.add(previous_assignment)
        else:
            user_streak_tracker.streak = 0
            score_type_tracker.current_streak = 0

        request.user.student.attempted_assignments += 1
        request.user.student.save()
        user_streak_tracker.save()
        score_type_tracker.save()

        assignment = random.choice(Assignment.active_assignments.filter(
            assignment_type=new_assignment_type
        ))

        assignment_serialized = AssignmentSerializer(assignment)
        return Response({
            'assignment': assignment_serialized.data,
        })


@api_view(['GET', ])
@permission_classes([IsAuthenticated, ])
def check_for_new_achievements(request):
    new_achievements = utils.check_for_new_achievements_for_user(request.user)
    new_achievements = [AchievementSerializer(achievement).data for achievement in new_achievements]

    return Response({
        'achievements': new_achievements
    })


class AssignmentTypeViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    queryset = AssignmentType.objects.all()
    serializer_class = AssignmentTypeSerializer


class AssignmentViewSet(generics.ListAPIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    serializer_class = AssignmentSerializer
    queryset = Assignment.objects.all()
