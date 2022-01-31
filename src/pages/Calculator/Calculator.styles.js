import styled, { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  body{
      margin: 15px 0 0 0;
      display: flex;
      justify-content: center;
      background-color: #e0e0e0;
  }
`

export const Wrapper = styled.div`
  max-width: 260px;
  display: flex;
  flex-direction: column;
  background-color: #303841;
  padding: 20px 20px 40px 20px;
  border-radius: 10px;
`

