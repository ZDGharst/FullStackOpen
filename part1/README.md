# Part 1

## 1a - Introduction to React

Using `npx create-react-app [name]` will create a React app quickly and configure it for git, JSX usage, Babel transpiling, etc.

### Component

The following code snippet defines a component with the name App, using an anonymous function with no parameters and setting it to App.

```js
const App = () => (
  <div>
    <p>Hello world</p>
  </div>
)
```

This is shorthand for:

```js
const App = () => {
  return (
    <div>
      <p>Hello world</p>
    </div>
  )
}
```

Every component must have a root level element. When adding an unnecessary root element, it's preferred to use an empty element: `<>`.

### JSX

React components compile JSX into JavaScript.

Before:

```js
const App = () => {
  const now = new Date()
  const a = 10
  const b = 20

  return (
    <div>
      <p>Hello world, it is {now.toString()}</p>
      <p>
        {a} plus {b} is {a + b}
      </p>
    </div>
  )
}
```

After:

```js
const App = () => {
  const now = new Date()
  const a = 10
  const b = 20
  return React.createElement(
    'div',
    null,
    React.createElement(
      'p', null, 'Hello world, it is ', now.toString()
    ),
    React.createElement(
      'p', null, a, ' plus ', b, ' is ', a + b
    )
  )
}
```

All tags must be closed in JSX.

### Props

Pass data to components using props.

The Hello component:

```js
const Hello = (props) => {  return (
    <div>
      <p>Hello {props.name}</p>
    </div>
  )
}
```

The App component that calls it:

```js
const App = () => {
  return (
    <div>
      <h1>Greetings</h1>
      <Hello name="George" />      <Hello name="Daisy" />    </div>
  )
}
```

## 1b - JavaScript

A lot of JavaScript actually ran by browsers has been transpiled. Transpiling is the act of taking modern JavaScript and translating it to older, more compatible JavaScript that browsers can run.

### Variables

```js
// because of scoping, var should be avoided
const x = 5
let y = 7

y += 10
y = 'sometext'
```

### Arrays

```js
const t = [1, -1, 3]

t.push(5)

console.log(t.length) // 4 is printed
console.log(t[1])     // -1 is printed

t.forEach(value => {
  console.log(value)  // numbers 1, -1, 3, 5 are printed, each to own line
})          
```

Functional programming paradigm considerations:

```js
const t = [1, -1, 3]

const t2 = t.concat(5)

console.log(t)  // [1, -1, 3] is printed
console.log(t2) // [1, -1, 3, 5] is printed

const m = [1, 2, 3]

const m1 = m.map(value => value * 2)
console.log(m1)   // [2, 4, 6] is printed

const m2 = m.map(value => '<li>' + value + '</li>')
console.log(m2)  
// [ '<li>1</li>', '<li>2</li>', '<li>3</li>' ] is printed

const t = [1, 2, 3, 4, 5]
const [first, second, ...rest] = t

console.log(first, second)  // 1, 2 is printed
console.log(rest)          // [3, 4, 5] is printed
```

### Objects

```js
const object1 = {
  name: 'Arto Hellas',
  age: 35,
  education: 'PhD',
}

console.log(object1.name)         // Arto Hellas is printed
const fieldName = 'age' 
console.log(object1[fieldName])    // 35 is printed

// add fields to objects; must use brackets because of the space character
object1.address = 'Helsinki'
object1['secret number'] = 12341
```

### Functions

```js
const sum = (p1, p2) => {
  console.log(p1)
  console.log(p2)
  return p1 + p2
}

const result = sum(1, 5)
console.log(result)
```

Functions with a single parameter can be declared as such

```js
const square = p => {
  console.log(p)
  return p * p
}
```

Functions with only a single expression:

```js
const square = p => p * p
```

An example, using map.

```js
const t = [1, 2, 3]
const tSquared = t.map(p => p * p)
// tSquared is now [1, 4, 9]
```

### Object Methods, this

Assign methods to an object by defining properties that are functions:

```js
const arto = {
  name: 'Arto Hellas',
  age: 35,
  education: 'PhD',
  greet: function()
  {
    console.log('hello, my name is ' + this.name)
  },
}

arto.greet()  // "hello, my name is Arto Hellas" gets printed

// methods can be assigned after creation of the object
arto.growOlder = function() {
  this.age += 1
}
```

Good programming practice in JavaScript dictates that the keyword "this" is avoided: depending on the scope of the function that calls the object method, this could refer to the object itself, the calling function, or a global object.

### Classes

