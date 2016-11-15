import uuid

from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver

from api.models.assignment import AssignmentType
from api.models.user import User


MAX_LEVEL = 3


class UserStreakTracker(models.Model):
    """
    Keep track of the current streak of correct answers that the user
    has provided in a row.
    """
    user = models.ForeignKey(User)
    streak = models.IntegerField(default=0)
    maximum_streak = models.IntegerField(default=0)

    def __str__(self):
        return "Streak for {user}: {streak}/{max_streak} ".format(user=self.user, streak=self.streak, max_streak=self.maximum_streak)

    def save(self, *args, **kwargs):
        if self.streak > self.maximum_streak:
            self.maximum_streak = self.streak
        super().save(*args, **kwargs)

    class Meta:
        verbose_name = 'User Streak Tracker'
        verbose_name_plural = 'User Streak Trackers'


@receiver(post_save, sender=User, dispatch_uid=uuid.uuid1())
def update_streak_tracker_user(sender, instance, created, **kwargs):
    if created:
        print('test')
        streak_tracker = UserStreakTracker(user=instance)
        streak_tracker.save()


class AssignmentTypeScoreTracker(models.Model):
    """
    Keep track of the score that a user has for a given assignment type, and
    the current streak of correct answers to that assignment type
    """
    score = models.IntegerField(default=0)
    assignment_type = models.ForeignKey(AssignmentType)
    user = models.ForeignKey(User)
    current_streak = models.IntegerField(default=0)
    maximum_streak = models.IntegerField(default=0)

    def __str__(self):
        return "Streak in {assignment_type} for {user}: {current_streak}".format(
            user=self.user,
            current_streak=self.current_streak,
            assignment_type=self.assignment_type
        )

    def save(self, *args, **kwargs):
        if self.current_streak > self.maximum_streak:
            self.maximum_streak = self.current_streak
        super().save(*args, **kwargs)

    class Meta:
        verbose_name = 'Assignment Type Score Tracker'
        verbose_name_plural = 'Assignment Type Score Trackers'


@receiver(post_save, sender=User, dispatch_uid=uuid.uuid1())
def update_streak_tracker_user(sender, instance, created, **kwargs):
    if created:
        assignment_types = AssignmentType.objects.all()

        for assignment_type in assignment_types:
            score_type_tracker, created_tracker = AssignmentTypeScoreTracker.objects.get_or_create(
                user=instance,
                assignment_type=assignment_type
            )
            if created_tracker:
                score_type_tracker.save()
