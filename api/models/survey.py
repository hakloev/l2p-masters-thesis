from django.db import models
from django.utils.timezone import now
from .user import User

KNOWLEDGE_CHOICES = (
    ('PEN', 'Pensumlitteratur'),
    ('ØVI', 'Øvinger'),
    ('EGN', 'Programmering utenom øvinger'),
    ('E-L', 'Tjenester som Codecademy og Project Euler'),
    ('ANN', 'Annet'),
)

RATING = (
    (0, 'Ubesvart'),
    (1, 'I svært liten grad'),
    (2, 'I liten grad'),
    (3, 'I noen grad'),
    (4, 'I stor grad'),
    (5, 'I svært stor grad'),
)


class ProgressSurvey(models.Model):
    user = models.OneToOneField(User)
    answered_at = models.DateTimeField(default=now)
    knowledge_from = models.CharField(max_length=3, choices=KNOWLEDGE_CHOICES)
    knowledge_level = models.PositiveSmallIntegerField(choices=RATING, default=0)
    relevance = models.PositiveSmallIntegerField(choices=RATING, default=0)
    comments = models.TextField(blank=True, default="")

    def __str__(self):
        return self.user.username

    class Meta:
        ordering = ['-answered_at']
