# Generated by Django 3.2 on 2021-04-20 14:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('nutrify', '0002_recipe_nutrition'),
    ]

    operations = [
        migrations.AddField(
            model_name='recipe',
            name='preperation',
            field=models.TextField(null=True),
        ),
    ]
