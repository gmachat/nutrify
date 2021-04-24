import React, {Fragment, useContext, useState, useCallback} from 'react'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import S3FileUpload from 'react-s3'
import Loader from "react-loader-spinner";
import {debounce} from 'lodash'


import {UserContext} from '../../App'
import {createNewRecipe, getRecipeAnalysis, recipeAutoComplete} from '../../api/RecipeApi'
import IngredientInputs from './IngredientInputs'
import { formatRecipeForAnalysis} from '../../Utils/UtilFunctions'
import {awsConfig} from '../../Utils/AWS/AWSConfig'


function RecipeFields({props}) {
  const [ingredientForms, setIngredientForms] = useState([{'quantity': '', 'measurement': '', 'ingredient': ''}])
  const [submitError, setSubmitError] = useState(null)
  const [sendingData, setSendingData] = useState(false)
  const [autoComplete, setAutoComplete] = useState('')
  const [autoCompleteList, setAutoCompleteList] = useState(null)

  const user = useContext(UserContext)
  console.log(user)
  console.log(user.user.id)


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
      }else{
        if(field.value) recipeObj[field.name] = field.value
      }
    }
    recipeObj['ingredients'] = ingredients
    console.log(recipeObj)
    setSendingData(true)
    try{
    const nutritionAnalysis= await getRecipeAnalysis(formatRecipeForAnalysis(recipeObj))
    recipeObj['nutrition'] = nutritionAnalysis
    }catch(err){
      setSendingData(false)
      setSubmitError("Could not retrieve recipe information")
      console.error(err)
    return
    }
    console.log(recipeObj)
    console.log('sending picture to s3')
    try{
      if (recipeImage) data = await S3FileUpload.uploadFile(recipeImage, awsConfig)
      console.log('data uploaded')
      console.log(data)
    }catch(err){
      setSendingData(false)
      setSubmitError("Could not upload Image. Please upload without image or try again later")
      console.error(err)
      return
    }
    console.log('storing data...')
    if(data) recipeObj['recipe_image'] = data.location.replace(/\s+/g, '%20') 
    console.log(recipeObj['recipe_image'])
    recipeObj['created_by'] = user.user.id

    const createdRecipe = await createNewRecipe(recipeObj)
    console.log(createdRecipe)
    setSendingData(false)
    props.history.push(`/recipes/${createdRecipe.id}`)
  }

  const autoCompleteGrabber = async (input) =>{
    const autoCompleteData = await recipeAutoComplete(input.target.value)
    console.log('inautocomplete')
    setAutoCompleteList(input.target.dataset.inputnumber)
    setAutoComplete(autoCompleteData)
    return autoCompleteData
  }

  const delayedSearch = useCallback(debounce(event => autoCompleteGrabber(event), 500),[])

  const handleIngredientInput = (e) => {
    console.log(e)
    const [name, number] = e.target.name.split('-')
    const updateForms = [...ingredientForms]
    const newForm = {...updateForms[number]}
    newForm[name] = e.target.value
    delayedSearch(e)
    updateForms[number] = newForm
    setIngredientForms(updateForms)
  }

  const clearAutoComplete = () => {
    setTimeout(() => {
      setAutoComplete(null)
    }, 300)
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
    <form className="create-recipe-form" onSubmit={(e) => handleRecipeSubmit(e)} >
      <h2>Show us what you got!</h2>
      {sendingData && <div className='sending-data'><Loader type="TailSpin" color="#26b421" height={80} width={80} /></div>}
      {submitError && (<div className="form-error danger">
                        <div className="close-box" onClick={() => setSubmitError(null)}>X</div>
                        <div>{submitError}</div>
                      </div>)}
      <div className='form-section'>
        <input type="text" data-formtype='title' placeholder="Name of recipe" name={'title'}></input >
      </div>
      <div className='form-section'>
        <input type="number" data-formtype='prep_time' placeholder='Prep Time' name={'prep_time'}></input >
      </div>
      <div className='form-section'>
        <input type="number" data-formtype='cook_time' placeholder="Cook time"name={'cook_time'}></input >
      </div>
      <div className='form-section'>
        <input type='number' data-formtype='yields' placeholder="Number of Servings" name={'yields'}></input>
      </div>
      <div className="ingredients-list">
      <div className='ingredient-wrapper'>
        <div>Ingredients</div>
        <IngredientInputs removeIngredientField={removeIngredientField} handleIngredientInput={handleIngredientInput} listOfInput={ingredientForms} autoCompleteList={autoCompleteList} autoComplete={autoComplete} setAutoComplete={setAutoComplete} clearAutoComplete={clearAutoComplete}/>
        <div className="add-ingredient-button" onClick={() => addIngredientField ()}>Add Ingredient</div>
      </div>
      </div>
      <div className='form-section'>
        {/* <label htmlFor={'preperation'}>Preperation</label> */}
        <textarea name={'preperation'} data-formtype='preperation' placeholder="How do you prepare this dish?"></textarea>
      </div>
      <div className="form-section">
        <input type="file" data-formtype='recipe_image' name='recipe_image' className="file-upload-button"/>
      </div>
        <button type="submit" className="recipe-submit">Nutrify!</button>
      </form>
  )
}

export default RecipeFields
