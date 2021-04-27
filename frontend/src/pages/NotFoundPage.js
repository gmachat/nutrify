import React, { Fragment } from 'react'

function NotFoundPage(props) {
  return (
    <div className="main-grid">
    <div className="interface-container">
    <div className="interface-box">
    <div className="interface-box-title">
      This Page Does Not Exist!
    </div>
    <div className="interface-container-message">
      Click <span className={"mid-sentence-link"} onClick={props.history.goBack}>Here</span> to go back to the last page
    </div>
    </div>
      </div>
      </div>
  )
}

export default NotFoundPage
