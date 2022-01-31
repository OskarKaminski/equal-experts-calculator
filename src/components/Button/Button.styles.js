import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  width: 40px;
  height: 40px;
  border-radius: ${({rounded}) => rounded ? '50%' : '8px'};
  justify-content: center;
  align-items: center;
  background-color: transparent;
  box-shadow: 0px 0px 5px 1px rgba(0,0,0,.08);
  color: white;
  font-weight: 800;
  font-size: 1.4rem;
  font-family: Roboto;

  ${({wide}) => wide && `
    width: 100px;
  `}
`

export const Logo = styled.img`
  width: 100%;
  height: 100%;
`

export const Container = styled.div`
  display: flex;
  border-radius: ${({rounded}) => rounded ? '50%' : '8px'};
  justify-content: center;
  align-items: center;
  background-color: ${({color, disabled}) => disabled ? color + 'AA' : color};
  height: 50px;
  width: 50px;
  cursor: ${({disabled}) => disabled ? 'not-allowed' : 'pointer'};
  
  ${({wide}) => wide && `
    grid-column: span 2;
    width: 120px;
  `}

  // Buttons shouldn't have a background selection effect to be more immersive.
  & *::selection {
    background: transparent;
  }
  
  :hover{
    background-color: ${({color, disabled}) => !disabled && color + 'E0'};
  }
  
  :active{
    ${({disabled}) => !disabled ? `
      transform: translateY(3px);
    ` : `
      animation-name: clickDisabled;
      animation-duration: 1s;
    `}

    @keyframes clickDisabled {
      0%   {transform: translateX(2px);}
      25%  {transform: translateX(-2px);}
      50%  {transform: translateX(4px);}
      100% {transform: translateX(-4px);}
    }
  }
`