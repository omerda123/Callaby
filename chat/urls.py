from django.urls import path
from django.http import HttpResponse

from . import views
from . import models



urlpatterns = [
    path('', views.index, name='index'),
    path('chat/<str:user_name>/<str:room_name>/', views.room, name='room'),
]
