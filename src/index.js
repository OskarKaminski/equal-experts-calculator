import React from 'react';
import { render } from 'react-dom';
import Calculator from './pages/Calculator/Calculator';

let root = document.createElement('div')
document.body.appendChild(root)

render(
    <Calculator/>,
    root
);

