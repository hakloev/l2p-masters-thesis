from django.db import models


class Achievement(models.Model):
    """
    Model for achievements, with a title, an optional description
    and an image to display the tag. The identifier string is to connect the
    achievement database object with the achievement in utils.
    - Sorry for not making a better way to handle achievements.
    """
    #TODO: FIGURE OUT A NICE WAY TO HANDLE ACHIEVEMENTS
    title = models.CharField(default="", max_length=100)
    identifier_string = models.CharField(default="", max_length=10, blank=True)
    description = models.TextField(default="", blank=True)
    image_url = models.URLField(blank=True, null=True)

    def __str__(self):
        return self.title
