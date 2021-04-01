from .serializers import IngredientSerializer, PostSerializer, ImageSerializer
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, ListAPIView
from .models import Post, Ingredient, Image
from .permissions import IsOwnerOrReadOnly, IsOwner
from rest_framework.permissions import IsAdminUser, IsAuthenticatedOrReadOnly
from rest_framework.filters import SearchFilter
from rest_framework.viewsets import ModelViewSet
from rest_framework.parsers import MultiPartParser, FormParser


class Imageuploadviewset(ModelViewSet):
   queryset = Image.objects.all()
   serializer_class = ImageSerializer


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
    search_fields = ['^title', '^ingredient']


class PostListAPIView(ListCreateAPIView):
    serializer_class = PostSerializer
    queryset = Post.objects.all()
    permission_classes = [IsAuthenticatedOrReadOnly]
    parser_classes = [MultiPartParser, FormParser]

    # we have to add in the header of therequest content/type = application/json and it will works
    def post(self, request, format=None):
        # import pdb; pdb.set_trace()
        serializer = PostSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def perform_create(self, serializer):
        return serializer.save(author=self.request.user)

    def get_parsers(self):
        if getattr(self, 'swagger_fake_view', False):
            return []

        return super().get_parsers()


class PostDetailAPIView(RetrieveUpdateDestroyAPIView):
    serializer_class = PostSerializer
    permission_classes = [IsOwnerOrReadOnly]
    queryset = Post.objects.all()
    lookup_field = "id"

    def perform_update(self, serializer):
        return serializer.save(author=self.request.user)

    def perform_destroy(self, serializer):
        return serializer.save(author=self.request.user)

    # def get_queryset(self):
    #     if self.request.user.is_staff == True:
    #         return Post.objects.all()
    #     else:
    #         return Post.objects.filter(author=self.request.user)