JavaScript only defines the types Boolean, Null, Undefined, Number, String, Symbol, BigInt, and Object. Classes can be created, which is of type Object under the hood, that are reminiscent of object-oriented languages.

```js
class Person {
  constructor(name, age) {
    this.name = name
    this.age = age
  }
  greet() {
    console.log('hello, my name is ' + this.name)
  }
}

const adam = new Person('Adam Ondra', 35)
adam.greet()

const janja = new Person('Janja Garnbret', 22)
janja.greet()
```

## 1c - Component state, event handlers

### Component Helper Functions

Add component helper functions to components; they will be called when a component is rendered.

```js
const Hello = (props) => {
  const bornYear = () => {    const yearNow = new Date().getFullYear()    return yearNow - props.age  }
  return (
    <div>
      <p>
        Hello {props.name}, you are {props.age} years old
      </p>
      <p>So you were probably born in {bornYear()}</p>    </div>
  )
}
```

### Destructuring

ES6 allows programmers to destructure values from objects and arrays upon assignment. For example, if we had a `props` object with `name` and `age` properties, they could be destructured as such:

```js
props = {
  name: 'Arto Hellas',
  age: 35,
}

// before destructuring is implemented
const Hello = (props) => {
  const name = props.name
  const age = props.age

  const bornYear = () => new Date().getFullYear() - age

  return (
    <div>
      <p>Hello {name}, you are {age} years old</p>
      <p>So you were probably born in {bornYear()}</p>
    </div>
  )
}

// after destructuring is implemented
const Hello = ({ name, age }) => {
  const bornYear = () => new Date().getFullYear() - age

  return (
    <div>
      <p>Hello {name}, you are {age} years old</p>
      <p>So you were probably born in {bornYear()}</p>
    </div>
  )
}
```

### Stateful Components

In order to efficiently re-render pages, add state to components.

```js
import React, { useState } from 'react'

const App = () => {
  const [ counter, setCounter ] = useState(0)

  setTimeout(
    () => setCounter(counter + 1),
    1000
  )

  return (
    <div>{counter}</div>
  )
}

export default App
```

### Event Handling

Event handlers are registered to be called when specific events occur, such as a page click.

```js
const App = () => {
  const [ counter, setCounter ] = useState(0)

  return (
    <div>
      <div>{counter}</div>
      <button onClick={() => setCounter(counter + 1)}>
        plus
      </button>
      <button onClick={() => setCounter(0)}>
        zero
      </button>
    </div>
  )
}
```

Take care to use a function or function reference for event handlers, not a call to a function (`() => setCounter(0)` instead of `setCounter(0)`).

## 1d - A more complex state, debugging React apps

### Complex state, handling arrays

You can use objects or arrays to encase multiple states. Doing this, it may be best to use the object spread syntax to copy objects to then modify them before passing them as a new state point.

```js
const clicks = {
  left: 0,
  right: 0
}

const copy = {
  ...clicks,
  left: clicks.left + 1
}

const arr = Array(5).fill(0)
const arrCopy = [...arr]
```

### Conditional rendering

Use `if` statements to return different values based on the state of the application.

### Old React, debugging React applications

Old React uses class components; new React prefers hooks. It's important to know class syntax for working on legacy code.

Tips for debugging React applications:

- Keep the browser's console open at all times
- Fix errors as they happen rather than continuing to code
- Old school print debugging is always a good idea.
- Use breakpoints within Chrome developer tools.
- Write debugger anywhere in your code to use Chrome's developer debugger.

### Rules of Hooks

Do not call `useState` within conditionals, loops, and non-component functions.

### Event Handling Revisited

Event handlers should be functions or function references rather than calls to functions:

```js
// this is a function call; it will immediately log to console when page renders,
// and its return value will be set to onClick
<button onClick={console.log('clicked the button')}>
  button
</button>

// this is a function; it will be called when the onClick happens
<button onClick={() => console.log('clicked the button')}>
  button
</button>
```

### Function that returns a function

Because of the previous section, it's often useful to have a function that returns a function within it so that the desired effect isn't called on an event handle. The nested function's reference is returned by the original function on page render.

```js
const hello = () => {
  const handler = () => console.log('hello world')
  return handler
}

// or

const hello = () => {
  return () => console.log('hello world')
}

<button onClick={hello()}>button</button>

// allows for parameters
const setToValue = (newValue) => () => {
  setValue(newValue)
}

<button onClick={setToValue(1000)}>thousand</button>
<button onClick={setToValue(0)}>reset</button>
<button onClick={setToValue(value + 1)}>increment</button>
```
