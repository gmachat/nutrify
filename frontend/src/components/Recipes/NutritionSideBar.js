import React, { Fragment, useEffect, useState } from 'react'

function NutritionSideBar({recipe}) {
  const [nutrientOrDaily, setNutrientOrDaily] = useState('totalNutrients')
  const [totalOrServing, setTotalOrServing] = useState('total')

  const toggleTotalOrServing = (newSet) => {
    setTotalOrServing(newSet)
  }
  const toggleNutrients = (newSet) => {
    setNutrientOrDaily(newSet)
  }


  const renderNutrients = (recipe) => {
    const nutritionObj = recipe.nutrition[nutrientOrDaily]
    //divide by servings
    return Object.values(nutritionObj).map((nutrient, i) => {
      return (<div key={`${nutrient.label}-${i}`} className={'nutrient-in-list'}>
        <span style={{fontWeight: 'bold'}}>{nutrient.label}</span> : {totalOrServing === 'total' ? Math.round(nutrient.quantity) : Math.round(nutrient.quantity / recipe.yields)}{nutrient.unit}
      </div>
      )
    })
  }


  if(recipe && recipe.nutrition){
  const {nutrition} = recipe
  return (
  <div className={`left-sidebar recipepage-left-sidebar ${totalOrServing === 'serving' && 'side-bar-serving'} `}>
    <div className={`nutritional-info  ${nutrientOrDaily == 'totalDaily' && 'nutritional-info-daily'}`}>
      <div className="toggle-display">
      <div>
        <span className={`toggle-nutrients toggle-nutrients-total ${nutrientOrDaily === 'totalNutrients' && 'toggle-button-on'}`} onClick={() => toggleNutrients('totalNutrients')}>Total Nutrients</span>
        <span className={`toggle-nutrients toggle-nutrients-daily ${nutrientOrDaily === 'totalDaily' && 'toggle-button-on'}`} onClick={() => toggleNutrients('totalDaily')} >Daily Percent</span>
      </div>
      <div>
        <span className={`toggle-serving-type toggle-nutrients-total-secondary ${totalOrServing === 'total' && 'toggle-button-on'}`} onClick={() => toggleTotalOrServing('total')} >Total Meal</span>
        <span className={`toggle-serving-type toggle-nutrients-serving-secondary   ${totalOrServing === 'serving' && 'toggle-button-on'}`} onClick={() => toggleTotalOrServing('serving')}>Per Serving</span>
      </div>
      </div>

      <div className="nutritional-info-top">
        <h3>Nutrient Breakdown</h3>
        {/* <div><span style={{fontWeight: "bold"}}>Calories</span> (Serving): {Math.floor(nutrition.calories / nutrition.yield)}</div> */}
      </div>
      <div className={`nutrient-list`}>
        {renderNutrients(recipe)}
      </div>
    </div>
    <div>

    </div>
    </div>
  )}else{
    return <div>This recipe has no nutritional information to display</div>
  }
}

export default NutritionSideBar
