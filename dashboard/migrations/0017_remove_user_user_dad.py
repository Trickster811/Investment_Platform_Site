# Generated by Django 4.0.4 on 2022-05-07 07:30

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('dashboard', '0016_remove_user_image'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='user_dad',
        ),
    ]