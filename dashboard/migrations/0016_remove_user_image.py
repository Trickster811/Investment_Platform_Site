# Generated by Django 4.0.4 on 2022-05-04 12:14

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('dashboard', '0015_alter_user_image'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='image',
        ),
    ]