import React, {useContext, useEffect, useState} from 'react'
import {Link, Redirect} from 'react-router-dom'

import defaultImage from '../resources/images/default_recipe_image.jpeg'
import {UserContext} from '../App'
import {getUserRecipeById, getSingleIngredient, getUserRecipes} from '../api/RecipeApi'
import {DisplayRecipeList, NutritionSideBar, NutritionFacts, FullScreenConfirmation } from '../components/ComponentIndex'
import QRCode from 'qrcode'
import {NotFoundPage} from './PageIndex'
import { getMainHealthLabels } from '../Utils/UtilFunctions'


function RecipePage(props) {
  const [recipe, setRecipe] = useState(null)
  // const [similiarRecipes, setSimiliarRecipes] = useState(null)
  const [selectedIngredient, setSelectedIngredient] = useState(null)
  const [recipeCode, setRecipeCode] = useState(null)
  const [deleteWarning, setDeleteWarning] = useState(null)


  const userInfo = useContext(UserContext)
  const getCode = async () => {
    let code
    try {
      code = await QRCode.toDataURL(window.location.href)
    } catch (err) {
      console.error(err)
    }
    setRecipeCode(code)
    return code
  }
  useEffect(() => {
    getCode()
  },[props.match.params.recipeId])

  const getRecipe = async () => {
    let recipe = await getUserRecipeById(props.match.params.recipeId)
    setRecipe(recipe)
  } 

  // const getRelatedRecipes = async () => {
  //   let recipeRes = await getUserRecipes()
  //   setSimiliarRecipes(recipeRes)
  // }


  useEffect(() => {
    getRecipe()
  }, [props.match.params.recipeId])

  const renderIngredients = () => {
    if(recipe && recipe.ingredients){
      return recipe.ingredients.map((ing, i) => {
        
        return <div key={`ingredient-${i}`}>{ing}</div>
      })
    }
  }
  if(!recipe || recipe.detail === "Not found."){
    return <div>Recipe Not Found</div>
  }
  return (
    <div className="main-grid">
      {deleteWarning && <FullScreenConfirmation props={{...props, userInfo, message: `Are you sure you want to delete ${recipe.title}"?`, setDeleteWarning, recipeId: recipe.id}}/>}
      <NutritionSideBar recipe={recipe} />
      <div className="main-column-top">
        <div className="recipe-main-info">
        <div className="recipe-main-info-left primary-backdrop primary-on-secondary" >
          <h2 className="main-header recipe-header secondary-backdrop secondary-on-primary">{recipe?.title}</h2>
          <div className='recipe-subinfo-wrapper  secondary-backdrop text-section secondary-on-primary'>
          <div className="recipe-subinfo">
          <div className="creator-name">
          <div className={"creator-link"}>
            by:  
            <Link to={`/profiles/${recipe?.created_by?.user?.id}`} className="mid-sentence-link-secondary"> {recipe?.created_by?.user?.username} </Link>
          </div>
          
            {recipe?.created_by?.user?.id == userInfo?.user?.id && 
            <div className="creator-control-buttons">
              <Link to={`/recipes/${recipe.id}/edit`} className={"edit-button"}>
                Edit
              </Link>
              <div className={'delete-button'} onClick={() => setDeleteWarning(true)}>
                Delete
              </div>
            </div>
            }

          </div>
          <br />
            <div>Prep Time: {recipe?.prep_time} minutes</div>
            <div>Cook Time: {recipe?.cook_time} minutes</div>
            <div>Yields {recipe?.yields} servings</div>
            <br />
            
            </div>
            <div className="recipe-subinfo-labels">{getMainHealthLabels(recipe)}</div>
          </div>
        </div>
        <div className="recipe-main-info-right" >
          <img className="recipe-image" src={recipe?.recipe_image ? recipe.recipe_image : defaultImage} />

        </div>
        </div>
      </div>
      <div className="main-column-bottom">
        <div className=" recipepage-bottom">
          <div className='primary-backdrop text-section primary-on-secondary ingredient-container'>
            <h2 className="secondary-backdrop secondary-on-primary recipe-subheader">Ingredients</h2>
            <div className="recipe-ingredient-list secondary-backdrop text-section secondary-on-primary">
              {renderIngredients()}
            </div>
          </div>
          <div className="primary-backdrop text-section primary-on-secondary"> 
            <h2 className="secondary-backdrop secondary-on-primary  recipe-subheader">Preperation</h2>
            <div className="secondary-backdrop text-section secondary-on-primary">{recipe.preperation ? recipe.preperation : 'User did not provide preperation steps'}</div>
          </div>
       </div>

       <div className="recipepage-bottom related-recipe">
        <h2 className="primary-backdrop primary-on-secondary recipe-header">Other recipes to try</h2>
        <div className="main-recipe-list">
       <DisplayRecipeList startLimit={5} recipeId={recipe.id}/>

       </div>
       </div>
      </div>
      <div className="right-sidebar recipepage-right-sidebar">
        <div className='qr-section-containter secondary-backdrop text-section secondary-on-primary'>
        <h3>Get recipe on your phone!</h3>
        <div>
          {recipeCode && <img src={recipeCode} className="qr-code"/>}
        </div>
        </div>
        <div>
          <NutritionFacts props={{...props, recipe}} />
        </div>
      </div>
    </div>
  )
}

export default RecipePage
