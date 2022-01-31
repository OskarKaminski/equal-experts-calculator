# Calculator project for Equal Experts interview

This is an implementation of a simple calculator built as part of an interview process for [Equal Experts](https://www.equalexperts.com/).

[You can find the full problem description here](https://equalexperts.github.io/ee-tech-interviews-uk/calculator-problem.html).

__Version number:__ 5b8d0fd276b6d288905ed2f63a934e057e8feca2

## Getting started
As usual, run:
1. `npm i`
1. `npm start`

The project (by default) runs on `localhost:8080`.

## Features & Limitations
- All logic (`CalculatorState` class) was written using TDD approach.
- Buttons are animated for increased immersion.
- Branding was embedded as a core functionality instead of ugly, unnecessary footer everyone wishes to remove.
- There is a limited number of operators implemented following an Open-Closed principle enabling their easy extension
  without need for modification of any existing functional code.
- Responsiveness to the device size is limited: the minimum device width is 300px and the calculator doesn't change
its proportions. Extended responsiveness would require at least fundamental UX research based on the real product purpose and applications.
- There is no support for decimal operations as this would involve additional effort of handling 64-bit binary format IEEE 754 precision issues.
- There is no support for keydown operations.
- There is no backspace operator.
