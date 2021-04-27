import React, {useEffect, useState} from 'react'

import DisplayRecipeList from '../components/DisplayRecipeList'
import {getUserProfile, getUsersCreatedRecipes} from '../api/RecipeApi'


function UserProfilePage(props) {
  const [userProfile, setUserProfile] = useState(null)


  const getUserProfileInfo = async () => {
    const userProfileInfo = await getUserProfile(props.match.params.user_id)
    setUserProfile(userProfileInfo)
  }

  const getJoinDate = () => {
    if(userProfile){
    let joined = new Date(userProfile.user.date_joined)
    joined = String(joined).split(" ")
    joined[2] +=','
    joined = joined.slice(1,4).join(" ")
    return joined
  }
  }

  useEffect(() => { 
    getUserProfileInfo()
  }, [])

  useEffect(() => { 
    // getUsersCreatedRecipes()
    getJoinDate()
  }, [userProfile])

  return (
    <div className="main-grid">
      <div className="left-sidebar">
      </div>
      <div className="profilepage-top">

        <h1>{userProfile?.user.username}'s Profile</h1>
        <div>Joined: {getJoinDate()}</div>
        </div>
        <div className="profilepage-bottom">
          <div className="profile-recipe-header-container">
        <h2>{userProfile?.created_recipes.length > 0 ? `${userProfile?.user.username}'s Recipes` : `${userProfile?.user.username} hasn't created any recipes yet!`}</h2>
        </div>
        <div className="main-recipe-list">
       {userProfile?.created_recipes.length > 0 && <DisplayRecipeList profileRecipes={userProfile.created_recipes} startLimit={4} allowLoadMore={true}/>}
       </div>
       </div>
      <div className="right-sidebar">
      </div>
      
    </div>
  )
}

export default UserProfilePage
