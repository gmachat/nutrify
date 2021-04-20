import React, {useEffect, useState} from 'react'
import {getUserRecipeById} from '../api/RecipeApi'
import {NutritionSideBar} from '../components/ComponentIndex'


function RecipePage(props) {
  const [recipe, setRecipe] = useState(null)


  const recipeId = props.match.params.recipeId

  const getRecipe = async () => {
    console.log(recipeId)
    let recipe = await getUserRecipeById(recipeId)
    console.log(recipe)
    setRecipe(recipe)
  } 


  useEffect(() => {
    getRecipe()
  }, [])

  const renderIngredients = () => {
    if(recipe && recipe.ingredients){
      return recipe.ingredients.map((ing, i) => {
        return <div key={`ingredient-${i}`}>{ing}</div>
      })
    }
  }
  console.log(recipe)
  if(!recipe || recipe.detail === "Not found."){
    return <div>Recipe Not Found</div>
  }

  return (
    <div className="main-grid">
      <div className="left-sidebar">
        <NutritionSideBar recipe={recipe} />
      </div>
      <div className="main-column-top">
        <h1>{recipe?.title}</h1>
        <div>Prep Time: {recipe?.prep_time} minutes</div>
        <div>Cook Time: {recipe?.cook_time} minutes</div>
        <div>Yields {recipe?.yields} servings</div>
      </div>
      <div className="main-column-bottom">
        <h2>Ingredients</h2>
        <div className="recipe-ingredient-list">
          {renderIngredients()}
        </div>
      </div>
      <div className="right-sidebar">
      </div>
    </div>
  )
}

export default RecipePage
