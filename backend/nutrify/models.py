from django.db import models

from django.db import models
from django.contrib.auth.models import User
from django.contrib.postgres.fields import ArrayField, JSONField

from django.core.validators import MinValueValidator, MaxValueValidator

import json

# Create your models here.
class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)

class Recipe(models.Model):
    title = models.CharField(max_length=512)
    cook_time = models.IntegerField()
    prep_time = models.IntegerField()
    yields = models.IntegerField()
    preperation = models.TextField(null=True)
    recipe_image = models.CharField(max_length=2048, null=True)
    created_by = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name='created_recipes', null=True)
    saved_by = models.ManyToManyField(UserProfile, related_name='saved_recipes', null=True)
    liked_by = models.ManyToManyField(UserProfile,  related_name='liked_recipes', null=True)
    ingredients = ArrayField(models.CharField(max_length=256, blank=True), size=200, null=True)
    nutrition = JSONField(null=True)
    #put nutrition results into the json field


class Comment(models.Model):
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name='comments')
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE, related_name='comments')
    comment = models.TextField()

class Rating(models.Model):
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name='ratings')
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE, related_name='ratings')
    rating = models.PositiveIntegerField(validators=[MinValueValidator(0), MaxValueValidator(5)])