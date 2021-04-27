import React, {Fragment, useState} from 'react'

import {labelNutrition} from '../Utils/UtilFunctions'
import '../resources/nutritionFacts.css';


function NutritionFacts({props}) {
  const {recipe} = props
  const ntr = recipe?.nutrition
  const labeledNutrition =  labelNutrition(ntr)

  const [totalOrServing, setTotalOrServing] = useState('total')



  const toggleTotalOrServing = (newSet) => {
    setTotalOrServing(newSet)
  }




  if(ntr){
    if(totalOrServing == 'serving'){
      for(let nutrientValue of Object.keys(labeledNutrition)){
        labeledNutrition[nutrientValue] = Math.round(labeledNutrition[nutrientValue] / recipe.yields)
      }
      console.log(labeledNutrition)
    }
 
  return (
    <div className={`nutritionfacts-container ${totalOrServing == 'serving' && 'nutritionfacts-container-serving' }`}>
      <div className="toggle-serving-display">
      <span className={`toggle-serving-type toggle-nutrition-facts-total ${totalOrServing === 'total' && 'toggle-button-on'}`} onClick={() => toggleTotalOrServing('total')} >Total Meal</span>
      <span className={`toggle-serving-type toggle-nutrition-facts-serving ${totalOrServing === 'serving' && 'toggle-button-on'}`} onClick={() => toggleTotalOrServing('serving')}>Per Serving</span>
      </div>
    <div id="nutritionfacts">
        <table cellspacing="0" cellPadding="0">
            <tbody>
              <tr>
                <td align="center" class="nutrition-header">Nutrition Facts</td>
              </tr>
              { totalOrServing == 'serving' ? (
              <tr>
                <td><div class="serving">Per <span class="highlighted">{labeledNutrition.servingSizeWeight}g</span> Serving Size</div></td>
              </tr>)
              : (
                <tr>
                <td><div class="serving"><span class="highlighted">Total ({recipe.yields} servings)</span></div></td>
              </tr>
              )
              }
              <tr style={{height: "7px"}}>
                <td style={{backgroundColor: "#000000"}}></td>
              </tr>
              <tr>
                <td style={{fontSize: "7pt"}}><div class="line-nutrition">Amount Per Serving</div></td>
              </tr>
              <tr>
                <td>
                    <div class="line-nutrition">
                    <div class="label">Calories <div class="weight">{labeledNutrition.calories}</div></div><div style={{paddingTop: "1px", float: "right"}} class="labellight">Calories from Fat <div class="weight">{labeledNutrition.caloriesFromFat}</div></div>
                    </div>
                </td>
              </tr>
              <tr>
                <td><div class="line-nutrition"><div class="dvlabel">% Daily Value<sup>*</sup></div></div></td>
              </tr>
              <tr>
                <td>
                    <div class="line-nutrition">
                    <div class="label">Total Fat <div class="weight">{labeledNutrition.totalFat}g</div></div>
                    <div class="dv">{labeledNutrition.totalFatPct}%</div>
                    </div>
                </td>
              </tr>
              <tr>
                <td class="indent">
                    <div class="line-nutrition">
                    <div class="labellight">Saturated Fat <div class="weight">{labeledNutrition.satFat}g</div></div>
                    <div class="dv">{labeledNutrition.satFat}%</div>
                    </div>
                </td>
              </tr>
              <tr>
                <td class="indent">
                    <div class="line-nutrition">
                    <div class="labellight">Monounsaturated Fat <div class="weight">{labeledNutrition.monoFat}g</div></div>
                    </div>
                </td>
              </tr>
              <tr>
              <td class="indent">
                    <div class="line-nutrition">
                    <div class="labellight">Polyunsaturated Fat <div class="weight">{labeledNutrition.polyFat}g</div></div>
                    </div>
                </td>
              </tr>
              <tr>
                <td class="indent">
                    <div class="line-nutrition">
                    <div class="labellight"><i>Trans</i> Fat <div class="weight">{labeledNutrition.transFat}g</div></div>
                    </div>
                </td>
              </tr>
              <tr>
                <td>
                    <div class="line-nutrition">
                    <div class="label">Cholesterol <div class="weight">{labeledNutrition.cholesterol}mg</div></div>
                    <div class="dv">{labeledNutrition.cholesterolPct}%</div>
                    </div>
                </td>
              </tr>
              <tr>
                <td>
                    <div class="line-nutrition">
                    <div class="label">Sodium <div class="weight">{labeledNutrition.sodium}mg</div></div>
                    <div class="dv">{labeledNutrition.sodiumPct}%</div>
                    </div>
                </td>
              </tr>
              <tr>
                <td>
                    <div class="line-nutrition">
                    <div class="label">Total Carbohydrates <div class="weight">{labeledNutrition.carbs}g</div></div>
                    <div class="dv">{labeledNutrition.carbsPct}%</div>
                    </div>
                </td>
              </tr>
              <tr>
                <td class="indent">
                    <div class="line-nutrition">
                    <div class="labellight">Dietary Fiber <div class="weight">{labeledNutrition.fiber}g</div></div>
                    <div class="dv">{labeledNutrition.fiberPct}%</div>
                </div></td>
              </tr>
              <tr>
                <td class="indent">
                    <div class="line-nutrition">
                    <div class="labellight">Sugars <div class="weight">{labeledNutrition.sugar}g</div></div>
                    </div>
                </td>
              </tr>
              <tr>
                <td class="indent">
                    <div class="line-nutrition">
                    <div class="labellight">Added Sugars <div class="weight">{labeledNutrition.addedSugar}g</div></div>
                    </div>
                </td>
              </tr>
              <tr>
                <td class="indent">
                    <div class="line-nutrition">
                    <div class="label">Protein <div class="weight">{labeledNutrition.protein}g</div></div>
                    <div class="dv">{labeledNutrition.proteinPct}%</div>
                </div></td>
              </tr>
              <tr style={{height: "7px"}}>
                <td style={{backgroundColor:"#000000"}}></td>
              </tr>
              <tr>
                <td>
                  <table cellspacing="0" cellPadding="0" border="0" class="vitamins">
                    <tbody>
                      <tr>
                          <td>Vitamin A &nbsp;&nbsp; {labeledNutrition.vitaminAPct}%</td>
                          <td align="center">•</td>
                          <td align="right">Calcium &nbsp;&nbsp; {labeledNutrition.calciumPct}%</td>
                      </tr>
                      <tr>
                          <td>Vitamin B6 &nbsp;&nbsp; {labeledNutrition.vitaminB6Pct}%</td>
                          <td align="center">•</td>
                          <td align="right">Iron &nbsp;&nbsp; {labeledNutrition.ironPct}%</td>
                      </tr>
                      <tr>
                          <td>Vitamin B12 &nbsp;&nbsp; {labeledNutrition.vitaminB12Pct}%</td>
                          <td align="center">•</td>
                          <td align="right">Potassium &nbsp;&nbsp; {labeledNutrition.potassiumPct}%</td>
                      </tr>
                      <tr>
                            <td>Vitamin C &nbsp;&nbsp; {labeledNutrition.vitaminCPct}%</td>
                            <td align="center">•</td>
                            <td align="right">Folate &nbsp;&nbsp; {labeledNutrition.folatePct}%</td>
                      </tr>
                      <tr>
                            <td>Vitamin D &nbsp;&nbsp; {labeledNutrition.vitaminDPct}%</td>
                            <td align="center">•</td>
                            <td align="right">Magnesium &nbsp;&nbsp; {labeledNutrition.magnesiumPct}%</td>
                      </tr>                            
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr>
                <td>
                  <div class="line-nutrition">
                    <div class="labellight">* Based on a regular <a href="#">2000 calorie diet</a>
                      <br/>
                      <br/>
                      <i>Nutritional details are an estimate and should only be used as a guide for approximation.</i>
                    </div>
                  </div>
                </td>
                </tr>
        </tbody>
        </table>
    </div>
    </div>
  )
  }else{
    return <div>No nutrition Information to display</div>
  }
}

export default NutritionFacts
