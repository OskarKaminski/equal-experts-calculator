import { CalculatorState } from './CalculatorState'

// Test suite covering simple state transformation after user action
describe('Pressing keypad buttons', () => {

    describe('Pressing numbers before operator is selected', () => {

        describe('When no other number was pressed before', () => {

            test(`set the number as the left side of an operation`, () => {
                // Init state
                const state = new CalculatorState({})

                // Execute action
                state.numberPressed(3)

                // Get result
                const result = state.leftSide

                expect(result).toEqual(3)
            })

        })

        describe('When another number was pressed before', () => {

            test(`concatenate the number to the left side of an operation`, () => {
                // Init state
                const state = new CalculatorState({
                    leftSide: 3
                })

                // Execute action
                state.numberPressed(0)

                // Get result
                const result = state.leftSide

                expect(result).toEqual(30)
            })

        })

        describe('When only 0 was pressed before', () => {

            test(`replace 0 with the number as the left side of an operation`, () => {
                // Init state
                const state = new CalculatorState({
                    leftSide: 0
                })

                // Execute action
                state.numberPressed(3)

                // Get result
                const result = state.leftSide

                expect(result).toEqual(3)
            })

        })

    })

    describe('Pressing operations', () => {

        describe('Before the right side is set', () => {

            test(`set the operation to the operator property`, () => {
                // Init state
                const state = new CalculatorState({
                    leftSide: 1
                })

                // Execute action
                state.operationPressed(CalculatorState.operators.ADD)

                // Get result
                const result = state.operator.label

                expect(result).toEqual(CalculatorState.operators.ADD.label)
            })

        })

        describe('After the right side of the operator is set', () => {

            test(`calculate the result of previous operation and set it as the left side`, () => {
                // Init state
                const state = new CalculatorState({
                    leftSide: 3,
                    operator: CalculatorState.operators.ADD,
                    rightSide: 7
                })

                // Execute action
                state.operationPressed(CalculatorState.operators.ADD)

                // Get result
                const result = state.leftSide

                expect(result).toEqual(10)
            })

        })

    })

    describe('Pressing numbers after operator is selected', () => {

        describe('When no other number was pressed before', () => {

            test(`set the number as the right side of an operation`, () => {
                // Init state
                const state = new CalculatorState({
                    leftSide: 0,
                    operator: CalculatorState.operators.ADD
                })

                // Execute action
                state.numberPressed(3)

                // Get result
                const result = state.rightSide

                expect(result).toEqual(3)
            })

        })

        describe('When another number was pressed before', () => {

            test(`concatenate the number to the right side of an operation`, () => {
                // Init state
                const state = new CalculatorState({
                    leftSide: 3
                })

                // Execute action
                state.numberPressed(0)

                // Get result
                const result = state.leftSide

                expect(result).toEqual(30)
            })

        })

        describe('When only 0 was pressed before', () => {

            test(`replace 0 with the number as the right side of an operation`, () => {
                // Init state
                const state = new CalculatorState({
                    leftSide: 0
                })

                // Execute action
                state.numberPressed(3)

                // Get result
                const result = state.leftSide

                expect(result).toEqual(3)
            })

        })

    })

})

