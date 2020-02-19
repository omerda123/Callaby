from django.conf.urls import include
from django.urls import path
from django.contrib import admin
from django.shortcuts import redirect

# def index(request):
#     return redirect('chat/')

urlpatterns = [
    path('', include('chat.urls')),
    path('accounts/', include('django.contrib.auth.urls')),
    path('api/', include('api.urls')),
    path('django-admin/', admin.site.urls),
]