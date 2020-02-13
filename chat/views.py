from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth.views import LoginView
from django.urls import reverse
from . import forms


class Login(LoginView):
    form_class = forms.AuthenticationForm
    template_name = 'registration/login.html'

    def dispatch(self, request, *args, **kwargs):
        if self.request.user.is_authenticated:
            return redirect(reverse('chat:room'))
        return super().dispatch(request, *args, **kwargs)


@login_required(login_url="/")
def chat(request):
    user_name = "unknown"
    room_name = "empty_room"
    return render(request, 'chat/room.html', {
        'user_name': user_name,
        'room_name': room_name
    })


@login_required(login_url="/")
def index(request):
    return render(request, 'chat/index.html')
