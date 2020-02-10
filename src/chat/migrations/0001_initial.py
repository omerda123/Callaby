# Generated by Django 3.0.3 on 2020-02-10 12:03

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Chat',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('originator', models.CharField(max_length=200)),
                ('destination', models.CharField(max_length=200)),
                ('chat_id', models.CharField(max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='Enterprise',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='Message',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('author', models.CharField(max_length=200)),
                ('content', models.TextField()),
                ('timestamp', models.TimeField(auto_now=True)),
                ('chat_id', models.CharField(max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='Roles',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='Agent',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('private_name', models.CharField(max_length=200)),
                ('last_name', models.CharField(max_length=200)),
                ('enterprise', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='chat.Enterprise')),
            ],
        ),
        migrations.CreateModel(
            name='AdminUser',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('username', models.CharField(max_length=200)),
                ('password', models.CharField(max_length=200)),
                ('enterprise', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='chat.Enterprise')),
                ('role', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='chat.Roles')),
            ],
        ),
    ]
