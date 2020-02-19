from django.urls import path
from django.http import HttpResponse

from . import views
from . import models

app_name = "chat"

urlpatterns = [
    path('', views.Login.as_view(), name='login'),
    path('agent/' , views.index, name="agent"),
    path('admin/', views.admin, name='admin'),
    path('whoami/', views.who_am_i),
]
