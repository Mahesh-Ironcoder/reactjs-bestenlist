import { useReducer } from "react"
import React from 'react'

function reducer(state, action) {
    var tempState = [...state]
    if (action.operation === 'num') {
        var ind = parseInt(action.payload.target.id)
        tempState[ind] = action.payload.target.value
        return tempState
    }
    else if (action.operation === '+') {
        action.payload.preventDefault()
        tempState[2] = parseInt(tempState[0]) + parseInt(tempState[1])
        tempState[0] = ""
        tempState[1] = ""
        return tempState
    }
    else if (action.operation === '-') {
        action.payload.preventDefault()
        tempState[2] = parseInt(tempState[0]) - parseInt(tempState[1])
        tempState[0] = ""
        tempState[1] = ""
        return tempState
    }
    else if (action.operation === '*') {
        action.payload.preventDefault()
        tempState[2] = parseInt(tempState[0]) * parseInt(tempState[1])
        tempState[0] = ""
        tempState[1] = ""
        return tempState
    }
    else if (action.operation === '/') {
        action.payload.preventDefault()
        tempState[2] = parseInt(tempState[0]) / parseInt(tempState[1])
        tempState[0] = ""
        tempState[1] = ""
        return tempState
    }
    else {
        // throw new Error()
        console.log('err')
    }
}

function BtnContainer(props) {
    const operations = ['+', '-', '*', '/']
    return (
        <div id="btnWrapper">
            {operations.map(
                (op, id) => {
                    return <button key={id} onClick={(e) => { props.dispatch({ operation: op, payload: e }) }} >
                        {op}
                    </button>
                }
            )}
        </div>
    )
}

const initialState = [" ", " ", " "]

function Calculator() {
    const [state, dispatch] = useReducer(reducer, initialState)
    return (
        <div id="calcWrapper">
            <h2>React Calculator</h2>
            <form>
                a = <input type="text" id="0" value={state[0]} onChange={(e) => dispatch({ operation: 'num', payload: e })} />
                b = <input type="text" id="1" value={state[1]} onChange={(e) => dispatch({ operation: 'num', payload: e })} />
                result = <div id='res'>{state[2]}</div>
                <BtnContainer dispatch={dispatch} />
            </form>
        </div>
    )
}

export default Calculator