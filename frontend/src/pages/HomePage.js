import React, {useContext, useEffect, useState} from 'react'

import {displayRecipesInList} from '../Utils/UtilFunctions'
import {getUserRecipes} from '../api/RecipeApi'
import Dashboard from '../components/Dashboard'

function HomePage() {
  const [recipes, setRecipes] = useState(null)
  let recipeList


  const getNewRecipes = async () => {
    const newRecipes = await getUserRecipes()
    setRecipes(newRecipes)
    return newRecipes
  }

  
  if(recipes) {
   recipeList = displayRecipesInList(recipes)
  }

  useEffect(() => { 
    getNewRecipes()
  }, [])

  return (
    <div className="main-grid">
      <div className="left-sidebar">
        Nutrition News
      </div>
      <div className="main-column-top">
        <Dashboard />
      </div>
      <div className="main-column-bottom homepage-bottom">
        <h2 className="recipe-list-title">Recent Recipes</h2>
        <div className="main-recipe-list">
        {recipeList}
        </div>
      </div>
      <div className="right-sidebar">
        Shortcuts
      </div>
    </div>
  )
}

export default HomePage
