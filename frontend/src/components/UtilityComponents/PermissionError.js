import React from 'react'
import {Link} from 'react-router-dom'
import { withRouter } from 'react-router-dom'


function PermissionError(props) {
  return (

    <div className="main-grid">
    <div className="interface-container">
      <div className="interface-box">
        <div>You do not have permission to {props.userAction}</div>
        <div className="interface-container-message">
          Click <span className={"mid-sentence-link"} onClick={props.history.goBack}>Here</span> to go back to the last page
        </div>
        
      </div>
    </div>
  </div>
  )
}

export default withRouter(PermissionError)