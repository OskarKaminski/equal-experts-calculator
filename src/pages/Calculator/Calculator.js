import React from 'react'
import { GlobalStyle, Wrapper } from './Calculator.styles'
import Keypad from '../../components/Keypad/Keypad'
import Display from '../../components/Display/Display'
import { CalculatorState } from './logic/CalculatorState'


const Calculator = () => {
    const state = new CalculatorState({})

    return (
        <Wrapper>
            <GlobalStyle />
            <Display state={state} />
            <Keypad state={state} />
        </Wrapper>
    )
}

export default Calculator