from rest_framework import serializers
from .models import Comment, Rating, Recipe, UserProfile
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        # fields = ['id', 'username']
        exclude = ('password', 'user_permissions', 'is_superuser',  'first_name', 'groups', 'is_active', 'is_staff', 'last_login', 'last_name')





class RecipeSerializer(serializers.ModelSerializer):
    # ISSUES CAUSED BY THIS ON MIGRATE FOR SOME REASON!!!
    created_by = serializers.PrimaryKeyRelatedField(queryset=UserProfile.objects.all())
 
    # print(created_by)
    class Meta:
        model = Recipe
        fields = '__all__'
        depth =2
        
        # exclude = ('created_by',)
    
    def get_fields(self):
        fields = super(RecipeSerializer, self).get_fields()
        if self.context['request'].method == "GET":
            fields['created_by'] = RecipeUserProfileSerializer(instance=True)
        return fields

class UserProfileSerializer(serializers.ModelSerializer):

    created_recipes = RecipeSerializer(many=True)
    # created_recipes = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    class Meta:
        model = UserProfile
        fields = '__all__'
        depth = 1
        

    def get_fields(self):
        fields = super(UserProfileSerializer, self).get_fields()
        if self.context['request'].method == "GET":
            fields['user'] = UserSerializer(instance=True)
            # fields['created_recipes'] = RecipeSerializer(instance=True, many=True)
        return fields


class RecipeUserProfileSerializer(serializers.ModelSerializer):

    # created_recipes = RecipeSerializer(many=True)
    # created_recipes = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    class Meta:
        model = UserProfile
        fields = ['user']
        depth = 1
        

    def get_fields(self):
        fields = super(RecipeUserProfileSerializer, self).get_fields()
        if self.context['request'].method == "GET":
            fields['user'] = UserSerializer(instance=True)
            # fields['created_recipes'] = RecipeSerializer(instance=True, many=True)
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



# from rest_framework import serializers
# from .models import Comment, Rating, Recipe, UserProfile, UserRecipe
# from django.contrib.auth.models import User


# class UserSerializer(serializers.ModelSerializer):

#     class Meta:
#         model = User
#         fields = ['id', 'username', 'user_profile']

#     # def get_fields(self):
#     #     fields = super(UserSerializer, self).get_fields()
#     #     if self.context['request'].method == "GET":
#     #         fields['user_profile'] = UserProfileSerializer(instance=True)
#     #     return fields





# class UserProfileSerializer(serializers.ModelSerializer):

#     # created_recipes = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
#     # user = UserSerializer(read_only=True)
#     class Meta:
#         model = UserProfile
#         fields = ['user', 'recipes']
    
        

#     def get_fields(self):
#         fields = super(UserProfileSerializer, self).get_fields()
#         if self.context['request'].method == "GET":
#             fields['user'] = UserSerializer(instance=True)
#             fields['recipes'] = UserRecipeSerializer(instance=True)

#             # fields['recipes'] = UserRecipesSerializer(instance=True)

#         return fields

# class UserRecipeSerializer(serializers.ModelSerializer):
    
#     # created_recipes = RecipeSerializer(read_only=True)


#     class Meta:
#         model = UserRecipe
#         fields = ['id', 'user_profile', 'created_recipes', 'saved_recipes', 'liked_recipes']
#         # exclude = ('created_by',)



#     # def get_fields(self):
#     #     fields = super(UserRecipesSerializer, self).get_fields()
#     #     if self.context['request'].method == "GET":
#     #         fields['created_recipes'] = RecipeSerializer(instance=True)
#     #     return fields

# class RecipeSerializer(serializers.ModelSerializer):
#     created_by = UserRecipeSerializer(read_only=True)

#     # print(created_by)
#     class Meta:
#         model = Recipe
#         fields = '__all__'

    
#     def get_fields(self):
#         fields = super(RecipeSerializer, self).get_fields()
#         if self.context['request'].method == "GET":
#             fields['created_by'] = UserRecipeSerializer(instance=True)
#         return fields

# class CommentSerializer(serializers.ModelSerializer):

#     class Meta:
#         model = Comment
#         fields = ['user', 'recipe', 'comment', "id"]
    
#     # def get_fields(self):
#     #     fields = super(CommentSerializer, self).get_fields()
#     #     if self.context['request'].method == "GET":
#     #         fields['user'] = UserSerializer(instance=True)
#     #     return fields

# class RatingSerializer(serializers.ModelSerializer):

#     class Meta:
#         model = Rating
#         fields = ['user', 'recipe', 'rating','id']