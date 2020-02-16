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
            return redirect(reverse('chat:index'))
        return super().dispatch(request, *args, **kwargs)


@login_required(login_url="/")
def chat(request):

    return render(request, 'chat/room.html', {})


@login_required(login_url="/")
def index(request):
    return render(request, 'chat/index.html')
