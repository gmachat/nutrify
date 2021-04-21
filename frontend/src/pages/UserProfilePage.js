import React, {useEffect, useState} from 'react'

import {displayRecipesInList} from '../Utils/UtilFunctions'
import {getUserProfile} from '../api/RecipeApi'


function UserProfilePage(props) {
  const [userProfile, setUserProfile] = useState(null)
  // let recipeList
  console.log(props.match.params.user_id)
  console.log(userProfile)

  const getUserProfileInfo = async () => {
    const userProfileInfo = await getUserProfile(props.match.params.user_id)
    setUserProfile(userProfileInfo)
  }

  
  // if(recipes) {
  //   console.log(recipes)
  //  recipeList = displayRecipesInList(recipes)
  // }

  useEffect(() => { 
    getUserProfileInfo()
  }, [])

  return (
    <div className="main-grid">
      <div className="left-sidebar">
       Someones Comments
      </div>
      <div className="main-column-top">
        <h1>
          {userProfile?.user.username}'s Profile
        </h1>
      </div>
      <div className="main-column-bottom">
        <h2>{userProfile?.user.username}'s Recipes</h2>
      </div>
      <div className="right-sidebar">
        Shortcuts
      </div>
    </div>
  )
}

export default UserProfilePage
