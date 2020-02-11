from django.http import HttpResponse


def index(request):
    return HttpResponse("API")

def auth(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        print(username,password)
    else:
        print("false")
