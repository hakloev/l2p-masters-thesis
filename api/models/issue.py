from django.db import models

from api.models.assignment import Assignment


class Issue(models.Model):
    """

    """
    name = models.CharField(default="", max_length=100)
    email = models.EmailField(default="", max_length=100)
    issue = models.TextField(default="")
    assignmentId = models.ForeignKey(Assignment, related_name='issues', default=None, blank=True, null=True)

    def __str__(self):
        return self.issue