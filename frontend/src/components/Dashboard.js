import React from 'react'


function Dashboard({userInfo}) {

  const handleRecipeSearch = (e) => {
    
  }



  console.log('homepage', userInfo)
  if(userInfo?.isLoggedIn){
  return (
    <div className="dashboard-main">
      <div className="dashboard-inner" >
      <h3>Welcome {userInfo?.user?.username}</h3>
      <div className="recipe-search-home-container">
        <button ocClick={(e) => handleRecipeSearch(e)}>Search</button>
        <input type="text" placeholder="Search Recipes" className="recipe-search-home" />
      </div>
      </div>
    </div>
  )
  }else{
    return <div></div>
  }
}

export default Dashboard
