# -*- coding: utf-8 -*-
# Generated by Django 1.10.1 on 2016-11-15 13:35
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0010_auto_20161114_1741'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='assignmentsolvingattempt',
            options={'ordering': ['-attempted_at', 'user'], 'verbose_name': 'Solving Attempt', 'verbose_name_plural': 'Solving Attempts'},
        ),
        migrations.AlterModelOptions(
            name='assignmenttypescoretracker',
            options={'verbose_name': 'Assignment Type Score Tracker', 'verbose_name_plural': 'Assignment Type Score Trackers'},
        ),
        migrations.AlterModelOptions(
            name='issue',
            options={'ordering': ['-created', 'assignmentId']},
        ),
        migrations.AlterModelOptions(
            name='userstreaktracker',
            options={'verbose_name': 'User Streak Tracker', 'verbose_name_plural': 'User Streak Trackers'},
        ),
    ]
