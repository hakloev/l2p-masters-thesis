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


@receiver(post_save, sender=User, dispatch_uid="update_student_user")
def update_student_user(sender, instance, created, **kwargs):
    if created:
        student = Student(user=instance)
        student.save()
