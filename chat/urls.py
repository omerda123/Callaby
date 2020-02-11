from django.urls import path
from django.http import HttpResponse

from . import views
from . import models


def add_message(request):
    models.Message.objects.create(author="omer", content="aaaa", chat_id="12345")
    return HttpResponse("Done")

urlpatterns = [
    path('', views.index, name='index'),
    path('addmsg/', add_message),
    path('<str:user_name>/<str:room_name>/', views.room, name='room'),
]
