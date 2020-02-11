from django.urls import path

from . import views
from . import models



urlpatterns = [
    path('', views.index, name='index'),
    path('authuser/', views.auth, name='index'),
]