// Test suite covering requirements for the class output used by other application components
describe('Calculating result and memory', () => {

    describe('When numbers are pressed before operator is chosen', () => {

        test(`result returns the pressed numbers concatenated`, () => {
            // Init state
            const state = new CalculatorState({})

            // Execute action
            state.numberPressed(3)
            state.numberPressed(2)

            // Get result
            const result = state.result

            expect(result).toEqual(32)
        })

        test(`memory returns an empty string`, () => {
            // Init state
            const state = new CalculatorState({})

            // Execute action
            state.numberPressed(3)
            state.numberPressed(2)

            // Get result
            const result = state.memory

            expect(result).toEqual('')
        })

    })

    describe('When ordinary operator is chosen', () => {

        test(`result returns numbers pressed before`, () => {
            // Init state
            const state = new CalculatorState({
                leftSide: 34
            })

            // Execute action
            state.operationPressed(CalculatorState.operators.ADD)

            // Get result
            const result = state.result

            expect(result).toEqual(34)
        })

        test(`memory returns a string: {left side} {the operator}`, () => {
            // Init state
            const state = new CalculatorState({
                leftSide: 34
            })

            // Execute action
            state.operationPressed(CalculatorState.operators.ADD)

            // Get result
            const result = state.memory

            expect(result).toEqual('34 +')
        })

    })

    describe('When ordinary operator is chosen before left side is set', () => {

        test(`memory returns empty string`, () => {
            // Init state
            const state = new CalculatorState({})

            // Execute action
            state.operationPressed(CalculatorState.operators.ADD)

            // Get result
            const result = state.memory

            expect(result).toEqual('')
        })

    })

    describe('When numbers are pressed after operator is chosen', () => {

        test(`result returns pressed numbers concatenated`, () => {
            // Init state
            const state = new CalculatorState({
                leftSide: 1,
                operator: CalculatorState.operators.ADD
            })

            // Execute action
            state.numberPressed(3)
            state.numberPressed(2)

            // Get result
            const result = state.result

            expect(result).toEqual(32)
        })

        test(`memory returns a string: {left side} {the operator}`, () => {
            // Init state
            const state = new CalculatorState({
                leftSide: 34,
                operator: CalculatorState.operators.ADD
            })

            // Execute action
            state.numberPressed(3)
            state.numberPressed(2)

            // Get result
            const result = state.memory

            expect(result).toEqual('34 +')
        })

    })

    describe('When RESULT operator is pressed after right side numbers are set', () => {

        test(`result returns a result of the operation`, () => {
            // Init state
            const state = new CalculatorState({
                leftSide: 10,
                operator: CalculatorState.operators.ADD,
                rightSide: 30
            })

            // Execute action
            state.calculateResult()

            // Get result
            const result = state.result

            expect(result).toEqual(40)
        })

        test(`memory returns a string: {left side} {the operator} {right side} =`, () => {
            // Init state
            const state = new CalculatorState({
                leftSide: 10,
                operator: CalculatorState.operators.ADD,
                rightSide: 30
            })

            // Execute action
            state.calculateResult()

            // Get result
            const result = state.memory

            expect(result).toEqual('10 + 30 =')
        })

    })

    describe('When ordinary operator is pressed after EQUAL operator', () => {

        test(`left side is set with a value of last result and memory returns a string: {left side} {the operator}`, () => {
            // Init state
            const state = new CalculatorState({
                leftSide: 10,
                operator: CalculatorState.operators.ADD,
                rightSide: 30
            })

            // Execute action
            state.calculateResult()
            state.operationPressed(CalculatorState.operators.ADD)

            // Get result
            const result = state.memory

            expect(result).toEqual('40 +')
        })

    })

    describe('When ordinary operator is pressed after another ordinary operator', () => {

        test(`left side is set with a value of last result and memory returns a string: {left side} {the operator}`, () => {
            // Init state
            const state = new CalculatorState({
                leftSide: 10,
                operator: CalculatorState.operators.ADD,
                rightSide: 30
            })

            // Execute action
            state.operationPressed(CalculatorState.operators.SUBTRACT)

            // Get result
            const result = state.memory

            expect(result).toEqual('40 -')
        })

    })

    describe('When RESULT operator is pressed multiple times in a row', () => {

        test(`left side is set as the last result, operation is repeated with unchanged right side and the last result is updated`, () => {
            // Init state
            const state = new CalculatorState({
                leftSide: 10,
                operator: CalculatorState.operators.ADD,
                rightSide: 30
            })

            // Execute action
            state.calculateResult()
            state.calculateResult()

            // Get result
            const result = state.result

            expect(result).toEqual(70)
        })

        test(`memory returns a string: {left side} {the operator} {right side} =`, () => {
            // Init state
            const state = new CalculatorState({
                leftSide: 10,
                operator: CalculatorState.operators.ADD,
                rightSide: 30
            })

            // Execute action
            state.calculateResult()
            state.calculateResult()

            // Get result
            const result = state.memory

            expect(result).toEqual('40 + 30 =')
        })

    })

    describe('When number is pressed after the last result has been calculated', () => {

        test(`result returns the pressed number`, () => {
            // Init state
            const state = new CalculatorState({
                leftSide: 10,
                operator: CalculatorState.operators.ADD,
                rightSide: 30
            })

            // Execute action
            state.calculateResult()
            state.numberPressed(3)

            // Get result
            const result = state.result

            expect(result).toEqual(3)
        })

        test(`memory is empty`, () => {
            // Init state
            const state = new CalculatorState({
                leftSide: 10,
                operator: CalculatorState.operators.ADD,
                rightSide: 30
            })

            // Execute action
            state.calculateResult()
            state.numberPressed(3)

            // Get result
            const result = state.memory

            expect(result).toEqual('')
        })

    })

})

// Test suite covering extension of basic calculator functionality with a range of desirable operators
describe('Available operations', () => {

    describe('Add operation', () => {

        test(`adds two numbers`, () => {
            // Init state
            const state = new CalculatorState({
                leftSide: 2,
                operator: CalculatorState.operators.ADD,
                rightSide: 3
            })

            // Execute action
            state.calculateResult()

            // Get result
            const result = state.result

            expect(result).toEqual(5)
        })

    })

    describe('Subtract operation', () => {

        test(`subtracts two numbers`, () => {
            // Init state
            const state = new CalculatorState({
                leftSide: 2,
                operator: CalculatorState.operators.SUBTRACT,
                rightSide: 3
            })

            // Execute action
            state.calculateResult()

            // Get result
            const result = state.result

            expect(result).toEqual(-1)
        })

    })


    describe('Clear operation', () => {

        test(`Resets the state`, () => {
            // Init state
            const state = new CalculatorState({
                leftSide: 2,
                operator: CalculatorState.operators.SUBTRACT,
                rightSide: 3
            })

            // Execute action
            state.calculateResult()

            // Get result
            const result = state.result

            expect(result).toEqual(-1)
        })

    })

})