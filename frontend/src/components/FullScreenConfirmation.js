import React, {useEffect, useState} from 'react'
import { Redirect } from 'react-router'

import {deleteRecipe} from '../api/RecipeApi'

function FullScreenConfirmation({props}) {

  const handleDeleteClick = async (e) => {
    e.preventDefault()
    deleteRecipe(props.recipeId)
    props.history.push(`/`)
  }




  return (
    <div className="modal-backdrop" onClick={(e) => props.setDeleteWarning(false)}>
        <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="interface-box">
          <h1 className="interface-box-title modal-title secondary-backdrop secondary-on-primary">{props.message}</h1>
          <div >
            <button className={'danger modal-button'} onClick={(e) => handleDeleteClick(e)}>Delete</button>
            <button className={'safe-2 modal-button'} onClick={() => props.setDeleteWarning(false)} >Cancel</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FullScreenConfirmation
