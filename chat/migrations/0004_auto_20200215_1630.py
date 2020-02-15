# Generated by Django 3.0.3 on 2020-02-15 14:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0003_auto_20200212_1806'),
    ]

    operations = [
        migrations.RenameField(
            model_name='message',
            old_name='author',
            new_name='agent',
        ),
        migrations.AddField(
            model_name='message',
            name='customer',
            field=models.CharField(max_length=200, null=True),
        ),
    ]
