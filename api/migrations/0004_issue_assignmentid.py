# -*- coding: utf-8 -*-
# Generated by Django 1.10.1 on 2016-11-01 10:03
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_auto_20161027_1021'),
    ]

    operations = [
        migrations.AddField(
            model_name='issue',
            name='assignmentId',
            field=models.ForeignKey(blank=True, default=None, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='issues', to='api.Assignment'),
        ),
    ]
