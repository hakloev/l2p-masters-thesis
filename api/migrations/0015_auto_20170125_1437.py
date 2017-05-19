# -*- coding: utf-8 -*-
# Generated by Django 1.10.1 on 2017-01-25 13:37
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0014_auto_20161122_1342'),
    ]

    operations = [
        migrations.AddField(
            model_name='assignment',
            name='assignment_types',
            field=models.ManyToManyField(related_name='assignment_types', to='api.AssignmentType'),
        ),
        migrations.AlterField(
            model_name='assignment',
            name='assignment_type',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='assignment_type', to='api.AssignmentType'),
        ),
    ]
