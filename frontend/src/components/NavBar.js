import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import {UserContext} from '../App'

function NavBar() {
  const userInfo = useContext(UserContext)
  let loginStatus

  if(userInfo.user){
    loginStatus =  (
        <div className="login-logout-box">
          <div>Logged in as: {userInfo.user.username} </div>
          <button className="link" onClick={userInfo.handleLogout}>Logout</button>
        </div>
    )
  }else{
    loginStatus =  (
    <div className="login-logout-box">
      <Link to="/login">Login</Link> or <Link to="/signup">Sign Up</Link>
    </div>
    )
  }

  return   (     
    <div className='nav-bar'>
    <Link to="/">Nutrify Logo</Link>
    <div className="nav-align-center">
      <div>
        Profile
      </div>
      <Link to="recipes/new">
        Create
      </Link>
    </div>
    <div className="nav-align-right">
  {loginStatus}
  </div>
</div>)
}

export default NavBar