from django.shortcuts import render, redirect
import uuid
from django.contrib.auth.decorators import login_required


@login_required
def index(request):
    return render(request, 'chat/index.html')


def room(request, user_name = "unknown", room_name = "empty_room"):
    return render(request, 'chat/room.html', {
        'user_name': user_name,
        'room_name': room_name
    })