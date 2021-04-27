import React, {Fragment, useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import defaultImage from '../resources/images/default_recipe_image.jpeg'
import {getUserRecipes, getRecipeBySearchParams} from '../api/RecipeApi'



function DisplayRecipeList({startLimit,  allowLoadMore=false, setSearchTerms, searchTerms=null, profileRecipes=null, recipeId}) {
      const [currentLimit, setCurrentLimit] = useState(startLimit)
      const [recipeList, setRecipeList] = useState([])
      const [paginationNumber, setPaginationNumber] = useState(1)
      const [endOfResults, setEndOfResults] = useState(false)

 


      const getNewRecipes = async () => {
        let newRecipes;
        if(!profileRecipes){
          console.log('no recipessssss')
            if(!searchTerms){
                newRecipes = await getUserRecipes(paginationNumber)
                if (!newRecipes.length) setEndOfResults(true)
                if(paginationNumber === 1){
                  setRecipeList(newRecipes)
                }else{
                  setRecipeList([...recipeList, ...newRecipes])
                }
            }else{
                newRecipes = await getRecipeBySearchParams(searchTerms, paginationNumber)
                if (!newRecipes.length) setEndOfResults(true)
                if(paginationNumber === 1){
                  setRecipeList(newRecipes)
                }else{
                  setRecipeList([...recipeList, ...newRecipes])
                }
              }
        }else{
          if (currentLimit >= profileRecipes.length && currentLimit > startLimit){
            setEndOfResults(true)
          }else{
            setRecipeList(profileRecipes)
        }
        }
        return newRecipes
      }

      const resetList = () => {
        setCurrentLimit(startLimit)
        setPaginationNumber(1)
        getNewRecipes()
      }

      const goBack = async (e) => {
        resetList()
        setSearchTerms('')
      }

      const viewMoreRecipes = () => {
        setCurrentLimit(currentLimit + startLimit)
        setPaginationNumber(paginationNumber + 1)
      }


      useEffect(() => {
        getNewRecipes()
      }, [currentLimit, paginationNumber])

      useEffect(() => {
        console.log('reset after search change')
        resetList()
      },[searchTerms])

  console.log(recipeList)

      const getMainHealthLabels = (recipe) => {
         if(!recipe.nutrition) return
          const healthLabels = []
         
    
          recipe?.nutrition?.healthLabels?.map((label) => {
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





      console.log(endOfResults)
      if (recipeList){
      return (
        <Fragment>
        {searchTerms && <div className="back-from-search"> <span onClick={e => goBack(e)} style={{fontWeight:'900', cursor: 'pointer'}}>Back</span> to newest recipes </div>}
        {recipeList.map((recipe, i ) => {
        // const imageStyle = { backgroundImage: `url(${recipe.recipe_image ? recipe.recipe_image : defaultImage})` }
        if(i >= currentLimit || recipe.id == recipeId){
          return
        }
        return (
            <div className={'recipe-list-item primary-backdrop primary-on-secondary'} key={i} >
              <div className="inner-recipe-container secondary-backdrop secondary-on-primary">
              <Link to={`/recipes/${recipe.id}`} className="recipe-link">
                <div className="recipe-thumbnail-frame" style={{ backgroundImage: `linear-gradient(to bottom, rgba(33, 106, 180, 0.22), rgba(33, 106, 180, 0.22)), url(${recipe.recipe_image ? recipe.recipe_image : defaultImage})` }}></div>
                </Link>
                <div className="recipe-title-link">
                  <Link to={`/recipes/${recipe.id}`} className="recipe-link-body">
                  <h4>{recipe.title}</h4>
                  </Link>
                  <div>
                  <div className="recipe-list-username">
                      <div>Nutrified By:  
                        <Link to={`/profiles/${recipe?.created_by?.user?.id}`} className="username-link"> {recipe?.created_by?.user.username}</Link>
                      </div>
                    </div>
                    </div>
                </div>
                </div>
                {/* </div> */}
                <div className={'health-labels'}>{getMainHealthLabels(recipe)}</div>
            </div>
        )
      }
      )}
      {allowLoadMore && endOfResults ? (
      <div className="no-more-recipes">No More Recipes to Display!</div>
      )
      :
      (
      <div className="load-more-recipes"><button onClick={() => viewMoreRecipes()}>Load More Recipes</button></div>
      )
      }

      </Fragment>
      )
    }else{
      return <div>No Recipes to dispaly</div>
    }
    
}

export default DisplayRecipeList
