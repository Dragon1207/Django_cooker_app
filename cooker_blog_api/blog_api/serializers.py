from rest_framework import serializers
from .models import Post, Ingredient

class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = '__all__'



class PostSerializer(serializers.ModelSerializer):
    ingredient = IngredientSerializer(many=True)
    class Meta:
        model = Post
        fields = '__all__'