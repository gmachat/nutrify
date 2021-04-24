import React from 'react'

import { handleRecipeSearch} from '../Utils/UtilFunctions'
import SearchBar from './SearchBar'

function Dashboard({userInfo, setRecipes, setActiveSearch}) {



  console.log('homepage', userInfo)
  if(userInfo?.isLoggedIn){
  return (
    <div className="dashboard-main">
      <div className="dashboard-inner" >
      <h3>Welcome {userInfo?.user?.username}</h3>
      <div className="recipe-search-home-container">
        <SearchBar setRecipes={setRecipes} setActiveSearch={setActiveSearch} />
      </div>
      </div>
    </div>
  )
  }else{
    return <div></div>
  }
}

export default Dashboard
