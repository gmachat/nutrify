import React, {useContext, useEffect, useState} from 'react'

import {getUserRecipes} from '../api/RecipeApi'
import {UserContext} from '../App'
import {Dashboard, DisplayRecipeList }from '../components/ComponentIndex'

function HomePage() {
  // const [activeSearch, setActiveSearch] = useState(null)
  const [searchTerms, setSearchTerms] = useState('')
  const userInfo = useContext(UserContext)
  


  return (
    <div className="main-grid">
      <div className="left-sidebar">
      </div>
      <div className="homepage-top">
        <Dashboard userInfo={userInfo} searchTerms={searchTerms} setSearchTerms={setSearchTerms} />
      </div>
      <div className="main-column-bottom homepage-bottom">
        <h2 className="recipe-list-title ">{searchTerms ? `Results for : ${searchTerms}` : 'Newest Recipes'}</h2>
        <div className="main-recipe-list">
        <DisplayRecipeList searchTerms={searchTerms} setSearchTerms={setSearchTerms} startLimit={10} allowLoadMore={true} searchTerms={searchTerms}/>
        </div>
      </div>
      <div className="right-sidebar">
      </div>
    </div>
  )
}

export default HomePage
