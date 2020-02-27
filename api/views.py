from django.contrib.auth.models import User, Group
from django.http import JsonResponse
from rest_framework import viewsets, pagination
from .serializers import UserSerializer, GroupSerializer, ChatMessageSerializer, EnterpriseSerializer, AgentSerializer, \
    ProductsSerializer, FormsSerializer, OrderSerializer, ChatSerializer, MessageSerializer
from chat import models
import logging
import json

logging.basicConfig(
    format='[%(levelname)s %(asctime)s %(module)s:%(lineno)d] %(message)s', level=logging.INFO)

logger = logging.getLogger(__name__)
from datetime import datetime


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
    queryset = models.Message.objects.all()
    serializer_class = ChatMessageSerializer
    pagination_class = LargeResultsSetPagination


class EnterpriseViewSet(viewsets.ModelViewSet):
    queryset = models.Enterprise.objects.all()
    serializer_class = EnterpriseSerializer


class ProductsViewSet(viewsets.ModelViewSet):
    queryset = models.Product.objects.all()
    serializer_class = ProductsSerializer


class FormsViewSet(viewsets.ModelViewSet):
    queryset = models.Form.objects.all()
    serializer_class = FormsSerializer


class OrderViewSet(viewsets.ModelViewSet):
    queryset = models.Order.objects.all()
    serializer_class = OrderSerializer
    pagination_class = LargeResultsSetPagination


class MessageViewSet(viewsets.ModelViewSet):
    queryset = models.Message.objects.all()
    serializer_class = MessageSerializer
    pagination_class = LargeResultsSetPagination


class ChatViewSet(viewsets.ModelViewSet):
    queryset = models.Chat.objects.all()
    serializer_class = ChatSerializer
    pagination_class = LargeResultsSetPagination


class GetStatisticsViewSet(viewsets.ViewSet):
    def list(self, request, format=None):
        number_Of_enterprises = len(models.Enterprise.objects.all())
        number_Of_agents = len(User.objects.all())
        data = {'number_Of_agents': number_Of_agents, 'number_Of_enterprises': number_Of_enterprises}
        return JsonResponse(data)


class GetLastSevenDays(viewsets.ViewSet):
    def list(self, request, format=None):
        today = len(models.Chat.objects.filter(date_created__day=datetime.today().day))
        todayMinusOne = len(models.Chat.objects.filter(date_created__day=datetime.today().day - 1))
        todayMinusTwo = len(models.Chat.objects.filter(date_created__day=datetime.today().day - 2))
        todayMinusThree = len(models.Chat.objects.filter(date_created__day=datetime.today().day - 3))
        todayMinusFour = len(models.Chat.objects.filter(date_created__day=datetime.today().day - 4))
        data = {'today': today, 'today-1': todayMinusOne, 'today-2': todayMinusTwo, 'today-3': todayMinusThree,
                'today-4': todayMinusFour, }
        return JsonResponse(data)


class GetLastSevenDaysOrders(viewsets.ViewSet):
    def list(self, request, format=None):
        today = len(models.Order.objects.filter(date_created__day=datetime.today().day))
        todayMinusOne = len(models.Order.objects.filter(date_created__day=datetime.today().day - 1))
        todayMinusTwo = len(models.Order.objects.filter(date_created__day=datetime.today().day - 2))
        todayMinusThree = len(models.Order.objects.filter(date_created__day=datetime.today().day - 3))
        todayMinusFour = len(models.Order.objects.filter(date_created__day=datetime.today().day - 4))
        data = {'today': today, 'today-1': todayMinusOne, 'today-2': todayMinusTwo, 'today-3': todayMinusThree,
                'today-4': todayMinusFour, }
        return JsonResponse(data)
