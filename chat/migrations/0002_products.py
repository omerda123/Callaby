# Generated by Django 3.0.3 on 2020-02-12 16:05

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Products',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('price', models.IntegerField()),
                ('enterprise', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='chat.Enterprise')),
            ],
        ),
    ]
