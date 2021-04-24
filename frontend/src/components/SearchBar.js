import React, { Fragment, useState } from 'react'
import {getRecipeBySearchParams} from '../api/RecipeApi'


function SearchBar({setRecipes, setActiveSearch}) {
  const [search, setSearch] = useState('')

  const handleInputChange = (e) => {
    e.preventDefault()
    setSearch(e.target.value)
  }

  const handleClick = async (e) => {
    const recipes = await getRecipeBySearchParams(search)
    setRecipes(recipes)
    setActiveSearch(search)

  }



  return (
    <Fragment>
      <button type="submit" onClick={e => handleClick(e)}>Search</button>
        <input type="text" placeholder="Search Recipes" className="recipe-search-home"  onChange={e => handleInputChange(e)} />
    </Fragment>
  )
}

export default SearchBar
