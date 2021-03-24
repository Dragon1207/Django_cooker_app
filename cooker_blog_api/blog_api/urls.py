from django.urls import path
from .views import *



urlpatterns = [
    path('posts/', PostListAPIView.as_view(), name="list-post"),
    path('posts/<int:id>/', PostDetailAPIView.as_view(), name="detail-post"),
]