from django.urls import path, include
from . import views
from rest_framework.routers import DefaultRouter


app_name = "nutrify"

urlpatterns = [
    path('/', views.home),
    # path('get_recipes/', views.get_recipes),
    # path('create_recipe/', views.create_recipe),
    # path('update_recipe/<int:recipe_id>/', views.update_recipe),
    # path('delete_recipe/<int:recipe_id>/', views.delete_recipe),
    # path("create_comment/", views.create_comment),
    # path("update_comment/<int:comment_id>/", views.update_comment),
    # path("delete_comment/<int:comment_id>/", views.delete_comment),

    # path("create_ratingt/", views.create_ratingt),
    # path("update_ratingt/<int:ratingt_id>/", views.update_ratingt),
    # path("delete_ratingt/<int:ratingt_id>/", views.delete_ratingt),

    path('profile/<int:user_id>/', views.get_profile),
]

router = DefaultRouter()
router.register(r'recipes', views.RecipeViewSet, basename='recipe')
router.register(r'comments', views.CommentViewSet, basename='comment')
router.register(r'ratings', views.RatingViewSet, basename='rating')

urlpatterns += router.urls
