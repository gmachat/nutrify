import {Link} from 'react-router-dom'
import defaultImage from '../resources/images/default_recipe_image.jpeg'


export const formatRecipeForAnalysis = (recipeObj) => {
  const analysisObj = {
    "title": recipeObj.title,
    "prep": recipeObj.preperation,
    "yield": recipeObj.yields,
    "ingr": recipeObj.ingredients
}
  return analysisObj
}

export const displayRecipesInList = (recipeList) => {
//A way to dsiplay each recipe on the home page.  Due to the lengthy nature of the function 
//it was moved to utils to keep the Page functions lighter

  const getMainHealthLabels = (recipe) => {
     if(!recipe.nutrition) return
      const healthLabels = []
     

      recipe.nutrition.healthLabels.map((label) => {
        switch(label){
          case "VEGETARIAN":
            healthLabels.push('Vegetarian')
            break
          case "KETO_FRIENDLY":
            healthLabels.push('Keto')
            break
          case "PALEO":
              healthLabels.push('Paleo')
            break
          case "GLUTEN_FREE":
            healthLabels.push('Gluten Free')
            break
          case "VEGAN":
            healthLabels.push('Vegan')
            break
        }
    })
  

    return healthLabels.map((el) => <div className='health-label'>{el}</div>)
  }
  console.log(recipeList.reverse())
  console.log(recipeList)
  return recipeList.map((recipe, i ) => {
    // const imageStyle = { backgroundImage: `url(${recipe.recipe_image ? recipe.recipe_image : defaultImage})` }
    return (
        <div className={'recipe-list-item'} key={i} >
          {/* <div className="inner-recipe-container"> */}
          <Link to={`/recipes/${recipe.id}`} className="recipe-link">
            <div className="recipe-thumbnail-frame" style={{ backgroundImage: `url(${recipe.recipe_image ? recipe.recipe_image : defaultImage})` }}></div>
            </Link>
            <div className="recipe-title-link">
              <Link to={`/recipes/${recipe.id}`} className="recipe-link-body">
              <h4>{recipe.title}</h4>
              </Link>
              <div className="recipe-list-username">
                  <div>Nutrified By:  
                    <Link to={`/profiles/${recipe.created_by.user.id}`} className="username-link"> {recipe.created_by.user.username}</Link>
                  </div>
                </div>
            </div>
            {/* </div> */}
            <div className={'health-labels'}>{getMainHealthLabels(recipe)}</div>
        </div>
    )
  })
}



