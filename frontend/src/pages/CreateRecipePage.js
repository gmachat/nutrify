import React, {useContext} from 'react'

import {RecipeFields, MustLogin} from '../components/ComponentIndex'
import {UserContext} from '../App'

function CreateRecipePage(props) {
  const user = useContext(UserContext)
  if (user.user ){
  return (
    <div className="main-grid">
    <div className="left-sidebar">
      {/* <NutritionSideBar nutrition={recipeNutrition} /> */}
    </div>
    <div className="main-column-top createRecipePage-header">
      <h1>Nutrify Your Recipe!</h1>

    </div>
    <div className="main-column-bottom">
      <RecipeFields props={props}/>
    </div>
    <div className="right-sidebar">
    </div>
  </div>
  )}else{
    return <MustLogin userAction="create a recipe"></MustLogin>
  }
}

export default CreateRecipePage
