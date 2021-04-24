from django.http import JsonResponse
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view
import json

from .models import Comment, Rating, Recipe, UserProfile
from .serializers import CommentSerializer, RatingSerializer, RecipeSerializer, UserProfileSerializer
# Create your views here.

# ------------user info and homepage---------------


class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = (AllowAny,)





def home(request):
    pass

# def get_profile(request, user_id):
#     pass
    


# def save_recipe_to_profile(request, recipe_id):
#     pass

# def like_recipe_from_profile(request, recipe_id):
#     pass


# --------------recipes-------------------

class RecipeViewSet(viewsets.ModelViewSet):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer
    permission_classes = (AllowAny,)
    
    def get_queryset(self):
        print(self.request.query_params)
        print(self.request.data)

        search = self.request.query_params.get('search',False)
        print(search, 'search')
        if search:
            recipes = Recipe.objects.filter(title__contains=search)
        else:
            recipes = Recipe.objects.all()
        return recipes
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

