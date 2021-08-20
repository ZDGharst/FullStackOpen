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