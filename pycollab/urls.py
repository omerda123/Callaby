from django.conf.urls import include
from django.urls import path
from django.contrib import admin
from django.shortcuts import redirect

# def index(request):
#     return redirect('chat/')

urlpatterns = [
    path('chat/', include('chat.urls')),
    path('', include('chat.urls')),
    path('admin/', admin.site.urls),
]