import { computed, makeObservable, observable } from 'mobx'

export class CalculatorState {
    leftSide = undefined
    rightSide = undefined
    operator = undefined
    lastResult = undefined

    constructor({ leftSide, operator, rightSide }) {
        this.leftSide = leftSide
        this.rightSide = rightSide
        this.operator = operator

        makeObservable(this, {
            leftSide: observable,
            rightSide: observable,
            operator: observable,
            lastResult: observable,
            result: computed,
            memory: computed
        })
    }

    get result(){
        if(this.lastResult){
            return this.lastResult
        }
        if(this.operator?.unitary){
            this.operationPressed(this.operator)
            this.calculateResult()
            return this.lastResult
        }
        if(!this.rightSide){
            return this.leftSide || 0
        } else {
            return this.rightSide
        }
    }

    get memory(){
        if(!this.operator){
            return ''
        } else if(this.operator.unitary) {
            return `${this.operator.label}( ${this.leftSide} )`
        } else if(this.lastResult) {
            return `${this.leftSide} ${this.operator.label} ${this.rightSide} =`
        } else {
            return `${this.leftSide} ${this.operator.label}`
        }
    }

    numberPressed(value) {
        if(this.lastResult){
            this.resetState()
        }

        if (!this.operator) {
            this._setLeftSide(value)
        } else {
            this._setRightSide(value)
        }
    }

    _setLeftSide(value){
        if (this.leftSide === undefined) {
            this.leftSide = value.toString()
        } else {
            this.leftSide = this.leftSide.toString() + value
        }
        this.leftSide = parseFloat(this.leftSide)
    }

    _setRightSide(value){
        if (this.rightSide === undefined) {
            this.rightSide = value.toString()
        } else {
            this.rightSide = this.rightSide.toString() + value
        }
        this.rightSide = parseFloat(this.rightSide)
    }

    operationPressed(value) {
        if(!this.leftSide) return

        if(this.lastResult){
            const temp = this.lastResult
            this.resetState()
            this.leftSide = temp
        }

        if (!this.rightSide) {
            this.operator = value
        } else {
            this.calculateResult()
            const temp = this.lastResult
            this.resetState()
            this.leftSide = temp
            this.operator = value
        }
    }

    calculateResult(){
        if(!this.operator) return

        if(this.lastResult){
            this.leftSide = this.operator.fn(this.leftSide, this.rightSide)
        }
        this.lastResult = this.operator.fn(this.leftSide, this.rightSide)
    }

    resetState(){
        this.leftSide = undefined
        this.rightSide = undefined
        this.operator = undefined
        this.lastResult = undefined
    }
}

CalculatorState.ADD = (leftSide, rightSide) => {
    return leftSide + rightSide
}

CalculatorState.SUBTRACT = (leftSide, rightSide) => {
    return leftSide - rightSide
}

CalculatorState.FACTORIAL = (value) => {
    let result = 1
    for(let i=1; i<=value; i++){
        result *= i
    }
    return result
}

CalculatorState.operators = {
    ADD: {
        label: '+',
        fn: CalculatorState.ADD
    },
    SUBTRACT: {
        label: '-',
        fn: CalculatorState.SUBTRACT
    },
    FACTORIAL: {
        label: 'fact',
        unitary: true,
        fn: CalculatorState.FACTORIAL
    }
}

export const state = new CalculatorState({})