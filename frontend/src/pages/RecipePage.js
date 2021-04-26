import React, {useContext, useEffect, useState} from 'react'
import {Link} from 'react-router-dom'

import defaultImage from '../resources/images/default_recipe_image.jpeg'
import {UserContext} from '../App'
import {getUserRecipeById, getSingleIngredient, getUserRecipes} from '../api/RecipeApi'
import {DisplayRecipeList, NutritionSideBar, NutritionFacts} from '../components/ComponentIndex'
import QRCode from 'qrcode'


function RecipePage(props) {
  const [recipe, setRecipe] = useState(null)
  const [similiarRecipes, setSimiliarRecipes] = useState(null)
  const [selectedIngredient, setSelectedIngredient] = useState(null)
  const [recipeCode, setRecipeCode] = useState(null)

  const userInfo = useContext(UserContext)
  console.log(userInfo)
  const getCode = async () => {
    let code
    try {
      code = await QRCode.toDataURL(window.location.href)
      console.log(code)
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

  const getRelatedRecipes = async () => {
    let recipeRes = await getUserRecipes()
    setSimiliarRecipes(recipeRes)
  }


  useEffect(() => {
    getRecipe()
    getRelatedRecipes()
  }, [props.match.params.recipeId])

  const renderIngredients = () => {
    if(recipe && recipe.ingredients){
      return recipe.ingredients.map((ing, i) => {
        
        return <div key={`ingredient-${i}`}>{ing}</div>
      })
    }
  }
  console.log(recipe)
  if(!recipe || recipe.detail === "Not found."){
    return <div>Recipe Not Found</div>
  }
  console.log(similiarRecipes)
  return (
    <div className="main-grid">
        <NutritionSideBar recipe={recipe} />
      <div className="main-column-top">
        <div className="recipe-main-info">
        <div className="recipe-main-info-left" >
        <h2 className="main-header recipe-header">{recipe?.title}</h2>
        <div className="creator-name"><Link to={`/profiles/${recipe?.created_by?.user?.id}`}>by: {recipe?.created_by?.user?.username} </Link>{recipe?.created_by?.user?.id == userInfo?.user?.id && <span style={{color: 'var(--primary-color)'}}>(<Link to={`/recipes/${recipe.id}/edit`} className={"mid-sentence-link-secondary"}>Edit</Link>)</span>}</div>
        <div className="recipe-subinfo">
          <div>Prep Time: {recipe?.prep_time} minutes</div>
          <div>Cook Time: {recipe?.cook_time} minutes</div>
          <div>Yields {recipe?.yields} servings</div>
          </div>
        </div>
        <div className="recipe-main-info-right" >
          <img className="recipe-image" src={recipe?.recipe_image ? recipe.recipe_image : defaultImage} />
        </div>
        </div>
      </div>
      <div className="main-column-bottom">
        <div className=" recipepage-bottom">
        <h2>Ingredients</h2>
        <div className="recipe-ingredient-list">
          {renderIngredients()}
        </div>
        <div>
          <h2>Preperation</h2>
          {recipe.preperation ? recipe.preperation : <div>User did not provide preperation steps </div>}
        </div>
       </div>

       <div className="recipepage-bottom related-recipe">
        <h2>Other recipes to try</h2>
        <div className="main-recipe-list">
       {similiarRecipes && <DisplayRecipeList recipeList={similiarRecipes} startLimit={4}/>}

       </div>
       </div>
      </div>
      <div className="right-sidebar recipepage-right-sidebar">
        <div className='qr-section-containter'>
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
