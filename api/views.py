from django.contrib.auth.models import User, Group
from rest_framework import viewsets, pagination
from .serializers import UserSerializer, GroupSerializer, ChatMessageSerializer , EnterpriseSerializer
from chat import models


class LargeResultsSetPagination(pagination.PageNumberPagination):
    page_size = 1000
    page_size_query_param = 'page_size'
    max_page_size = 10000


class StandardResultsSetPagination(pagination.PageNumberPagination):
    page_size = 100
    page_size_query_param = 'page_size'
    max_page_size = 1000


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer


class GroupViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer


class MessageViewSet(viewsets.ModelViewSet):
    queryset = models.Message.objects.filter(chat_id='room1')
    serializer_class = ChatMessageSerializer
    pagination_class = LargeResultsSetPagination

class EnterpriseViewSet(viewsets.ModelViewSet):
    queryset = models.Enterprise.objects.all()
    serializer_class = EnterpriseSerializer



