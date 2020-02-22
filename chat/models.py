from django.db import models
from django.contrib.auth.models import User


class Message(models.Model):
    chat_id = models.CharField(max_length=200)
    agent = models.CharField(max_length=200)
    customer = models.CharField(max_length=200, null=True)
    message = models.TextField()
    timestamp = models.TimeField(auto_now=True)


class Role(models.Model):
    title = models.CharField(max_length=200)


class Enterprise(models.Model):
    name = models.CharField(max_length=200)


class AdminUser(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    active_chats = models.IntegerField(default=0)
    role = models.ForeignKey(Role, on_delete=models.CASCADE)
    enterprise = models.ForeignKey(Enterprise, on_delete=models.CASCADE)


class Agent(models.Model):
    enterprise = models.ForeignKey(Enterprise, on_delete=models.CASCADE)
    private_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)


class Chat(models.Model):
    originator = models.CharField(max_length=200)
    destination = models.CharField(max_length=200)
    chat_id = models.CharField(max_length=200)


class Product(models.Model):
    enterprise = models.ForeignKey(Enterprise, on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    price = models.IntegerField()
    image = models.CharField(max_length=400, default="none")
