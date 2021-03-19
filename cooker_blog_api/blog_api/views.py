from .serializers import IngredientSerializer, PostSerializer
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from .models import Post, Ingredient




class PostListAPIView(ListCreateAPIView):
    serializer_class = PostSerializer
    queryset = Post.objects.all()
    #permission_classes = (permissions.IsAuthenticated,)

    # def perform_create(self, serializer):
    #     return serializer.save(owner=self.request.Post)

    # def get_queryset(self):
    #     return self.queryset.filter(owner=self.request.Post)


class PostDetailAPIView(RetrieveUpdateDestroyAPIView):
    serializer_class = PostSerializer
    #permission_classes = (permissions.IsAuthenticated, IsOwner,)
    queryset = Post.objects.all()
    lookup_field = "id"


    # def get_queryset(self):
    #     return self.queryset.filter(owner=self.request.Post)