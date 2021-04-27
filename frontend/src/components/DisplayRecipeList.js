import React, {Fragment, useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import defaultImage from '../resources/images/default_recipe_image.jpeg'
import {getMainHealthLabels} from '../Utils/UtilFunctions'





import {getUserRecipes, getRecipeBySearchParams} from '../api/RecipeApi'




function DisplayRecipeList({startLimit,  allowLoadMore=false, setSearchTerms, searchTerms=null, profileRecipes=null, recipeId}) {
      const [currentLimit, setCurrentLimit] = useState(startLimit)
      const [recipeList, setRecipeList] = useState([])
      const [paginationNumber, setPaginationNumber] = useState(1)
      const [endOfResults, setEndOfResults] = useState(false)

 


      const getNewRecipes = async () => {
        let newRecipes;
        if(!profileRecipes){
            if(!searchTerms){
                newRecipes = await getUserRecipes(paginationNumber)
                console.log(newRecipes.length)

                if (newRecipes.length == 0) setEndOfResults(true)
                if(paginationNumber === 1){
                  setRecipeList(newRecipes)
                }else{
                  setRecipeList([...recipeList, ...newRecipes])
                }
            }else{
                newRecipes = await getRecipeBySearchParams(searchTerms, paginationNumber)
                if (newRecipes.length == 0) setEndOfResults(true)
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
        setEndOfResults(false)
        getNewRecipes()
      }

      const goBack = async (e) => {
        resetList()
        setSearchTerms('')
      }

      const viewMoreRecipes = () => {
        setPaginationNumber(paginationNumber + 1)
        setCurrentLimit(currentLimit + startLimit)
      }


      useEffect(() => {
        getNewRecipes()
      }, [currentLimit, paginationNumber])

      useEffect(() => {
        resetList()
      },[searchTerms])


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
      {allowLoadMore && 
      (endOfResults ? (
      <div className="no-more-recipes">No More Recipes to Display!</div>
      )
      :
      (
      <div className="load-more-recipes"><button onClick={() => viewMoreRecipes()}>Load More Recipes</button></div>
      ))}

      </Fragment>
      )
    }else{
      return <div>No Recipes to display</div>
    }
    
}

export default DisplayRecipeList
