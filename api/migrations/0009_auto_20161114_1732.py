# -*- coding: utf-8 -*-
# Generated by Django 1.10.1 on 2016-11-14 16:32
from __future__ import unicode_literals

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0008_issue_created'),
    ]

    operations = [
        migrations.AlterField(
            model_name='issue',
            name='created',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
    ]
