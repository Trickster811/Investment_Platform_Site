# Generated by Django 4.0.2 on 2022-02-22 14:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dashboard', '0006_alter_user_email'),
    ]

    operations = [
        migrations.CreateModel(
            name='current',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('email_c', models.EmailField(max_length=100)),
            ],
        ),
    ]
