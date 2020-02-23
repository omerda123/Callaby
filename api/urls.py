from django.urls import include, path
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'agents', views.AgentsViewSet)
router.register(r'groups', views.GroupViewSet)
router.register(r'messages', views.MessageViewSet)
router.register(r'enterprises', views.EnterpriseViewSet)
router.register(r'products', views.ProductsViewSet)
router.register(r'statistics', views.GetStatisticsViewSet, basename="stats")

urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]
