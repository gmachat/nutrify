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
    return (
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
            <div className='form-section' key={`ingredient-${i}`}>
              <label htmlFor={`quantity-${i}`}>Quantity</label>
              <input type='number' data-formtype='quantity' name={`quantity-${i}`} value={inputEl.quantity} required onChange={(e) => handleIngredientInput(e)}/>
              <label htmlFor={`measurement-${i}`}>Measurement</label>
              <select type='select' data-formtype='measurement'name={`measurement-${i}`} value={inputEl.measurement} onChange={(e) => handleIngredientInput(e)} >
                <option value=""></option>
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
              <label htmlFor={`ingredient-${i}`}>Ingredient</label>
              <input type='text' data-formtype='ingredient' data-inputnumber={i} name={`ingredient-${i}`} value={inputEl.ingredient} required onChange={(e) => handleIngredientInput(e)} onBlur={() => clearAutoComplete()} onFocus={(e) => handleIngredientInput(e)}/>
              {(i != 0 || listOfInput.length > 1 )&& <div className= "remove-ingredient-button" onClick={e => removeIngredientField(e, i)}>Remove</div>}
              {autoCompleteList == i && autoCompleteMenu()}
          </div>
            )
          }
        )
      }
      </Fragment>
      )
  
}

export default IngredientInputs
