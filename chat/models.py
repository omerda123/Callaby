from django.contrib.postgres.fields import JSONField
from django.db import models
from django.contrib.auth.models import User
from django.utils.timezone import now


class Enterprise(models.Model):
    name = models.CharField(max_length=200)


class Chat(models.Model):
    uid = models.CharField(max_length=20)
    agent = models.ForeignKey(User, on_delete=models.CASCADE)
    customer = models.CharField(max_length=30)
    date_created = models.DateTimeField(default=now)


class Message(models.Model):
    chat_id = models.ForeignKey(Chat, on_delete=models.CASCADE)
    agent = models.ForeignKey(User, on_delete=models.CASCADE)
    customer = models.CharField(max_length=200, null=True)
    author = models.CharField(max_length=200)
    message = models.TextField()
    timestamp = models.DateTimeField(default=now)


class Role(models.Model):
    title = models.CharField(max_length=200)


class AdminUser(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    active_chats = models.IntegerField(default=0)
    role = models.ForeignKey(Role, on_delete=models.CASCADE)
    enterprise = models.ForeignKey(Enterprise, on_delete=models.CASCADE)


class Product(models.Model):
    enterprise = models.ForeignKey(Enterprise, on_delete=models.CASCADE, null=True)
    name = models.CharField(max_length=200)
    price = models.IntegerField()
    image = models.ImageField(upload_to="products/")


class Form(models.Model):
    name = models.CharField(max_length=200, default="")
    fields = JSONField()


class Order(models.Model):
    agent = models.ForeignKey(User, on_delete=models.CASCADE)
    order_details = JSONField()
    date_created = models.DateTimeField(default=now)
