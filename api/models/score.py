from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver

from api.models.assignment import AssignmentType
from api.models.user import User


MAX_LEVEL = 3


class StreakTracker(models.Model):
    """
    Keep track of the current streak of correct answers that the user
    has provided in a row.
    """
    user = models.ForeignKey(User)
    streak = models.IntegerField(default=0)
    maximum_streak = models.IntegerField(default=0)

    def __str__(self):
        return "Current overall streak for {user}: {streak} ".format(user=self.user, streak=self.streak)

    def save(self, *args, **kwargs):
        if self.streak > self.maximum_streak:
            self.maximum_streak = self.streak
        super().save(*args, **kwargs)


@receiver(post_save, sender=User, dispatch_uid="update_streaktracker_user")
def update_streak_tracker_user(sender, instance, created, **kwargs):
    if created:
        streak_tracker = StreakTracker(user=instance)
        streak_tracker.save()


class SkillTypeLevel(models.Model):
    """
    Keep track of what skill level the user has for each assignment type
    """
    skill_level = models.IntegerField(default=1)  # Everyone starts at level 1
    assignment_type = models.ForeignKey(AssignmentType)
    user = models.ForeignKey(User)
    this_level_correct = models.IntegerField(default=0, blank=True)
    this_level_wrong = models.IntegerField(default=0, blank=True)

    def register_attempted_solution(self, correct):
        if correct:
            self.this_level_correct += 1
        else:
            self.this_level_wrong += 1

        if (self.this_level_correct - self.this_level_wrong > 3) and self.skill_level < MAX_LEVEL:
            self.skill_level += 1
            self.this_level_correct = 0
            self.this_level_wrong = 0
        elif (self.this_level_wrong - self.this_level_correct > 5) and self.skill_level > 0:
            self.skill_level -= 1
            self.this_level_correct = 0
            self.this_level_wrong = 0
        self.save()

    def __str__(self):
        return "{user} with skillevel {skillevel} in {assignment_type}".format(
            user=self.user,
            skillevel=self.skill_level,
            assignment_type=self.assignment_type
        )


class ScoreTypeTracker(models.Model):
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
        return "Current streak in {assignment_type} for {user}: {score}".format(
            user=self.user,
            score=self.score,
            assignment_type=self.assignment_type
        )

    def save(self, *args, **kwargs):
        if self.current_streak > self.maximum_streak:
            self.maximum_streak = self.current_streak
        super().save(*args, **kwargs)
