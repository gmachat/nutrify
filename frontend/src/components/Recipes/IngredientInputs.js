import React, { Fragment } from 'react'

function IngredientInputs({removeIngredientField, handleIngredientInput, listOfInput}) {
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
              <input type='text' data-formtype='ingredient' name={`ingredient-${i}`} value={inputEl.ingredient} required onChange={(e) => handleIngredientInput(e)}/>
              {(i != 0 || listOfInput.length > 1 )&& <div onClick={e => removeIngredientField(e, i)}>Remove</div>}
          </div>
            )
          }
        )
      }
      </Fragment>
      )
  
}

export default IngredientInputs
