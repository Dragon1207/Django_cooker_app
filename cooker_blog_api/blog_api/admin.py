from django.contrib import admin
from .models import *
from auth_api.models import User
# Register your models here.



admin.site.register(Post)
admin.site.register(Ingredient)
admin.site.register(Image)
