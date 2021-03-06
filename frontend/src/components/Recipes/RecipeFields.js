import React, {Fragment, useContext, useState, useCallback, useEffect} from 'react'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import S3FileUpload from 'react-s3'
import Loader from "react-loader-spinner";


import {UserContext} from '../../App'
import {createNewRecipe, getRecipeAnalysis, recipeAutoComplete} from '../../api/RecipeApi'
import IngredientInputs from './IngredientInputs'
import { formatRecipeForAnalysis} from '../../Utils/UtilFunctions'
import {awsConfig} from '../../Utils/AWS/AWSConfig'


function RecipeFields({props}) {
  const [ingredientForms, setIngredientForms] = useState([{'quantity': '', 'measurement': '', 'ingredient': ''}])
  const [submitError, setSubmitError] = useState(null)
  const [sendingData, setSendingData] = useState(false)
  const [attempt, setAttempt] = useState(0)

  const user = useContext(UserContext)



  const handleRecipeSubmit = async (e) => {
    setSubmitError(null)
    const recipeObj ={}
    let recipeImage;
    let ingredients = []
    let currentIngredient = ''
    let data;
    e.preventDefault()
    for(let field of e.target){
      if(field.dataset.formtype === 'ingredient'){
        currentIngredient += `${field.value}`
        ingredients.push(currentIngredient)
        currentIngredient = ''        
      }else if(field.dataset.formtype === 'measurement' || field.dataset.formtype === 'quantity'){
        currentIngredient += `${field.value} `
      }else if(field.dataset.formtype === 'recipe_image'){
        recipeImage = field.files[0]
      }else if(!field.name){
        continue
      }else if(field.dataset.formtype === 'title'){
        const title = field.value.toLowerCase()
        recipeObj['title'] = title
      }else{
        if(field.value) recipeObj[field.name] = field.value
      }
    }
    recipeObj['ingredients'] = ingredients
    setSendingData(true)
    try{
    const nutritionAnalysis= await getRecipeAnalysis(formatRecipeForAnalysis(recipeObj))
    if(nutritionAnalysis?.error && attempt == 0){
      setSubmitError("Could not retrieve recipe nutrition,  ensure you have filled out fields correctly.  If you want to submit without nutrition, resubmit your recipe")
      setAttempt(attempt+ 1)
      setSendingData(false)
      return
    }
    recipeObj['nutrition'] = nutritionAnalysis
    }catch(err){
      setSendingData(false)
      setSubmitError("Could not retrieve recipe information")
      console.error(err)
    return
    }

    try{
      if (recipeImage) data = await S3FileUpload.uploadFile(recipeImage, awsConfig)

    }catch(err){
      setSendingData(false)
      setSubmitError("Could not upload Image. Please upload without image or try again later")
      console.error(err)
      return
    }
    if(data) recipeObj['recipe_image'] = data.location.replace(/\s+/g, '%20') 
    recipeObj['created_by'] = user.user.id

    const createdRecipe = await createNewRecipe(recipeObj)
    setSendingData(false)
    props.history.push(`/recipes/${createdRecipe.id}`)
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

  useEffect(() => {
    setAttempt(0)
  }, [ingredientForms])


  return (
    <div className="primary-backdrop primary-on-secondary create-form-container">
    <form className="create-recipe-form " onSubmit={(e) => handleRecipeSubmit(e)} >
      <h2>Show us what you got!</h2>
      {sendingData && <div className='sending-data'><Loader type="TailSpin" color="#26b421" height={80} width={80} /></div>}
      {submitError && (<div className="form-error danger">
                        <div className="close-box" onClick={() => setSubmitError(null)}>X</div>
                        <div>{submitError}</div>
                      </div>)}
      <div className='form-section'>
        <input type="text" data-formtype='title' placeholder="Name of recipe" name={'title'} autoComplete="off"></input >
      </div>
      <div className='form-section'>
        <input type="number" data-formtype='prep_time' placeholder='Prep Time' name={'prep_time'} autoComplete="off"></input >
      </div>
      <div className='form-section'>
        <input type="number" data-formtype='cook_time' placeholder="Cook time"name={'cook_time'} autoComplete="off"></input >
      </div>
      <div className='form-section'>
        <input type='number' data-formtype='yields' placeholder="Number of Servings" name={'yields'} autoComplete="off"></input>
      </div>
      <div className="ingredients-list">
      <div className='ingredient-wrapper'>
        <div style={{textAlign:"center"}}>Ingredients</div>
        <IngredientInputs removeIngredientField={removeIngredientField} setIngredientForms={setIngredientForms} ingredientForms={ingredientForms}  />
        <div className="add-ingredient-button-container">
        <div className="add-ingredient-button" onClick={() => addIngredientField ()}>Add Ingredient</div>
        </div>
      </div>
      </div>
      <div className='form-section'>
        <textarea name={'preperation'} data-formtype='preperation' placeholder="How do you prepare this dish?"></textarea>
      </div>
      <div className="form-section">
        <input type="file" data-formtype='recipe_image' name='recipe_image' className="file-upload-button"/>
      </div>
        <button type="submit" className="recipe-submit">Nutrify!</button>
      </form>
      </div>
  )
}

export default RecipeFields
