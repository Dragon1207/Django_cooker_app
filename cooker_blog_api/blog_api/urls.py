from django.urls import path
from .views import *



urlpatterns = [
    path('posts/', PostListAPIView.as_view(), name="list-posts"),
    path('posts/<int:id>/', PostDetailAPIView.as_view(), name="detail-post"),
    path('ingredients/', IngredientListAPIView.as_view(), name="list-ingredients"),
    path('ingredients/<int:id>/', IngredientDetailAPIView.as_view(), name="detail-ingredients"),
    path('search/', PostListDetailfilter.as_view(), name='search-posts'),
    path('imageupload/', Imageuploadviewset, name='upload-image')
]