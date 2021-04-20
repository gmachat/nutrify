from django.http import JsonResponse
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view
import json

from .models import Comment, Rating, Recipe
from .serializers import CommentSerializer, RatingSerializer, RecipeSerializer
# Create your views here.

# ------------user info and homepage---------------

def home(request):
    pass

def get_profile(request, user_id):
    pass


def save_recipe_to_profile(request, recipe_id):
    pass

def like_recipe_from_profile(request, recipe_id):
    pass


# --------------recipes-------------------

class RecipeViewSet(viewsets.ModelViewSet):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer
    permission_classes = (AllowAny,)


# def get_recipes(request):
#     pass

# def create_recipe(request):
#     pass

# def update_recipe(request):
#     pass

# def delete_recipe(request):
#     pass


# --------------comments-------------------

class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = (AllowAny,)




# def create_comment(request):
#     pass

# def update_comment(request):
#     pass

# def delete_comment(request):
#     pass


# # --------------ratings-------------------

class RatingViewSet(viewsets.ModelViewSet):
    queryset = Rating.objects.all()
    serializer_class = RatingSerializer
    permission_classes = (AllowAny,)

# def create_rating(request):
#     pass

# def update_rating(request):
#     pass

# def delete_rating(request):
#     pass
