import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import {UserContext} from '../App'
import NutrifyLogo from '../resources/images/nutrifyLogoHeader.png'

function NavBar() {
  const userInfo = useContext(UserContext)
  let loginStatus

  if(userInfo.user){
    loginStatus =  (
        <div className="login-logout-box">
          <Link to="/recipes/new" className={'nav-item'}>
             Nutrify
          </Link>
         <Link to={`/profiles/${userInfo.user.id}`} className={'nav-item'}>{userInfo.user.username}</Link>
          <button className="logout-button" onClick={userInfo.handleLogout}>Logout</button>
        </div>
    )
  }else{
    loginStatus =  (
    <div className={'login-logout-box'}>
      <Link to="/login" className="nav-item">Login</Link> <Link to="/signup" className="nav-item">Sign Up</Link>
    </div>
    )
  }

  return   (     
    <div className='nav-bar'>
    <Link className="nav-logo-link" to="/"><img className="nav-logo" src={NutrifyLogo} /></Link>
    {userInfo.user && (
      <div className="nav-align-center">
      {/* <Link to={`/profiles/${userInfo.user.id}`} className={'nav-item'}>
        Profile
      </Link> */}
      {/* <Link to="/recipes/new" className={'nav-item'}>
        Create
      </Link> */}
    </div>
    )}
    <div className="nav-align-right">
      
  {loginStatus}
  </div>
</div>)
}

export default NavBar