from .serializers import IngredientSerializer, PostSerializer
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, ListAPIView
from .models import Post, Ingredient
from .permissions import IsOwnerOrReadOnly, IsOwner
from rest_framework.permissions import IsAdminUser, IsAuthenticatedOrReadOnly
from rest_framework.filters import SearchFilter



class IngredientListAPIView(ListCreateAPIView):
    serializer_class = IngredientSerializer
    queryset = Ingredient.objects.all()
    permission_classes = [IsAuthenticatedOrReadOnly]


class IngredientDetailAPIView(RetrieveUpdateDestroyAPIView):
    serializer_class = IngredientSerializer
    permission_classes = [IsAdminUser]
    queryset = Ingredient.objects.all()
    lookup_field = "id"


class PostListDetailfilter(ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    filter_backends = [SearchFilter]
    search_fields = ['=title',]


class PostListAPIView(ListCreateAPIView):
    serializer_class = PostSerializer
    queryset = Post.objects.all()
    permission_classes = [IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        return serializer.save(author=self.request.user)


class PostDetailAPIView(RetrieveUpdateDestroyAPIView):
    serializer_class = PostSerializer
    permission_classes = [IsAdminUser, IsOwnerOrReadOnly]
    queryset = Post.objects.all()
    lookup_field = "id"

    def perform_update(self, serializer):
        return serializer.save(author=self.request.user)

    def perform_destroy(self, serializer):
        return serializer.save(author=self.request.user)


    # def get_queryset(self):
    #     return self.queryset.filter(author=self.request.user.id)

