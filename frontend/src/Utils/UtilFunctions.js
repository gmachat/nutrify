import {Link} from 'react-router-dom'

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
  return recipeList.map((recipe, i ) => {
    return (
      <div key={i}>
        <Link to={`/recipes/${recipe.id}`}>
        <div>{recipe.title}</div>
        <div></div>
        </Link>
      </div>
    )
  })
}



