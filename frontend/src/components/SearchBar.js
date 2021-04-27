import React, { Fragment, useEffect, useState } from 'react'
import {getRecipeBySearchParams} from '../api/RecipeApi'


function SearchBar({searchTerms, setSearchTerms}) {
  const [search, setSearch] = useState(searchTerms)

  const handleInputChange = (e) => {
    e.preventDefault()
    setSearch(e.target.value)
  }

  const submitSearch = async () => {
    setSearchTerms(search)
  }

  const handleClick = async (e) => {
    submitSearch()
  }

  const checkEnterPress = (e)=> {
    if(e.key === "Enter")submitSearch()
  }

  useEffect(() => {
    console.log('search change')
    setSearch(searchTerms)
  }, [searchTerms])


  return (
    <Fragment>
      <button type="submit"  onClick={e => handleClick(e)}>Search</button>
        <input type="text" placeholder="Search Recipes" className="recipe-search-home" value={search} onKeyUp={checkEnterPress} onChange={ handleInputChange} />
    </Fragment>
  )
}

export default SearchBar
