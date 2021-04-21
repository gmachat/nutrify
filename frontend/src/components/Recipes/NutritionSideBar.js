import React, { Fragment, useEffect, useState } from 'react'

function NutritionSideBar({recipe}) {
  const [nutrientOrDaily, setNutrientOrDaily] = useState('totalNutrients')

  const toggleNutrients = (newSet) => {
    setNutrientOrDaily(newSet)
  }


  const renderNutrients = (recipe) => {
    const nutritionObj = recipe.nutrition[nutrientOrDaily]
    //divide by servings
    return Object.values(nutritionObj).map((nutrient, i) => {
      return (<div key={`${nutrient.label}-${i}`}>
        {nutrient.label} : {Math.floor(nutrient.quantity / recipe.yields)}{nutrient.unit}
      </div>
      )
    })
  }


  if(recipe && recipe.nutrition){
  const {nutrition} = recipe
  return (
    <Fragment>
    <div className="toggle-display">Display: 
      <span className={`toggle-nutrients ${nutrientOrDaily === 'totalNutrients' ? 'toggle-nutrients-on' : ""}`} onClick={() => toggleNutrients('totalNutrients')}>Total</span>
      <span className={`toggle-nutrients ${nutrientOrDaily === 'totalDaily' ? 'toggle-nutrients-on' : ""}`} onClick={() => toggleNutrients('totalDaily')} >Daily</span>
    </div>
    <h3>Nutrition</h3>
    <div>Calories (Serving): {Math.floor(nutrition.calories / nutrition.yield)}</div>
    <div className="nutrient-list">
      {renderNutrients(recipe)}
    </div>
    <div>

    </div>
    </Fragment>
  )}else{
    return <div>This recipe has no nutritional information to display</div>
  }
}

export default NutritionSideBar
