# Part 7 - React router, custom hooks, styling app with CSS and webpack

## Serving pages

In old websites, serving different pages was done by doing HTTP GET requests to the server and rendering the HTML that was returned.

With JavaScript applications, like React, pages are done by changing the history of the browser and modifying the DOM. The only HTTP requests done are for fetching JSON formatted data.

The basic way to implement paging is to use states. Have the state represent the page that the user is on; when the user clicks a link, the state changes to that page. The components that are rendered are dependent on the state.

## React router

The solution in the previous section works, however, it can be difficult to keep track of a large number of pages. Using the React router library provides an excellent solution for managing navigation.

```js
import {
  BrowserRouter as Router,
  Switch, Route, Link
} from "react-router-dom"

const App = () => {

  const padding = {
    padding: 5
  }

  return (
    <Router>
      <div>
        <Link style={padding} to="/">home</Link>
        <Link style={padding} to="/notes">notes</Link>
        <Link style={padding} to="/users">users</Link>
      </div>

      <Switch>
        <Route path="/notes">
          <Notes />
        </Route>
        <Route path="/users">
          <Users />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>

      <div>
        <i>Note app, Department of Computer Science 2021</i>
      </div>
    </Router>
  )
}
```

The `path` attribute signals which component should render dependent on the browser's address. `Link` components have a `to` attribute; this modifies the browser's history using the HTML5 history API. The order of the Routes matter, as only the first match will trigger.

## Adding parameters to routes

Add parameters to paths and use them using the useParams hook.

```js
<Route path="/notes/:id">
  <Note notes={notes} />
</Route>

const id = useParams().id
```

## useHistory and Redirects

The useHistory hook allows for the ability to modify the browser history, such as redirecting.

```js
const Login = (props) => {
  const history = useHistory()

  const onSubmit = (event) => {
    event.preventDefault()
    props.onLogin('mluukkai')
    history.push('/')
  }

  return (
    <div>
      <h2>login</h2>
      <form onSubmit={onSubmit}>
        <div>
          username: <input />
        </div>
        <div>
          password: <input type='password' />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}
```

A redirect can also be rendered as a component in JSX.

```js
<Route path="/users">
  {user ? <Users /> : <Redirect to="/login" />}
</Route>
```

## useRouteMatch

The `useRouteMatch` hook allows for accessing the parameters for certain routes only.

```js
const match = useRouteMatch('/notes/:id')
const note = match 
  ? notes.find(note => note.id === Number(match.params.id))
  : null
```

## Custom hooks

React offers many built-in hooks: `useState`, `useEffect`, `useImperativeHandle`, etc. Libraries such as react-redux and react-router add hooks, like `useSelector`, `useDispatch`, `useHistory`, etc.

Remember that Hooks can't be called from regular JavaScript functions, only components. They also can't be used inside loops, conditionals, or nested functions.

React has the ability to create your own custom hooks. The name of custom hooks must start with the word `use`.

```js
const useCounter = () => {
  const [value, setValue] = useState(0)

  const increase = () => {
    setValue(value + 1)
  }

  const decrease = () => {
    setValue(value - 1)
  }

  const zero = () => {
    setValue(0)
  }

  return {
    value, 
    increase,
    decrease,
    zero
  }
}

const App = () => {
  const left = useCounter()
  const right = useCounter()

  return (
    <div>
      {left.value}
      <button onClick={left.increase}>
        left
      </button>
      <button onClick={right.increase}>
        right
      </button>
      {right.value}
    </div>
  )
}
```

## Spread attributes

You can use the spread operator to add attributes to elements.

```js
const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const name = useField('text')
  
<input {...name />
```

## Ready-made UI libraries

Bootstrap, created by Twitter, is the first widely popular UI framework. Traditionally, UI frameworks were used by including CSS stylesheets and JS source files to the website. Today, there are other UI frameworks such as reactstrap, react-bootstrap, MaterialUI.

## React Bootstrap

To use Bootstrap with React, first install react-bootstrap: `npm install react-bootstrap`. Add the bootstrap CSS sheet to the head tag of the public/index.html file. Then, add the bootstrap class names to the elements: `<div className="container">` or import React Bootstrap components:

```js
import { Table } from 'react-boostrap'

<Table striped>
```

## MaterialUI

MaterialUI is an implementation of the Material design visual language developed by Google.

`npm install @material-ui/core`

Just as before, add the stylesheet to the index.html head tag.

MaterialUI only includes components; no classes to add like bootstrap. However, it is a lot less cryptic to use and the JSX used is much more pleasant to read.

```js
<AppBar position="static">
  <Toolbar>
    <IconButton edge="start" color="inherit" aria-label="menu">
    </IconButton>
    <Button color="inherit">
      <Link to="/">home</Link>
    </Button>
    <Button color="inherit">
      <Link to="/notes">notes</Link>
    </Button>
    <Button color="inherit">
      <Link to="/users">users</Link>
    </Button>  
    <Button color="inherit">
      {user
        ? <em>{user} logged in</em>
        : <Link to="/login">login</Link>
      }
    </Button>                
  </Toolbar>
</AppBar>
```

## Styled components

The styled components library allows tagged template literals to add styles to components.

```js
import styled from 'styled-components'

const Button = styled.button`
  background: Bisque;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid Chocolate;
  border-radius: 3px;
`

const Input = styled.input`
  margin: 0.25em;
`

const Page = styled.div`
  padding: 1em;
  background: papayawhip;
`

const Navigation = styled.div`
  background: BurlyWood;
  padding: 1em;
`

const Footer = styled.div`
  background: Chocolate;
  padding: 1em;
  margin-top: 1em;
`
```

## Webpack

`create-react-app` is handy to start React development without having to configure a hundred different tools.

One of the tools that is configured for the developer is webpack. Webpack is a bundling tool that transform JavaScript source code files into a single file that contains the code needed for the application. The loading of each file individually is slow; and the compiled code has reduced whitespace, symbol names, etc. `create-react-app` configures webpack such that it will build the main JavaScript file with `npm run build`, compile JSX to JavaScript using loaders (babel), adds polyfill for async/await, transpiles JavaScript code into an older form (from ES7 to ES5), loads CSS from inline components, maps source code to compiled code for debugging, and minifies the code.

## Class components

Before version 16.8 introduced hooks, React was used with classes and components were Class Components. It's still important to be familiar of old React code that was written with classes.

```js
class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      anecdotes: [],
      current: 0
    }
  }

  componentDidMount = () => {
    axios.get('http://localhost:3001/anecdotes').then(response => {
      this.setState({ anecdotes: response.data })
    })
  }

  handleClick = () => {
    const current = Math.floor(
      Math.random() * this.state.anecdotes.length
      )

    this.setState({ current })
  }

  render() {
    if(this.state.anecdotes.length === 0) {
      return <div>no anecdotes...</div>
    }

    return (
      <div>
        <h1>anecdote of the day</h1>
        <div>{this.state.anecdotes[this.state.current].content}</div>
        <button onClick={this.handleClick}>next</button>
      </div>
    )
  }
}
```

## The role of React

React has a more narrow area of application than Angular, which is an all-encompassing Frontend MVC-framework. React is considered a library, not a framework, because of this. React tends to only be a UI library with Flux architecture acting on the business logic.

## Current trends

- Typed version of JavaScript: TypeScript
- Server side rendering
- Progressive web apps
- Microservice architecture
- Serverless

## Additional libraries to consider

- lodash
- ramda
- date-fns
- Formik
- redux-form
- immutable.js
- recharts
- highcharts
- redux-saga
