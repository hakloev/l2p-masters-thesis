from django.db import models
from django.utils.timezone import now
from api.models.assignment import Assignment


class Issue(models.Model):
    """
    A model for issues submitted by users. Generic model that may have a relation to
    an assignment.
    """
    name = models.CharField(default="", max_length=100)
    email = models.EmailField(default="", max_length=100)
    issue = models.TextField(default="")
    assignmentId = models.ForeignKey(Assignment, related_name='issues', default=None, blank=True, null=True)
    created = models.DateTimeField(default=now)

    def __str__(self):
        return self.issue

    class Meta:
        ordering = ['-created', 'assignmentId']