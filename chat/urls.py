from django.urls import path
from django.http import HttpResponse

from . import views
from . import models

app_name = "chat"

urlpatterns = [
    path('', views.Login.as_view(), name='login'),
    path('chat/', views.index , name='index'),
    path('django-chat/', views.chat, name='room'),
    path('whoami/', views.who_am_i),
]
