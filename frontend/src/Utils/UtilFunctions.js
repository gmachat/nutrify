
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
    calories: Math.round(ntr?.calories),
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







