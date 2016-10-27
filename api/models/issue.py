from django.db import models


class Issue(models.Model):
    """

    """
    name = models.CharField(default="", max_length=100)
    email = models.EmailField(default="", max_length=100)
    issue = models.TextField(default="")

    def __str__(self):
        return self.issue