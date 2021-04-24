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
      return (<div key={`${nutrient.label}-${i}`} className={'nutrient-in-list'}>
        <span style={{fontWeight: 'bold'}}>{nutrient.label}</span> : {Math.floor(nutrient.quantity / recipe.yields)}{nutrient.unit}
      </div>
      )
    })
  }


  if(recipe && recipe.nutrition){
  const {nutrition} = recipe
  return (
    <Fragment>
    <div className="toggle-display">Display: 
      <span className={`toggle-nutrients toggle-nutrients-total ${nutrientOrDaily === 'totalNutrients' && 'toggle-button-on'}`} onClick={() => toggleNutrients('totalNutrients')}>Total</span>
      <span className={`toggle-nutrients toggle-nutrients-daily ${nutrientOrDaily === 'totalDaily' && 'toggle-button-on'}`} onClick={() => toggleNutrients('totalDaily')} >Daily</span>
    </div>
    <div className={`nutritional-info  ${nutrientOrDaily == 'totalDaily' && 'nutritional-info-daily'}`}>
      <div className="nutritional-info-top">
    <h3>Nutrition</h3>
    <div><span style={{fontWeight: "bold"}}>Calories</span> (Serving): {Math.floor(nutrition.calories / nutrition.yield)}</div>
    </div>
    <div className={`nutrient-list`}>
      {renderNutrients(recipe)}
    </div>
    </div>
    <div>

    </div>
    </Fragment>
  )}else{
    return <div>This recipe has no nutritional information to display</div>
  }
}

export default NutritionSideBar
