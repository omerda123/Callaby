from django.contrib.auth.models import User, Group
from rest_framework import serializers
from chat import models
import logging

logger = logging.getLogger(__name__)


class AdminUserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = models.AdminUser
        fields = ['role_id', 'enterprise_id']


class UserSerializer(serializers.HyperlinkedModelSerializer):
    adminuser = AdminUserSerializer()

    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'groups', 'first_name', 'last_name', 'adminuser']


class AgentSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']


class ChatMessageSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = models.Message
        fields = ['chat_id', 'agent', 'customer', 'message', 'timestamp']


class EnterpriseSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = models.Enterprise
        fields = ['id', 'name']

    def get_enterprise_name(self):
        return 'omer'


class ProductsSerializer(serializers.HyperlinkedModelSerializer):
    enterprise = EnterpriseSerializer()
    # get_enterprise_name = serializers.SerializerMethodField()


    class Meta:
        model = models.Product
        fields = ['id', 'enterprise', 'name', 'price', 'image']

