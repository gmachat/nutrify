import React from 'react'
import {Link} from 'react-router-dom'

function MustLogin(props) {
  return (

    <div className="main-grid">
    <div className="interface-container">
      <div className="interface-box">
    <div>You must <Link to={'/login'} className="mid-sentence-link">login</Link> to {props.userAction}</div>
        
      </div>
    </div>
  </div>
  )
}

export default MustLogin
