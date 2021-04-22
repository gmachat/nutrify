import React, { Fragment, useState } from 'react'

function IngredientInputs({removeIngredientField, handleIngredientInput, listOfInput, autoCompleteList, autoComplete, setAutoComplete, clearAutoComplete}) {
  console.log(autoComplete)
  console.log(autoCompleteList)

  // const autoCompleteMenu = <div>heres</div>

  const handleAutoCompleteClick = (event) => {
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
  }


    const autoCompleteMenu = () => {
    if (autoComplete && autoComplete.length > 0)return (
    <div className="auto-complete-dropdown">
      {autoComplete && autoComplete.map((el, i )=> {
        return <div onClick={(e) => handleAutoCompleteClick(e)} className={'auto-complete-item'} data-value={el} name={`ingredient-${autoCompleteList ? autoCompleteList : '0'}`}>{el}</div>
      })}
      </div>
    )
    }
    


      return (
      <Fragment>
        {
        listOfInput.map((inputEl, i) => {
          return (
            <div className='ingredient-form-section' key={`ingredient-${i}`}>
              <span>
              <input type='number' data-formtype='quantity' name={`quantity-${i}`} value={inputEl.quantity} required onChange={(e) => handleIngredientInput(e)} className="quantity" placeholder='Quantity'/>
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
              {(i != 0 || listOfInput.length > 1 )&& <div className= "remove-ingredient-button" onClick={e => removeIngredientField(e, i)}>X</div>}
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
