import  gluten_free_logo from '../resources/images/recipe_icons/gluten_free_logo_white.webp'
import  paleo_logo from '../resources/images/recipe_icons/paleo_logo_white.webp'
import  keto_logo from '../resources/images/recipe_icons/keto_logo_white.webp'
import  vegetarian_logo from '../resources/images/recipe_icons/vegetarian_logo_white.webp'
import  vegan_logo from '../resources/images/recipe_icons/vegan_logo_white.webp'

export const formatRecipeForAnalysis = (recipeObj) => {
  const analysisObj = {
    "title": recipeObj.title,
    "prep": recipeObj.preperation,
    "yield": recipeObj.yields,
    "ingr": recipeObj.ingredients
}
  return analysisObj
}

export const labelNutrition = (ntr) => {
  return {
    servingSizeWeight: Math.round(ntr?.totalWeight), 
    calories: Math.ceil(ntr?.calories),
    caloriesFromFat: Math.round(ntr?.totalNutrientsKCal?.FAT_KCAL?.quantity),
    totalFat: ntr?.totalNutrients?.FAT?.quantity.toFixed(1),
    totalFatPct: Math.round(ntr?.totalDaily?.FAT?.quantity),
    satFat: ntr?.totalNutrients?.FASAT?.quantity.toFixed(1),
    satFatPct: Math.round(ntr?.totalDaily?.FASAT?.quantity),
    monoFat: ntr?.totalNutrients?.FAMS?.quantity?.toFixed(1),
    polyFat: ntr?.totalNutrients?.FAPU?.quantity.toFixed(1),
    transFat: ntr?.totalNutrients?.FATRN?.quantity.toFixed(1),
    cholesterol: ntr?.totalNutrients?.CHOLE?.quantity.toFixed(1),
    cholesterolPct: Math.round(ntr.totalDaily?.CHOLE?.quantity),
    sodium: ntr?.totalNutrients?.NA?.quantity.toFixed(1),
    sodiumPct: Math.round(ntr?.totalDaily?.NA?.quantity),
    carbs: ntr?.totalNutrients?.CHOCDF?.quantity.toFixed(1),
    carbsPct: Math.round(ntr?.totalDaily?.CHOCDF?.quantity),
    fiber: ntr?.totalNutrients?.FIBTG?.quantity.toFixed(1),
    fiberPct: Math.round(ntr?.totalDaily?.FIBTG.quantity),
    fiber: ntr?.totalNutrients?.FIBTG?.quantity.toFixed(1),
    fiberPct: Math.round(ntr?.totalDaily?.FIBTG?.quantity),
    sugar: ntr?.totalNutrients?.SUGAR?.quantity.toFixed(1),
    addedSugar: ntr?.totalNutrients['SUGAR.added']?.quantity.toFixed(1) ? ntr?.totalNutrients['SUGAR.added']?.quantity.toFixed(1) : 0,
    protein: ntr?.totalNutrients?.PROCNT?.quantity.toFixed(1),
    proteinPct: Math.round(ntr?.totalDaily?.PROCNT?.quantity),
    vitaminAPct: Math.round(ntr?.totalDaily?.VITA_RAE?.quantity),
    vitaminB6Pct: Math.round(ntr?.totalDaily?.VITB6A?.quantity),
    vitaminB12Pct: Math.round(ntr?.totalDaily?.VITB12?.quantity),
    vitaminCPct: Math.round(ntr?.totalDaily?.VITC?.quantity),
    vitaminDPct: Math.round(ntr?.totalDaily?.VITD?.quantity),
    calciumPct: Math.round(ntr?.totalDaily?.CA?.quantity),
    ironPct: Math.round(ntr?.totalDaily?.FE?.quantity),
    potassiumPct: Math.round(ntr?.totalDaily?.K?.quantity),
    folatePct: Math.round(ntr?.totalDaily?.FOLDFE?.quantity),
    magnesiumPct: Math.round(ntr?.totalDaily?.MG?.quantity),
  } 
}

export const getMainHealthLabels = (recipe) => {
  if(!recipe.nutrition) return
   const healthLabels = []
   recipe?.nutrition?.healthLabels?.map((label) => {
     switch(label){
       case "VEGETARIAN":
         healthLabels.push({img: vegetarian_logo, alt: 'vegetarian_logo'})
         break
       case "KETO_FRIENDLY":
         healthLabels.push({img: keto_logo, alt: 'keto_logo'})
         break
       case "PALEO":
           healthLabels.push({img: paleo_logo, alt: 'paleo_logo'})
         break
       case "GLUTEN_FREE":
         healthLabels.push({img: gluten_free_logo, alt: 'gluten_free_logo'})
         break
       case "VEGAN":
         healthLabels.push({img: vegan_logo, alt: 'vegan_logo'})
         break
     }
 })
 return healthLabels.map((el) => <img key={el.alt} className='health-label' src={el.img} alt={el.alt} />)
}





