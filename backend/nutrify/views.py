from django.http import JsonResponse
from rest_framework import viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view
from rest_framework import permissions, status
from rest_framework.response import Response
from django.core.paginator import Paginator

import json

from .models import Comment, Rating, Recipe, UserProfile
from .serializers import CommentSerializer, RatingSerializer, RecipeSerializer, UserProfileSerializer

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
    # queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer
    permission_classes = (AllowAny,)
    authentication_classes = (TokenAuthentication,)

    # def destroy(self, request, pk=None, **kwargs):
    #     print(self.request.user.is_authenticated)
    #     print(self.request.META.get("HTTP_AUTHORIZATION"))
    #     try:
    #         recipe = Recipe.objects.get(created_by=self.request.user.id) 
    #         print(recipe)
    #         recipe.delete()
    #     except Recipe.DoesNotExist:
    #         return Response(status=status.HTTP_400_BAD_REQUEST)
    #     return Response(status=status.HTTP_204_NO_CONTENT)

    # def get_authenticators(self):
    #     print(self.get_authenticators)
        # if self.action == 'destroy':
        #     return super().get_authenticators()
        # return []


    
    def get_queryset(self):
        search = self.request.query_params.get('search',False)
        # page = self.request.query_params.get('page',False)
        
        if search:
            recipes = Recipe.objects.filter(title__contains=search)
            print(recipes)
        else:
            recipes = Recipe.objects.all()
        # if page:
        #     paginated = Paginator(recipes, 5)
        #     print(paginated.num_pages)
        #     print(paginated.count)
        #     if int(page) > paginated.num_pages:
        #         return []
        #     return paginated.get_page(page)
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

