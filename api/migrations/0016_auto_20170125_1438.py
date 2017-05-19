# -*- coding: utf-8 -*-
# Generated by Django 1.10.1 on 2017-01-25 13:38
from __future__ import unicode_literals

from django.db import migrations


def make_many_to_many_assignment_types(apps, schema_editor):
    Assignment = apps.get_model('api', 'Assignment')
    for assignment in Assignment.objects.all():
        assignment.assignment_types.add(assignment.assignment_type)


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0015_auto_20170125_1437'),
    ]

    operations = [
        migrations.RunPython(make_many_to_many_assignment_types)
    ]
