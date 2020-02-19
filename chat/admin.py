from django.contrib import admin
from . import models

# Register your models here.
admin.site.register(models.AdminUser)
admin.site.register(models.Enterprise)
admin.site.register(models.Role)
