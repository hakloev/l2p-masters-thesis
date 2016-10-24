from django.db import models


class AssignmentType(models.Model):
    """
    A way to organize assignments into different subjects
    """
    type_name = models.CharField(default="", max_length=20)

    def __str__(self):
        return self.type_name


class ActiveAssignments(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(is_public=True)


class Assignment(models.Model):
    """
    Model for assignments
    """
    is_public = models.BooleanField(default=False)
    difficulty_level = models.IntegerField()
    resource_url = models.URLField(blank=True, null=True)
    assignment_type = models.ForeignKey(AssignmentType)
    title = models.CharField(max_length=100)
    assignment_text = models.TextField(default="", blank=True)
    hint_text = models.TextField(default="", blank=True)
    code_body = models.TextField(default="", blank=True)
    solution = models.TextField(default="", blank=True)

    objects = models.Manager()
    active_assignments = ActiveAssignments()

    def __str__(self):
        return self.title
