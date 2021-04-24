import React, {useContext, useEffect, useState} from 'react'

import {getUserRecipes} from '../api/RecipeApi'
import {Dashboard, DisplayRecipeList }from '../components/ComponentIndex'

function HomePage() {
  const [recipes, setRecipes] = useState(null)


  const getNewRecipes = async () => {
    const newRecipes = await getUserRecipes()
    setRecipes(newRecipes)
    return newRecipes
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
        <DisplayRecipeList recipeList={recipes} startLimit={10} allowLoadMore={true}/>
        </div>
      </div>
      <div className="right-sidebar">
        Shortcuts
      </div>
    </div>
  )
}

export default HomePage
