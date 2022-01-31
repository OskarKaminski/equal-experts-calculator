import React from 'react'
import { Container, Logo, Wrapper } from './Button.styles'

const Button = ({ label = '', onClick, rounded = false, wide = false, color = '#A2CAD9', logoUrl }) => (
    <Container onClick={onClick} rounded={rounded} wide={wide} color={color} disabled={!onClick}>
        <Wrapper rounded={rounded} wide={wide}>
            {
                !!logoUrl ?
                    <Logo src={logoUrl} /> :
                    <span>{label}</span>
            }
        </Wrapper>
    </Container>
)

export default Button