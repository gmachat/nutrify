import React, {useContext, useEffect, useState} from 'react'

import {getUserRecipes} from '../api/RecipeApi'
import {UserContext} from '../App'
import {Dashboard, DisplayRecipeList }from '../components/ComponentIndex'

function HomePage() {
  const [recipes, setRecipes] = useState(null)
  const [activeSearch, setActiveSearch] = useState(null)
  const userInfo = useContext(UserContext)


  const getNewRecipes = async () => {
    const newRecipes = await getUserRecipes()
    setRecipes(newRecipes)
    return newRecipes
  }

  const goBack = async (e) => {
    setActiveSearch(null)
    const newRecipes = await getUserRecipes()
    setRecipes(newRecipes)
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
        <Dashboard userInfo={userInfo} setRecipes={setRecipes} setActiveSearch={setActiveSearch}/>
      </div>
      <div className="main-column-bottom homepage-bottom">
        <h2 className="recipe-list-title">{activeSearch ? `Results for : ${activeSearch}` : 'Newest Recipes'}</h2>
        {activeSearch && <div> <span onClick={e => goBack(e)} style={{fontWeight:'900', cursor: 'pointer'}}>Back</span> to newest recipes </div>}
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
