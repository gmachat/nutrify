import React, {Fragment, useState} from 'react'
import {Link} from 'react-router-dom'
import defaultImage from '../resources/images/default_recipe_image.jpeg'


function DisplayRecipeList({recipeList, startLimit, allowLoadMore=false}) {
      const [currentLimit, setCurrentLimit] = useState(startLimit)
    

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

      if (recipeList){
      return (
        <Fragment>
        {recipeList.map((recipe, i ) => {
        // const imageStyle = { backgroundImage: `url(${recipe.recipe_image ? recipe.recipe_image : defaultImage})` }
        if(i >= currentLimit){
          return
        }
        return (
            <div className={'recipe-list-item'} key={i} >
              <div className="inner-recipe-container">
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
                        <Link to={`/profiles/${recipe?.created_by?.user_profile?.id}`} className="username-link"> {}</Link>
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
      {allowLoadMore && <div className="load-more-recipes"><button>Load More Recipes</button></div>}

      </Fragment>
      )
    }else{
      return <div>No Recipes to dispaly</div>
    }
    
}

export default DisplayRecipeList
