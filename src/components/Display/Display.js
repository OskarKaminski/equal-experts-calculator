import React, { useState } from 'react'
import { Memory, Result, Wrapper } from './Display.styles'
import DisplayCtrl from './Display.ctrl'
import { observer } from 'mobx-react'

const Display = ({state}) => {
    const [ctrl, _] = useState(new DisplayCtrl(state))

    return (
        <Wrapper>
            <Memory>
                {ctrl.memory}
            </Memory>
            <Result>
                {ctrl.result}
            </Result>
        </Wrapper>
    )
}

export default observer(Display)