import React from 'react'

import {RecipeFields} from '../components/ComponentIndex'

function CreateRecipePage() {


  return (
    <div className="main-grid">
    <div className="left-sidebar">
      {/* <NutritionSideBar nutrition={recipeNutrition} /> */}
    </div>
    <div className="main-column-top">
      <h1>Create New Recipe!</h1>

    </div>
    <div className="main-column-bottom">
      <RecipeFields />
    </div>
    <div className="right-sidebar">
      calculator for minutes-hours
    </div>
  </div>
  )
}

export default CreateRecipePage
