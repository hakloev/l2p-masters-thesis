import uuid
from django.contrib.auth.models import User
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver

from api.models.achievement import Achievement
from api.models.assignment import Assignment


class Student(models.Model):
    """
    Adds extra fields to the default django user model and add a list of achievements,
    aggregated score, and what assignments that the user has solved.
    """
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    aggregated_score = models.IntegerField(default=0)
    attempted_assignments = models.IntegerField(default=0)
    achievements = models.ManyToManyField(Achievement, blank=True)
    assignments_solved = models.ManyToManyField(Assignment, blank=True)
    attend_survey = models.BooleanField(default=False)


@receiver(post_save, sender=User, dispatch_uid=uuid.uuid1())
def update_student_user(sender, instance, created, **kwargs):
    if created:
        Student.objects.create(user=instance)


@receiver(post_save, sender=User, dispatch_uid=uuid.uuid1())
def save_user_profile(sender, instance, **kwargs):
    instance.student.save()