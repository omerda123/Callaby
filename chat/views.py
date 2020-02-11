from django.shortcuts import render, redirect
import uuid



def index(request):
    # chat_room = str(uuid.uuid4().hex)
    # print(chat_room)
    # return redirect(f'/chat/unknown/{chat_room}')
    return render(request, 'chat/index.html')


def room(request, user_name = "unknown", room_name = "empty_room"):
    return render(request, 'chat/room.html', {
        'user_name': user_name,
        'room_name': room_name
    })