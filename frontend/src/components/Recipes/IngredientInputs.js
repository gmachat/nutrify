import React, { Fragment, useEffect, useState, useCallback, useRef } from 'react'

import {recipeAutoComplete} from '../../api/RecipeApi'
import {debounce} from 'lodash'


function IngredientInputs({removeIngredientField, ingredientForms, setIngredientForms}) {

  const [autoComplete, setAutoComplete] = useState(null)
  const [autoCompleteSearch, setAutoCompleteSearch] = useState(null)
  const [autoCompleteList, setAutoCompleteList] = useState(null)

  const autoCompleteRef = useRef(autoCompleteSearch)

  const clearAutoComplete = () => {
    setTimeout(() => {
      setAutoComplete('')
      setAutoCompleteList(null)
    }, 100)
  }

  console.log('rerender')
    // const autoCompleteMenu = <div>heres</div>

  const handleAutoCompleteClick = async (event) => {
    //creates a "Mock event" to handle submission similiar to input
    const mockEvent = {
      target: {
        name: event.target.getAttribute('name'),
        value: event.target.dataset.value,
        dataset: {
          inputnumber: autoCompleteList
        }
      }
    }
    console.log(mockEvent)
    handleIngredientInput(mockEvent)
    setAutoCompleteList(null)
    clearAutoComplete()
  }

  const autoCompleteGrabber = async (input) =>{

    const autoCompleteData = await recipeAutoComplete(input.target.value)
    console.log('inautocomplete')
    setAutoCompleteList(input.target.dataset.inputnumber)
    setAutoComplete(autoCompleteData)
    return autoCompleteData
  }

  const delayedSearch = useCallback(debounce(event => autoCompleteGrabber(event), 500),[])

  const handleIngredientInput = async (e) => {

    const [name, number] = e.target.name.split('-')
    const updateForms = [...ingredientForms]
    const newForm = {...updateForms[number]}
    console.log(newForm[name])
    if(name == 'quantity'){
      console.log('quantitycheck')
      console.log(/^([1-9]{0,2})?(\s)?([1-9]{1}\/)?([2,3,4,8])?$/.test(e.target.value))
      //check to make usre number is integer or valid fraction
      if(!/^([1-9]{0,2})?(\s)?([1-9]{1})?(\/)?([2,3,4,8])?$/.test(e.target.value) && e.target.value != "") return 
    }
    newForm[name] = e.target.value
    if(e.target.value !== autoCompleteRef.current) {
    delayedSearch(e)
    updateForms[number] = newForm
    setAutoCompleteSearch(e.target.value)
    autoCompleteRef.current = e.target.value
    setIngredientForms(updateForms, clearAutoComplete())
  }
  }

  
  
    const autoCompleteMenu = () => {
    if (autoComplete && autoComplete.length > 0)return (
    <div className="auto-complete-dropdown">
      {autoComplete && autoComplete.map((el, i )=> {
        return <div onClick={(e) => handleAutoCompleteClick(e)} className={'auto-complete-item'} data-value={el} data-autocompleteitem={true} name={`ingredient-${autoCompleteList ? autoCompleteList : '0'}`}>{el}</div>
      })}
      </div>
    )
    }

    const ingredientResponse = (e) => {
      handleIngredientInput(e)

    }
  

    // useEffect(() => {
    //   console.log(autoComplete)
    //   handleIngredientInput(autoCompleteTarget)
    // }, [autoCompleteTarget])



      return (
      <Fragment>
        {
        ingredientForms.map((inputEl, i) => {
          return (
            <div className='ingredient-form-section' key={`ingredient-${i}`}>
              <span>
              <input type='text' data-formtype='quantity' name={`quantity-${i}`} value={inputEl.quantity} required onChange={(e) => handleIngredientInput(e)} className="quantity" placeholder='Quantity'/>
              </span>
              <span>
              {/* <label htmlFor={`measurement-${i}`}>Measurement</label> */}
              <select type='select' data-formtype='measurement'name={`measurement-${i}`} value={inputEl.measurement} onChange={(e) => handleIngredientInput(e)}  className="measurement" >
                <option value="" disabled selected>Measurement</option>                
                <option value="Ounce">Ounce</option>
                <option value="Gram">Gram</option>
                <option value="Pound">Pound</option>
                <option value="Kilogram">Kilogram</option>
                <option value="Pinch">Pinch</option>
                <option value="Liter">Liter</option>
                <option value="Fluid ounce">Fluid ounce</option>
                <option value="Gallon">Gallon</option>
                <option value="Pint">Pint</option>
                <option value="Quart">Quart</option>
                <option value="Milliliter">Milliliter</option>	
                <option value="Drop">Drop</option>	
                <option value="Cup">Cup</option>	
                <option value="Tablespoon">Tablespoon</option>	
                <option value="Teaspoon">Teaspoon</option>	
              </select>
              </span>
                {/* <label htmlFor={`ingredient-${i}`}>Ingredient</label> */}
                <div className="form-action-container">
                <span className="input-autocomplete">
                  <input type='text' data-formtype='ingredient' data-inputnumber={i} name={`ingredient-${i}`} value={inputEl.ingredient} required onChange={(e) => handleIngredientInput(e)} onBlur={() => clearAutoComplete()} onFocus={(e) => handleIngredientInput(e)} autoComplete="off" placeholder='Ingredient'className="ingredient-text-box"/>
                  {autoCompleteList == i && autoCompleteMenu()}
                </span>
              {(i != 0 || ingredientForms.length > 1 )&& <div className= "remove-ingredient-button" onClick={e => removeIngredientField(e, i)}>X</div>}
              </div>
              </div>
            )
          }
        )
      }
      </Fragment>
      )
  
}

export default IngredientInputs
