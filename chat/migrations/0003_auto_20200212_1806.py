# Generated by Django 3.0.3 on 2020-02-12 16:06

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0002_products'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Products',
            new_name='Product',
        ),
    ]
