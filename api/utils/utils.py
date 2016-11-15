from api.models.achievement import Achievement
from api.models.assignment import AssignmentType
from api.models.score import UserStreakTracker, AssignmentTypeScoreTracker


def achievement_no1(user):
    achievement = None
    if user.student.aggregated_score > 0:
        try:
            no1 = Achievement.objects.get(identifier_string="no1")
        except Achievement.DoesNotExist:
            return achievement
        if no1 not in user.student.achievements.all():
            achievement = no1
            user.student.achievements.add(achievement)
    return achievement


def achievement_streak_any_5(user):
    achievement = None
    if UserStreakTracker.objects.get(user=user).streak > 4:
        try:
            streak_5 = Achievement.objects.get(identifier_string="any_5")
        except Achievement.DoesNotExist:
            return achievement
        if streak_5 not in user.student.achievements.all():
            achievement = streak_5
            user.student.achievements.add(achievement)
    return achievement


def achievement_streak_category(user, assignment_type, achievement_identifier, limit):
    achievement = None
    assignment_type = AssignmentType.objects.get(type_name=assignment_type)
    if AssignmentTypeScoreTracker.objects.get(user=user, assignment_type=assignment_type).current_streak > limit:
        try:
            streak_5 = Achievement.objects.get(identifier_string=achievement_identifier)
        except Achievement.DoesNotExist:
            return achievement
        if streak_5 not in user.student.achievements.all():
            achievement = streak_5
            user.student.achievements.add(achievement)
    return achievement


# TODO: FIND A MORE CLEVER WAY TO GET NEW USER ACHIEVEMENTS AND ACHIEVEMENTS IN GENERAL
def check_for_new_achievements_for_user(user):
    """
    new_achievements is a list of None values and achievement objects.

    streak_categories achievements are a little more dynamical than other achievements, and can share
    the same achievement qualifier function.

    :argument user for which to check for new achievements.
    :returns a list of all new achievements for user
    """
    new_achievements = [
        achievement_no1(user),
        achievement_streak_any_5(user),
    ]

    streak_categories = [
        {"assignment_type": "Loops", "achievement_identifier": "loop_5", "limit": 4},
        {"assignment_type": "Functions", "achievement_identifier": "func_5", "limit": 4},
        {"assignment_type": "Control structures", "achievement_identifier": "if_5", "limit": 4},
    ]
    for streak_category in streak_categories:
        new_achievements.append(achievement_streak_category(
            user,
            **streak_category
        ))

    return [achievement for achievement in new_achievements if achievement]  # filter out all None elements
