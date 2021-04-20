from rest_framework import serializers
from .models import Comment, Rating, Recipe
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['id', 'username']



class RecipeSerializer(serializers.ModelSerializer):

    class Meta:
        model = Recipe
        fields = '__all__'
    
    # def get_fields(self):
    #     fields = super(CommentSerializer, self).get_fields()
    #     if self.context['request'].method == "GET":
    #         fields['user'] = UserSerializer(instance=True)
    #     return fields

class CommentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Comment
        fields = ['user', 'recipe', 'comment', "id"]
    
    # def get_fields(self):
    #     fields = super(CommentSerializer, self).get_fields()
    #     if self.context['request'].method == "GET":
    #         fields['user'] = UserSerializer(instance=True)
    #     return fields

class RatingSerializer(serializers.ModelSerializer):

    class Meta:
        model = Rating
        fields = ['user', 'recipe', 'rating','id']