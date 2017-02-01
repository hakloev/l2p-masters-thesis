import logging
import random

from django.shortcuts import get_object_or_404

from rest_framework import generics
from rest_framework import permissions
from rest_framework import views
from rest_framework import viewsets
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from rest_framework.response import Response

from api.utils import utils
from api.utils.sandbox import DockerSandbox
from api.serializers.achievement import AchievementSerializer
from api.serializers.assignment import AssignmentSerializer, AssignmentTypeSerializer
from api.models.assignment import AssignmentType, Assignment, AssignmentSolvingAttempt
from api.models.score import UserStreakTracker, AssignmentTypeScoreTracker
from api.models.survey import ProgressSurvey


DISPLAY_PROGRESS_SURVEY = False


def get_new_assignment(user, assignment_type):
    log = logging.getLogger(__name__)

    # Get assignments solved by the user
    user_solved = AssignmentSolvingAttempt.objects.filter(
        user=user,
        correct_solution=True,
    ).values('assignment__id')

    # Get active assignments from the current assignment_type that is still unsolved
    result = Assignment.active_assignments.filter(
        assignment_types=assignment_type
    ).exclude(id__in=user_solved)

    if not result:
        log.debug('All assignments of type {} solved, returning random assignment'.format(assignment_type))
        return random.choice(Assignment.active_assignments.filter(
            assignment_types=assignment_type,
        ))

    log.debug('Found unsolved assignment of type {}'.format(assignment_type))
    return random.choice(result)


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
        if 'exam' in request.data['assignment_types']:
            self.log.debug('UserID {}: started with exam questions'.format(request.user))
            assignment_type = AssignmentType.objects.filter(type_name__startswith='Exam').first()
        else:
            self.log.debug('UserID {}: started with practice tasks'.format(request.user))
            assignment_types = request.data.get('assignment_types')
            if assignment_types is not None and not len(assignment_types):
                # Guarantee that there is a list of assignment types
                self.log.debug('No assignment types present in POST, using default')
                assignment_types = [a_type.id for a_type in AssignmentType.objects.all().exclude(type_name__startswith='Exam')]

            assignment_type_pk = int(random.choice(assignment_types))  # Choose a random assignment type
            assignment_type = AssignmentType.objects.get(pk=assignment_type_pk)

        assignment = get_new_assignment(request.user, assignment_type)
        self.log.debug('UserID {}: Sending back assignment {}'.format(request.user, assignment.id))

        # Serialize the assignment and return it
        return Response({
            'assignment': AssignmentSerializer(assignment).data,
        }, status=status.HTTP_200_OK)


class CompileCode(views.APIView):
    """
    POST-view to execute the posted Python code in a Docker container.
    Will return the output from the container.
    """
    log = logging.getLogger(__name__)
    permission_classes = (permissions.IsAuthenticated, )

    def post(self, request, format=None):
        self.log.debug('UserID {}: posted {}'.format(request.user, request.data))
        code = request.data['code']
        # TODO: Error handling for not supplying any code
        with DockerSandbox() as docker:
            result = docker.run(code, 'code.py')
            self.log.debug('DockerSandbox output {}'.format(result))

        return Response(result)


class SubmitCode(views.APIView):
    """
    Accept a POST-request that checks if the assignment is answered correctly.
    Return a new question within the users skill level and assignment-type-options
    """
    log = logging.getLogger(__name__)

    def post(self, request, format=None):
        self.log.debug('UserID {}: posted {}'.format(request.user, request.data))
        previous_assignment_pk = int(request.data.get('assignment_pk'))
        correct_answer = request.data.get('correct_answer')

        if 'exam' in request.data['assignment_types']:
            self.log.debug('UserID {}: requested next exam questions'.format(request.user))
            new_assignment_type = AssignmentType.objects.filter(type_name__startswith='Exam').first()
        else:
            assignment_types = request.data.get('assignment_types')
            if assignment_types is not None and not len(assignment_types):
                # Guarantee that there is a list of assignment types
                self.log.debug('No assignment types present in POST, using default')
                assignment_types = [a_type.id for a_type in AssignmentType.objects.all().exclude(type_name__startswith='Exam')]
            new_assignment_type = int(random.choice(assignment_types))  # Choose a random assignment type

        previous_assignment = get_object_or_404(Assignment, pk=previous_assignment_pk)

        AssignmentSolvingAttempt.objects.create(
            user=request.user,
            assignment=previous_assignment,
            correct_solution=correct_answer,
        )

        user_streak_tracker, created = UserStreakTracker.objects.get_or_create(user=request.user)

        # Get the score tracker for all assignment types registered on the previous assignment
        score_type_trackers = [AssignmentTypeScoreTracker.objects.get_or_create(
            user=request.user,
            assignment_type=assignment_type
        ) for assignment_type in previous_assignment.assignment_types.all()]

        if correct_answer:
            user_streak_tracker.streak += 1
            for score_type_tracker, created in score_type_trackers:
                score_type_tracker.current_streak += 1
                score_type_tracker.score += 1
                score_type_tracker.save()
            request.user.student.aggregated_score += 1
        else:
            user_streak_tracker.streak = 0
            for score_type_tracker, created in score_type_trackers:
                score_type_tracker.current_streak = 0
                score_type_tracker.save()

        request.user.student.attempted_assignments += 1
        request.user.student.save()
        user_streak_tracker.save()

        assignment = get_new_assignment(request.user, new_assignment_type)
        self.log.debug('UserID {}: Sending back assignment {}'.format(request.user, assignment.id))

        if DISPLAY_PROGRESS_SURVEY:
            # Check if the user should get survey about the software
            show_progress_survey = len(AssignmentSolvingAttempt.objects.filter(
                user=request.user,
                correct_solution=True,
            )) == 5 and not ProgressSurvey.objects.filter(user=request.user).exists()

        assignment_serialized = AssignmentSerializer(assignment)
        return Response({
            'assignment': assignment_serialized.data,
            'show_progress_survey': show_progress_survey if DISPLAY_PROGRESS_SURVEY else False
        }, status=status.HTTP_200_OK)


@api_view(['GET', ])
@permission_classes([IsAuthenticated, ])
def check_for_new_achievements(request):
    new_achievements = utils.check_for_new_achievements_for_user(request.user)
    new_achievements = [AchievementSerializer(achievement).data for achievement in new_achievements]

    return Response({
        'achievements': new_achievements
    }, status=status.HTTP_200_OK)


class AssignmentTypeViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    queryset = AssignmentType.objects.all()
    serializer_class = AssignmentTypeSerializer


class AssignmentViewSet(generics.ListAPIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    serializer_class = AssignmentSerializer
    queryset = Assignment.objects.all()
