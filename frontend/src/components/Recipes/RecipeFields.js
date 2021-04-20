import React, {Fragment, useState} from 'react'
import {createNewRecipe, getRecipeAnalysis} from '../../api/RecipeApi'
import IngredientInputs from './IngredientInputs'
import { formatRecipeForAnalysis} from '../../UtilFunctions/UtilFunctions'



function RecipeFields() {


  const [ingredientForms, setIngredientForms] = useState([{'quantity': '', 'measurement': '', 'ingredient': ''}])

  const handleRecipeSubmit = async (e) => {
    const recipeObj ={}
    let ingredients = []
    let currentIngredient = ''
    e.preventDefault()
    for(let field of e.target){
      if(field.dataset.formtype === 'ingredient'){
        currentIngredient += `${field.value}`
        ingredients.push(currentIngredient)
        currentIngredient = ''        
      }else if(field.dataset.formtype === 'measurement' || field.dataset.formtype === 'quantity'){
        currentIngredient += `${field.value} `
      }else{
        recipeObj[field.name] = field.value
      }
    }
    recipeObj['ingredients'] = ingredients
    console.log(recipeObj)
    try{
    const nutritionAnalysis= await getRecipeAnalysis(formatRecipeForAnalysis(recipeObj))
    recipeObj['nutrition'] = nutritionAnalysis
    }catch(err){
      console.error(err)
    }
    console.log(recipeObj)
    createNewRecipe(recipeObj)
  }

  const handleIngredientInput = (e) => {
    const [name, number] = e.target.name.split('-')
    const updateForms = [...ingredientForms]
    const newForm = {...updateForms[number]}
    newForm[name] = e.target.value
    updateForms[number] = newForm
    setIngredientForms(updateForms)
  }


  const addIngredientField = () => {
    setIngredientForms([...ingredientForms, {'quantity': '', 'measurement': '', 'ingredient': ''}])
  }

  const removeIngredientField = (e, index) => {
    const updateForms = [...ingredientForms]
    if(updateForms.length > 1){
    updateForms.splice(index, 1)
    setIngredientForms(updateForms)}
  }



  return (
    <form onSubmit={(e) => handleRecipeSubmit(e)}>
      <div className='form-section'>
        <label htmlFor={'title'}>Title</label>
        <input type="text" data-formtype='title' name={'title'}></input >
      </div>
      <div className='form-section'>
        <label htmlFor={'prep_time'}>Prep Time (Minutes)</label>
        <input type="number" data-formtype='prep_time' name={'prep_time'}></input >
      </div>
      <div className='form-section'>
        <label htmlFor={'cook_time'}>Cook Time (Minutes)</label>
        <input type="number" data-formtype='cook_time' name={'cook_time'}></input >
      </div>
      <div className='form-section'>
        <label htmlFor={'yields'}>Number of Servings</label>
        <input type='number' data-formtype='yields' name={'yields'}></input>
      </div>
      <div className="ingredients-list">
      <div className='form-section'>
        <IngredientInputs removeIngredientField={removeIngredientField} handleIngredientInput={handleIngredientInput} listOfInput={ingredientForms}/>
        <div onClick={() => addIngredientField ()}>Add Another Ingredient</div>
      </div>
      </div>
      <div className='form-section'>
        <label htmlFor={'preperation'}>Preperation</label>
        <textarea name={'preperation'} data-formtype='preperation' placeholder="How do you prepare this dish?"></textarea>
      </div>
        <button type="submit">Submit</button>
      </form>
  )
}

export default RecipeFields
