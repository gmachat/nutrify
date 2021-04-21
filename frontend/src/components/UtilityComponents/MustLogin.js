import React from 'react'
import {Link} from 'react-router-dom'

function MustLogin(props) {
  return (
    <div>
      <div>You must <Link to={'/login'}>login</Link> to {props.userAction}</div>
    </div>
  )
}

export default MustLogin
