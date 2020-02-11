from django.db import models


class Message(models.Model):
    author = models.CharField(max_length=200)
    content = models.TextField()
    timestamp = models.TimeField(auto_now=True)
    chat_id = models.CharField(max_length=200)


class Roles(models.Model):
    title = models.CharField(max_length=200)


class Enterprise(models.Model):
    name = models.CharField(max_length=200)


class AdminUser(models.Model):
    username = models.CharField(max_length=200)
    password = models.CharField(max_length=200)
    role = models.ForeignKey(Roles, on_delete=models.CASCADE)
    enterprise = models.ForeignKey(Enterprise, on_delete=models.CASCADE)


class Agent(models.Model):
    enterprise = models.ForeignKey(Enterprise, on_delete=models.CASCADE)
    private_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)


class Chat(models.Model):
    originator = models.CharField(max_length=200)
    destination = models.CharField(max_length=200)
    chat_id = models.CharField(max_length=200)
