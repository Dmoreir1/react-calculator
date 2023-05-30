import React from 'react'
import { useReducer } from 'react'
import DigitButton from './DigitButton'
import OperationButton from './OperationButton'
import './styles.css'

export const ACTIONS = {
  ADD_DIGIT: 'add-digit',
  CHOOSE_OPERATION: 'choose-operation',
  CLEAR: 'clear',
  DELETE_DIGIT: 'delete-digit',
  EVALUATE: 'evaluate'
}


function reducer (state, { type, payload }) {
  // eslint-disable-next-line default-case
  switch(type) {
    case ACTIONS.ADD_DIGIT:
      if (state.overwrite) {
      return {
      ...state,
      // eslint-disable-next-line no-undef
      currentOperand: payload.digit, 
      overwrite: false,
    }
  }
      if (payload.digit === '0' && state.currentOperand === '0') {
        return state
      }
      if (payload.digit === '.' && state.currentOperand.includes('.')) {
        return state 
      }
      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`,
      }
      case ACTIONS.CHOOSE_OPERATION: 
      if (state.currentOperand == null && state.previousOperand == null) {
        return state
      }
      if (state.currentOperand == null) {
        return {
          ...state,
          operation:payload.operation,
        }
      }
      if (state.previousOperand == null) {
        return {
          ...state, 
          operation: payload.operation,
          previousOperand: state.currentOperand,
          currentOperand:null,
        }
      }
      return {
        ...state,
        previousOperand: evaluate(state), 
        operation: payload.operation, 
        currentOperand:null,
      }

}

function App() {
  const [{currentOperand, previousOperand, operation}, dispatch] = useReducer(reducer, {})

  // dispacth({ type: ACTIONS.ADD_DIGIT, payload: { digit: 1}})

  return( 
     <div className = 'calculator-grid'>
      <div className="output">
        <div className="previous-operand">{previousOperand} {operation}</div>
        <div className="current-operand">{currentOperand}</div>
      </div>

      <button className="span-two">AC</button>
      <button>DEL</button>
      <DigitButton digit = "/" dispact = {dispatch}/>
      <button>1</button>
      <button>2</button>
      <button>3</button>
      <button>*</button>
      <button>4</button>
      <button>5</button>
      <button>6</button>
      <button>+</button>
      <button>7</button>
      <button>8</button>
      <button>9</button>
      <button>-</button>
      <button>.</button>
      <button>0</button>
      <button className="span-two">=</button>

    </div>
  )

}

export default App