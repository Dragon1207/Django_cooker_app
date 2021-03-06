from rest_framework import serializers
from .models import Post, Ingredient
from auth_api.serializers import UserSerializer


class IngredientSerializer(serializers.ModelSerializer):

    class Meta:
        model = Ingredient
        fields = ['id', 'name']
        read_only_fields = ["id"]


# class ImageSerializer(serializers.HyperlinkedModelSerializer):
#     class Meta:
#         model = Image
#         fields = '__all__'



class PostSerializer(serializers.ModelSerializer):
    ingredient = IngredientSerializer(many=True, required=False)
    author = UserSerializer(read_only=True)
    class Meta:
        model = Post
        fields = ['id', 'title', 'content', 'published', 'status', 'ingredient', 'author']
        read_only_fields = ("id", "author",)


    def get_or_create_ingredients(self, ingredient_data):
        list_ingredient = []
        for ingredient in ingredient_data:
            name = ingredient.get('name', '')
            ingredient_filter = Ingredient.objects.filter(name=name)
            if ingredient_filter.exists():
                ingredient_create = Ingredient.objects.get(name=name)
                list_ingredient.append(ingredient_create.id)
            else:
                ingredient_create = Ingredient.objects.create(name=name)
                ingredient_create.save()
                list_ingredient.append(ingredient_create.id)
        return list_ingredient

    def create(self, validated_data):
        ingredient_data = validated_data.pop('ingredient')
        # images_data = validated_data.pop('images')
        post = Post.objects.create(**validated_data)
        for i in self.get_or_create_ingredients(ingredient_data):
            post.ingredient.add(i)
        # for image in images_data:
        #     post.images.add(image)
        return post

    def update(self, instance, validated_data):
        ingredient_data = validated_data.pop('ingredient')
        # images_data = validated_data.pop('images')
        instance.title = validated_data.get('title', instance.title)
        instance.content = validated_data.get('content', instance.content)
        instance.published = validated_data.get('published', instance.published)
        instance.status = validated_data.get('status', instance.status)
        instance.ingredient.clear()
        # for image in images_data:
        #     post.images.add(image)
        for i in self.get_or_create_ingredients(ingredient_data):
            instance.ingredient.add(i)
        instance.save()
        return instance
