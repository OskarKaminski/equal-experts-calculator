import { makeObservable, action } from "mobx"
import { CalculatorState } from '../../pages/Calculator/logic/CalculatorState'

export default class KeypadCtrl {
    buttons = [
        {label: 'C', onClick: () => this.resetState(), color: KeypadCtrl.ButtonColors.secondary},
        {label: '+/-', color: KeypadCtrl.ButtonColors.secondary},
        {label: '%', color: KeypadCtrl.ButtonColors.secondary},
        {label: 'div', rounded: true, color: KeypadCtrl.ButtonColors.secondary},
        {label: '7', onClick: () => this.numberPressed(7), color: KeypadCtrl.ButtonColors.primary},
        {label: '8', onClick: () => this.numberPressed(8), color: KeypadCtrl.ButtonColors.primary},
        {label: '9', onClick: () => this.numberPressed(9), color: KeypadCtrl.ButtonColors.primary},
        {label: 'x', rounded: true, color: KeypadCtrl.ButtonColors.secondary},
        {label: '4', onClick: () => this.numberPressed(4), color: KeypadCtrl.ButtonColors.primary},
        {label: '5', onClick: () => this.numberPressed(5), color: KeypadCtrl.ButtonColors.primary},
        {label: '6', onClick: () => this.numberPressed(6), color: KeypadCtrl.ButtonColors.primary},
        {label: '-', onClick: () => this.operationPressed(CalculatorState.operators.SUBTRACT), rounded: true, color: KeypadCtrl.ButtonColors.secondary},
        {label: '1', onClick: () => this.numberPressed(1), color: KeypadCtrl.ButtonColors.primary},
        {label: '2', onClick: () => this.numberPressed(2), color: KeypadCtrl.ButtonColors.primary},
        {label: '3', onClick: () => this.numberPressed(3), color: KeypadCtrl.ButtonColors.primary},
        {label: '+', onClick: () => this.operationPressed(CalculatorState.operators.ADD), rounded: true, color: KeypadCtrl.ButtonColors.secondary},
        {label: '0', onClick: () => this.numberPressed(0), wide: true, color: KeypadCtrl.ButtonColors.primary},
        {label: '.', color: KeypadCtrl.ButtonColors.primary},
        {label: '=', onClick: () => this.calculateResult(), rounded: true, color: KeypadCtrl.ButtonColors.brand, logoUrl: 'https://www.equalexperts.com/wp-content/themes/equalexperts/assets/icons/equal-experts-icon-blue-circle.png'},
    ]

    constructor(state) {
        this.state = state

        makeObservable(this, {
            numberPressed: action,
            operationPressed: action,
            calculateResult: action,
            resetState: action,
        })
    }
    numberPressed = (value) => {
        this.state.numberPressed(value)
    }

    operationPressed = (value) => {
        this.state.operationPressed(value)
    }

    calculateResult = () => {
        this.state.calculateResult()
    }

    resetState = () => {
        this.state.resetState()
    }
}

KeypadCtrl.ButtonColors = {
    primary: '#A2CAD9',
    secondary: '#FF8AB4',
    brand: '#1795D4'
}
