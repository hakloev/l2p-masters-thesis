import logging
import random

from django.shortcuts import get_object_or_404

from rest_framework import generics
from rest_framework import viewsets
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.response import Response

from api.utils import utils
from api.utils.sandbox import DockerSandbox
from api.serializers.achievement import AchievementSerializer
from api.serializers.assignment import AssignmentSerializer, AssignmentTypeSerializer
from api.models.assignment import AssignmentType, Assignment, AssignmentSolvingAttempt
from api.models.score import UserStreakTracker, AssignmentTypeScoreTracker
from api.models.survey import ProgressSurvey

log = logging.getLogger(__name__)

DISPLAY_PROGRESS_SURVEY = False


def get_new_assignment(user, assignment_type):
    # Get assignments solved by the user
    if assignment_type.type_name == 'Experiment':
        # Ignore if the solution was True during experiments
        user_solved = AssignmentSolvingAttempt.objects.filter(
            user=user,
        ).values('assignment__id')
    else:
        user_solved = AssignmentSolvingAttempt.objects.filter(
            user=user,
            correct_solution=True,
        ).values('assignment__id')

    log.debug('{} has solved assignments: {}'.format(user, user_solved))

    # Get active assignments from the current assignment_type that is still unsolved
    result = Assignment.active_assignments.filter(
        assignment_types=assignment_type
    ).exclude(id__in=user_solved)
    log.debug('Available unsolved for {}: {}'.format(user, result))

    # If no unsolved assignments found for assignment type
    if not result:
        log.debug('{} has all assignments of type {} solved, returning random assignment'.format(user, assignment_type))
        return random.choice(Assignment.active_assignments.filter(
            assignment_types=assignment_type,
        ))

    # If assignment type is experiment
    if assignment_type.type_name == 'Experiment':
        log.debug('Sort result query set to return first possible experiment assignment')
        return result.order_by('difficulty_level').first()

    log.debug('Found unsolved assignment of type {} for {}'.format(assignment_type, user))
    return random.choice(result)


@api_view(('POST',))
def start_quiz(request, format=None):
    """
    Endpoint to return the initial question when starting a new quiz
    Return an assignment for the authenticated user given an assignment type

    Example payload: { assignment_types: ['experiment', 1, 2] }
    """
    if 'exam' in request.data['assignment_types']:
        log.debug('UserID {}: started with exam questions'.format(request.user))
        assignment_type = AssignmentType.objects.filter(type_name__startswith='Exam').first()
    elif 'experiment' in request.data['assignment_types']:
        log.debug('UserID {}: started experiment'.format(request.user))
        assignment_type = AssignmentType.objects.get(type_name='Experiment')
    else:
        log.debug('UserID {}: started with practice tasks'.format(request.user))
        assignment_types = request.data.get('assignment_types')
        if assignment_types is not None and not len(assignment_types):
            # Guarantee that there is a list of assignment types
            log.debug('No assignment types present in POST, using default')
            assignment_types = [a_type.id for a_type in AssignmentType.objects.all().exclude(type_name__startswith='Exam')]

        assignment_type_pk = int(random.choice(assignment_types))  # Choose a random assignment type
        assignment_type = AssignmentType.objects.get(pk=assignment_type_pk)

    assignment = get_new_assignment(request.user, assignment_type)
    log.debug('UserID {}: Sending back assignment {}'.format(request.user, assignment.id))

    # Serialize the assignment and return it
    assignment_serialized = AssignmentSerializer(assignment)
    return Response({
        'assignment': assignment_serialized.data,
    }, status=status.HTTP_200_OK)


@api_view(('POST',))
def submit_code_for_assignment(request, format=None):
    """
    Endpoint to POST an assignment solution, and then register the attempt.
    Will return a new question from the assignment type options
    """

    log.debug('UserID {}: posted {}'.format(request.user, request.data))
    previous_assignment_pk = int(request.data.get('assignment_pk'))
    correct_answer = request.data.get('correct_answer')

    if 'exam' in request.data['assignment_types']:
        log.debug('UserID {}: requested next exam questions'.format(request.user))
        new_assignment_type = AssignmentType.objects.filter(type_name__startswith='Exam').first()
    elif 'experiment' in request.data['assignment_types']:
        log.debug('UserID {}: requested next experiment question'.format(request.user))
        new_assignment_type = AssignmentType.objects.get(type_name='Experiment')
    else:
        assignment_types = request.data.get('assignment_types')
        if assignment_types is not None and not len(assignment_types):
            # Guarantee that there is a list of assignment types
            log.debug('No assignment types present in POST, using default')
            assignment_types = [
                a_type for a_type in AssignmentType.objects.all().exclude(type_name__startswith='Exam')
            ]
        new_assignment_type_pk = random.choice(assignment_types)  # Choose a random assignment type
        new_assignment_type = AssignmentType.objects.get(pk=new_assignment_type_pk)

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
    log.debug('UserID {}: Sending back assignment {}'.format(request.user, assignment.id))

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


@api_view(('POST',))
def compile_code(request, format=None):
    """
    View to execute the code within a Docker-container.
    Will always return the output from the container.
    """
    log.debug('UserID {}: posted {}'.format(request.user, request.data))
    user_code = request.data['code']
    # TODO: Error handling for not supplying any code

    with DockerSandbox() as docker:
        result = docker.run(user_code, 'code.py')
        log.debug('DockerSandbox output {}'.format(result))

    return Response(result, status=status.HTTP_200_OK)


@api_view(('GET',))
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
