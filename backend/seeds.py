from nutrify.models import Recipe, Rating, Comment, UserProfile
from django.contrib.auth.models import User

ingredients1 = [
    "1 fresh ham, about 18 pounds, prepared by your butcher (See Step 1)",
    "7 cloves garlic, minced",
    "1 tablespoon caraway seeds, crushed",
    "4 teaspoons salt",
    "Freshly ground pepper to taste",
    "1 teaspoon olive oil",
    "1 medium onion, peeled and chopped",
    "3 cups sourdough rye bread, cut into 1/2-inch cubes",
    "1 1/4 cups coarsely chopped pitted prunes",
    "1 1/4 cups coarsely chopped dried apricots",
    "1 large tart apple, peeled, cored and cut into 1/2-inch cubes",
    "2 teaspoons chopped fresh rosemary",
    "1 egg, lightly beaten",
    "1 cup chicken broth, homemade or low-sodium canned"
  ]


ingredients2 = [
    "1 pound sockeye salmon (any salmon works, but I prefer sockeeye",
    "3 tablespoons fresh chopped dill",
    "1 teaspoons cracked pepper",
    "4 teaspoons salt",
  ]

ingredients3 = [
    "1/2 cup whey protein",
    "1/4 teaspoon baking powder",
    "1 egg",
    "1 tablespoon butter",
    "stevia, to taste",
    "1 tablespoon coconut oil",
    "2 tablespoon unsweetened baking chocolate",
    "1 teaspoon salt",
    "1/2 teaspoon vanilla extract",
  ]


u1 = User(username="greg123", first_name='Greg', last_name='Machat', email='greg@gmail.com')
u1.set_password('test123123')
u1.save()
up1 = UserProfile(user=u1)
up1.save()

u2 = User(username="adam123", first_name='Adam', last_name='Cucchiara', email='adam@gmail.com')
u2.set_password('test123123')
u2.save()
up2 = UserProfile(user=u2)
up2.save()

u3 = User(username="evan123", first_name='Evan', last_name='Gerry', email='evan@gmail.com')
u3.set_password('test123123')
u3.save()
up3 = UserProfile(user=u3)
up3.save()


r1= Recipe(title="Fresh Ham Roasted With Rye Bread and Dried Fruit Stuffing", cook_time=60, prep_time=15, yields=15, ingredients=ingredients1, created_by=up1)
r1.save()
r2= Recipe(title="Fresh Norweigen Salmon", cook_time=0, prep_time=15, yields=5, ingredients=ingredients2, created_by=up1)
r2.save()
r3= Recipe(title="Low Carb Chocolate Mug Cake", cook_time=0, prep_time=15, yields=1, ingredients=ingredients3, created_by=up3)
r3.save()

rate1 = Rating(user=up1, recipe=r1, rating=5)
rate1.save()
rate2 = Rating(user=up1, recipe=r2, rating=4)
rate2.save()
rate3 = Rating(user=up2, recipe=r2, rating=3)
rate3.save()

c1 = Comment(user=up1, recipe=r1, comment="delicious HAM!!!!!!!")
c1.save()
c2 = Comment(user=up2, recipe=r1, comment="Just like my neighbor used to make!!")
c2.save()
c3 = Comment(user=up2, recipe=r2, comment="Delicious chocolatey treat!")
c3.save()