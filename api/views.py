from django.contrib.auth.models import User, Group
from django.http import JsonResponse
from rest_framework import viewsets, pagination
from rest_framework.views import APIView
from .serializers import UserSerializer, GroupSerializer, ChatMessageSerializer, EnterpriseSerializer, AgentSerializer, \
    ProductsSerializer
from chat import models
from rest_framework.response import Response
from rest_framework import permissions



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


class AgentsViewSet(viewsets.ModelViewSet):
    queryset = User.objects.filter(adminuser__role=1)
    serializer_class = AgentSerializer


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
    permission_classes = (permissions.AllowAny,)


class ProductsViewSet(viewsets.ModelViewSet):
    queryset = models.Product.objects.all()
    serializer_class = ProductsSerializer


class GetStatisticsViewSet(viewsets.ViewSet):
    def list(self, request, format=None):
        number_Of_enterprises = len(models.Enterprise.objects.all())
        number_Of_agents = len(User.objects.all())
        data = {'number_Of_agents': number_Of_agents, 'number_Of_enterprises':number_Of_enterprises}
        return JsonResponse(data)
