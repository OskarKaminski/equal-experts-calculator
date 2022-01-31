import React, {useState} from 'react'
import { Wrapper } from './Keypad.styles'
import Button from '../Button/Button'
import KeypadCtrl from './Keypad.ctrl'

const Keypad = ({state}) => {
    const [ctrl, _] = useState(new KeypadCtrl(state))

    return (
        <Wrapper>
            {
                ctrl.buttons.map((buttonProps, i) => (
                    <Button key={i} {...buttonProps} ></Button>
                ))
            }
        </Wrapper>
    )
}

export default Keypad