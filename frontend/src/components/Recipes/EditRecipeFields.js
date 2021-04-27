import React, {Fragment, useContext, useState, useCallback, useEffect, useRef} from 'react'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import S3FileUpload from 'react-s3'
import Loader from "react-loader-spinner";


import {UserContext} from '../../App'
import {updateRecipe, getRecipeAnalysis, recipeAutoComplete} from '../../api/RecipeApi'
import IngredientInputs from './IngredientInputs'
import { formatRecipeForAnalysis} from '../../Utils/UtilFunctions'
import {awsConfig} from '../../Utils/AWS/AWSConfig'


function EditRecipeFields({props}) {
  const {recipe} = props

  const [ingredientForms, setIngredientForms] = useState([{'quantity': '', 'measurement': '', 'ingredient': ''}])
  const [submitError, setSubmitError] = useState(null)
  const [sendingData, setSendingData] = useState(false)
  const [attempt, setAttempt] = useState(0)
  const [editedRecipe, setEditedRecipe] = useState(recipe)
  const ingredientValues = useRef({});

  console.log('render', ingredientValues)
  const handleNormalFieldInputs = (e) => {
    e.preventDefault()
    let edit = {...editedRecipe}
    edit[e.target.dataset.formtype] = e.target.value
    console.log(edit)
    setEditedRecipe(edit)
  }


  console.log(recipe.ingredients)
  const fillIngredientForms = () => {
    const filledForms = []
    for(let ingredient of recipe.ingredients){
      let splitIngredient = ingredient.split(' ')
      let fraction = 0
      let quantity = splitIngredient[0]
      if(/^([1-9]{0,3})(\/)?([2,3,4,8])?$/.test(splitIngredient[1])){
        quantity+= ` ${splitIngredient[1]}`
        console.log(quantity)
        fraction += 1
      }



      let fillableIngredientForm = {
      'quantity': quantity,
      'measurement': splitIngredient[1 + fraction],
      'ingredient': splitIngredient.slice(2 + fraction).join(' ')
    }
    filledForms.push(fillableIngredientForm)
    }
    ingredientValues.current = filledForms
    setIngredientForms(filledForms)
  }



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
      }else if(field.dataset.formtype === 'title'){
        const title = field.value.toLowerCase()
        console.log(title)
        recipeObj['title'] = title
      }else{
        if(field.value) recipeObj[field.name] = field.value
      }
    }
    
    recipeObj['ingredients'] = ingredients

    let ingredientChanges;
    for(let i =0; i < recipeObj['ingredients'].length; i++){
      if(recipeObj['ingredients'][i] !== recipe['ingredients'][i]){
        console.log('changedetected')
        ingredientChanges = true
    }
    setSendingData(true)
    console.log('ingredientchange?', ingredientChanges)
    if(ingredientChanges){
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
    }else{
      console.log('fetching old nutrients')
      recipeObj['nutrition'] = recipe['nutrition']
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


    const updatedRecipe = await updateRecipe(recipeObj, recipe.id)
    console.log(updatedRecipe)
    setSendingData(false)
    props.history.push(`/recipes/${recipe.id}`)
  }
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

  useEffect(() => {
    fillIngredientForms()
  }, [])


  return (
    <div className="primary-backdrop primary-on-secondary create-form-container">

    <form className="create-recipe-form" onSubmit={(e) => handleRecipeSubmit(e)} >
      {sendingData && <div className='sending-data'><Loader type="TailSpin" color="#26b421" height={80} width={80} /></div>}
      {submitError && (<div className="form-error danger">
                        <div className="close-box" onClick={() => setSubmitError(null)}>X</div>
                        <div>{submitError}</div>
                      </div>)}
      <div className='form-section'>
        <input type="text" data-formtype='title' placeholder="Name of recipe" name={'title'} onChange={e => handleNormalFieldInputs(e)} value={editedRecipe.title}></input >
      </div>
      <div className='form-section'>
        <input type="number" data-formtype='prep_time' placeholder='Prep Time' name={'prep_time'} onChange={e => handleNormalFieldInputs(e)} value={editedRecipe.prep_time}></input >
      </div>
      <div className='form-section'>
        <input type="number" data-formtype='cook_time' placeholder="Cook time"name={'cook_time'} onChange={e => handleNormalFieldInputs(e)} value={editedRecipe.cook_time}></input >
      </div>
      <div className='form-section'>
        <input type='number' data-formtype='yields' placeholder="Number of Servings" name={'yields'} onChange={e => handleNormalFieldInputs(e)} value={editedRecipe.yields}></input>
      </div>
      <div className="ingredients-list">
      <div className='ingredient-wrapper'>
        <div>Ingredients</div>
        <IngredientInputs removeIngredientField={removeIngredientField} setIngredientForms={setIngredientForms} ingredientForms={ingredientForms}  />
        <div className="add-ingredient-button" onClick={() => addIngredientField ()}>Add Ingredient</div>
      </div>
      </div>
      <div className='form-section'>
        {/* <label htmlFor={'preperation'}>Preperation</label> */}
        <textarea name={'preperation'} data-formtype='preperation' placeholder="How do you prepare this dish?" onChange={e => handleNormalFieldInputs(e)} value={editedRecipe.preperation}></textarea>
      </div>
      <div className="form-section form-section-image">
        <div>Current Recipe Image</div>
        <div className="recipe-image-edit">
        <img className="recipe-image-edit-display" src={props.recipe?.recipe_image} />
        </div>
        <input type="file" data-formtype='recipe_image' name='recipe_image' className="file-upload-button"/>
      </div>
        <button type="submit" className="recipe-submit">Submit Changes!</button>
      </form>
      </div>
  )
}

export default EditRecipeFields