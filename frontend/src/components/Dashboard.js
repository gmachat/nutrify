import React, {useContext} from 'react'
import {UserContext} from '../App'

function Dashboard() {
  const userInfo = useContext(UserContext)
  console.log('homepage', userInfo)
  if(userInfo?.isLoggedIn){
  return (
    <div className="dashboard-main">
      <h3>Welcome {userInfo?.user?.username}</h3>
    </div>
  )
  }else{
    return <div></div>
  }
}

export default Dashboard
