# -*- coding: utf-8 -*-
# Generated by Django 1.10.1 on 2017-02-02 12:04
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0018_auto_20170202_1301'),
    ]

    operations = [
        migrations.AlterField(
            model_name='assignment',
            name='assignment_text',
            field=models.TextField(default=''),
        ),
        migrations.AlterField(
            model_name='assignment',
            name='code_body',
            field=models.TextField(default=''),
        ),
        migrations.AlterField(
            model_name='assignment',
            name='solution',
            field=models.TextField(default=''),
        ),
    ]
