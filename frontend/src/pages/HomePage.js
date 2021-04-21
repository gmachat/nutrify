import React, {useEffect, useState} from 'react'

import {displayRecipesInList} from '../Utils/UtilFunctions'
import {getUserRecipes} from '../api/RecipeApi'


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
        <div>Your Dashboard</div>
      </div>
      <div className="main-column-bottom">
        <h2>Recent Recipes</h2>
        {recipeList}
      </div>
      <div className="right-sidebar">
        Shortcuts
      </div>
    </div>
  )
}

export default HomePage
