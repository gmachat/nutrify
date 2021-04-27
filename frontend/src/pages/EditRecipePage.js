import React, {useContext, useState, useEffect} from 'react'

import {EditRecipeFields, MustLogin, PermissionError} from '../components/ComponentIndex'
import {getUserRecipeById} from "../api/RecipeApi"
import {UserContext} from '../App'

function EditRecipePage(props) {
  const user = useContext(UserContext)
  const [recipe, setRecipe] = useState(null)

  const getRecipe = async () => {
    let recipe = await getUserRecipeById(props.match.params.recipeId)
    setRecipe(recipe)
  } 

  useEffect(() => {
    getRecipe()
  }, [props.match.params.recipeId])


if(!user.user){
  return <MustLogin userAction="Edit a recipe"></MustLogin>
}else if(user?.user?.id !== recipe?.created_by?.user.id){
  return <PermissionError userAction={"edit this recipe"}/>
}else{
  return (
    <div className="main-grid">
    <div className="left-sidebar">
      {/* <NutritionSideBar nutrition={recipeNutrition} /> */}
    </div>
    <div className="main-column-top createRecipePage-header"><h1>Edit Your Recipe</h1> </div>
    <div className="main-column-bottom ">
    <EditRecipeFields props={{...props, recipe, userInfo:user}}/> 
    </div>
    <div className="right-sidebar">
    </div>
  </div>
  )
  }
}

export default EditRecipePage