from django.db import models

class Message(models.Model):
    author = models.CharField(max_length=200)
    content = models.TextField()
    timestamp = models.TimeField(auto_now=True) 
