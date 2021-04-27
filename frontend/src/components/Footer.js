import React from 'react'
import {Link} from 'react-router-dom'
import GregLogo from '../resources/images/logo-transparent.webp'

function Footer() {
  return (
    <div className='footer'>
     <div className='footer-container'>
    <a className="personal-logo-link" target="_blank" href="https://gmachat.github.io./">
      <div>Created By: </div>
      <img className="footer-logo" src={GregLogo} />
      </a>
      </div>
  </div>
  )
}

export default Footer
