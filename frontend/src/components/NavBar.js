import React, {useContext, useState} from 'react'
import {Link} from 'react-router-dom'
import {UserContext} from '../App'
import NutrifyLogo from '../resources/images/nutrifyLogoHeader.png'

function NavBar() {
  const userInfo = useContext(UserContext)
  const [displayBurger, setDisplayBurger] = useState('nav-inactive')
  //nav-active
  let rightContent

  if(userInfo.user){
    rightContent =  (
          <ul className={`nav-items ${displayBurger}`}>
          <Link to="/recipes/new" className={'nav-item nav-link'} onClick={() => setDisplayBurger(`${displayBurger === "nav-inactive" ? "nav-active" : "nav-inactive"}`)}>
             <li>Nutrify</li>
        </Link>
         <Link to={`/profiles/${userInfo.user.id}`} className={'nav-item nav-link'} onClick={() => setDisplayBurger(`${displayBurger === "nav-inactive" ? "nav-active" : "nav-inactive"}`)}>
         <li>{userInfo.user.username}</li>
           </Link>
           <li className={'nav-item nav-link'} onClick={() => setDisplayBurger(`${displayBurger === "nav-inactive" ? "nav-active" : "nav-inactive"}`)}>
            <div className="logout-button" onClick={userInfo.handleLogout}>Logout</div>
          </li>
          </ul>

    )
  }else{
    rightContent =  (

      <ul className={`nav-items ${displayBurger}`}>
        <Link to="/login" className="nav-item nav-link" onClick={() => setDisplayBurger(`${displayBurger === "nav-inactive" ? "nav-active" : "nav-inactive"}`)}>
          <li>Login</li>
        </Link> 
        <Link to="/signup" className="nav-item nav-link" onClick={() => setDisplayBurger(`${displayBurger === "nav-inactive" ? "nav-active" : "nav-inactive"}`)}>
          <li>Sign Up</li>
        </Link>
      </ul>

    )
  }

  return   (     
    <div className='nav-bar'>
    <Link className="nav-logo-link" to="/"><img className="nav-logo" src={NutrifyLogo} /></Link>

      
      <div class={`burger-menu ${displayBurger === "nav-inactive" ? "" : "toggle"}`} onClick={() => setDisplayBurger(`${displayBurger === "nav-inactive" ? "nav-active" : "nav-inactive"}`)}>
        <div class={`line line1`}></div>
        <div class={`line line2`}></div>
        <div class={`line line3`}></div>
      </div>
      {rightContent}

</div>
)
}

export default NavBar