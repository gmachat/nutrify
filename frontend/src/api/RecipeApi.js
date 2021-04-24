const FOOD_DB_APP_ID = process.env.REACT_APP_FOOD_DB_APP_ID
const FOOD_DB_APP_KEY = process.env.REACT_APP_FOOD_DB_APP_KEY

const NUTRITION_APP_ID = process.env.REACT_APP_NUTRITION_APP_ID
const NUTRITION_APP_KEY = process.env.REACT_APP_NUTRITION_APP_KEY

const RECIPE_APP_ID = process.env.REACT_APP_RECIPE_APP_ID
const RECIPE_APP_KEY = process.env.REACT_APP_RECIPE_APP_KEY

const BASE_URL = process.env.REACT_APP_BASE_URL


//`https://api.edamam.com/api/nutrition-details?app_id=a30b029a&app_key=1f6dda942de0b2b8e537560eaa746d30`

//--------------------------------fetch recipe analysis------------------------------------


const getRecipeAnalysis = async (recipeObj) => {
  let analysis = await fetch(`https://api.edamam.com/api/nutrition-details?app_id=${NUTRITION_APP_ID}&app_key=${NUTRITION_APP_KEY}`, {
    headers: {"Content-Type": "application/json"},
    method: "POST",
    body: JSON.stringify(recipeObj)
  })
  analysis = await analysis.json()
  return analysis
}

// getRecipeAnalysis(recipeJSON)





//--------------------------fetch food nutrients-----------------------------

const foodObj = {
  "ingredients": [
    {
      "quantity": 10,
      "measureURI": "http://www.edamam.com/ontologies/edamam.owl#Measure_ounce",
      "foodId": "food_bnbh4ycaqj9as0a9z7h9xb2wmgat"
    }
  ]
}


const getFoodNutrients = async (foodObj) => {
  let analysis = await fetch(`https://api.edamam.com/api/food-database/v2/nutrients?app_id=${FOOD_DB_APP_ID}&app_key=${FOOD_DB_APP_KEY}`, {
    headers: {"Content-Type": "application/json"},
    method: "POST",
    body: JSON.stringify(foodObj)
  })
  analysis = await analysis.json()
  return analysis
}

// getFoodNutrients(foodObj)


//---------------------------Fetch Recipes ------------------------------------

const getRecipesByParams = async () => {
  console.log('firing recipe func')
  const tempQuery = 'from=0&to=3&calories=591-722&health=alcohol-free'
  let recipes = await fetch(`https://api.edamam.com/search?q=chicken&app_id=${RECIPE_APP_ID}&app_key=${RECIPE_APP_KEY}&${tempQuery}`, {
    headers: {"Content-Type": "application/json"},
    method: "GET"
  })
  recipes = await recipes.json()
  console.log(recipes)
}



// getRecipesByParams()


// -----------------------auto complete-------------------------------------------//

// 
const recipeAutoComplete = async (text) => {
  let items = await fetch(`https://api.edamam.com/auto-complete?q=${text}&limit=10&app_id=${FOOD_DB_APP_ID}&app_key=${FOOD_DB_APP_KEY}`, {
  method: 'GET',
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  }
}
)
  items = await items.json()
  console.log('inapicall', items)
  return items
}



//-------------------------get single ingredient nutrition-------------------//

const getSingleIngredient = async (text) => {
  let item = await fetch(`https://api.edamam.com/api/food-database/v2/parser?ingr=${text}app_id=c26c70bc&app_key=dbb9c375f759b09c477b07f9b5b2ff23`)
  item = await item.json()
  console.log('inapi', item)
  return item
}


//-------------------------DATABASE CALLS--------------------------------------//

const getUserRecipes = async () => {
  console.log('firing userrecipe func')
  let recipes = await fetch(`${BASE_URL}nutrify/recipes/`)
  recipes = await recipes.json()
  recipes.reverse()
  return recipes
}


const getUserRecipeById = async (recipeId) => {
  let recipe = await fetch(`${BASE_URL}nutrify/recipes/${recipeId}/`)
  recipe = await recipe.json()
  return recipe
}

const createNewRecipe = async (recipeObj) => {
  let recipe = await fetch(`${BASE_URL}nutrify/recipes/`, {
    headers: {"Content-Type": "application/json"},
    method: "POST",
    body: JSON.stringify(recipeObj)
  })
  recipe = await recipe.json()
  return recipe
}

const getUserProfile = async (userId) => {
  console.log('firing get recipebyuserid func for ', userId)
  let profile = await fetch(`${BASE_URL}nutrify/profiles/${userId}/`)
  profile = await profile.json()
  console.log(profile)
  return profile
}

const getUsersCreatedRecipes = async (recipeList) => {
  let recipes = await fetch(`${BASE_URL}nutrify/recipes/`)
  recipes = await recipes.json()
  recipes.reverse()
  return recipes
}

const getRecipeBySearchParams = async (keyword) => {
  let recipes = await fetch(`${BASE_URL}nutrify/recipes/?search=${keyword.toLowerCase()}`)
  recipes = await recipes.json()
  recipes.reverse()
  return recipes
}


export {getRecipeAnalysis, getFoodNutrients, getUserRecipeById, createNewRecipe, getUserRecipes, getUserProfile, recipeAutoComplete, getUsersCreatedRecipes, getSingleIngredient, getRecipeBySearchParams}