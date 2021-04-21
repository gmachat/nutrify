from rest_framework import serializers
from .models import Comment, Rating, Recipe, UserProfile
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['id', 'username']



class RecipeSerializer(serializers.ModelSerializer):

    class Meta:
        model = Recipe
        fields = '__all__'
    
    def get_fields(self):
        fields = super(RecipeSerializer, self).get_fields()
        if self.context['request'].method == "GET":
            fields['created_by'] = UserProfileSerializer(instance=True)
        return fields

class UserProfileSerializer(serializers.ModelSerializer):

    created_recipes = RecipeSerializer(many=True, read_only=True)
    created_recipes = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    class Meta:
        model = UserProfile
        fields = '__all__'

    def get_fields(self):
        fields = super(UserProfileSerializer, self).get_fields()
        if self.context['request'].method == "GET":
            fields['user'] = UserSerializer(instance=True)
        return fields

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