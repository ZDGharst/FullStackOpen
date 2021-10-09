# Part 6 - State management with Redux

## Flux architecture

Flux architecture, developed by Facebook, intends to make state management easier. The state is separated completely from the React-components into its own stores. State is changed via actions, and when an action changes the state of the store, the views are rerendered.

[[https://facebook.github.io/flux/img/overview/flux-simple-f8-diagram-with-client-action-1300w.png]]

## Redux

Redux is a library that implements Flux architecture. The whole state of the application is stored in a single JavaScript-object in the store. The state of the store changes with actions.

Reducers are functions that are given the current state and an action as parameters and returns a new state.

```js
const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    case 'ZERO':
      return 0
    default: // if none of the above matches, code comes here
      return state
  }
}
```

Create a store and pass the reducer as a parameter.

```js
import { createStore } from 'redux'

const counterReducer = (state = 0, action) => {
  // ...
}

const store = createStore(counterReducer)
```

Change the store by calling dispatching with an object that defines the action.

```js
store.dispatch({type: 'INCREMENT'})
```

You can create callback functions for when the store is changed using `store.subscribe()`.

## Redux notes
The state is immutable; the old state is not changed, a new state is created and returned. Using the library `deep-freeze` allows for testing for immutable JavaScript.

Redux DevTools is a Chrome extension that allows the state of the Redux store to be viewed and also the actions from the console of the browser.

## Uncontrolled form

Uncontrolled forms are forms that do not have a React state. There are limitations with this, such as dynamic error messages, disabling the submit button, etc.

## Action creators

A best practice is to create functions that create actions -- action creators. Rather than dispatching an object that represents the action, we call a function that returns the action object then dispatch that.

```js
const createNote = (content) => {
  return {
    type: 'NEW_NOTE',
    data: {
      content,
      important: false,
      id: generateId()
    }
  }
}

const toggleImportanceOf = (id) => {
  return {
    type: 'TOGGLE_IMPORTANCE',
    data: { id }
  }
}

// App.js
store.dispatch(createNote(content))
```

## Forwarding Redux-Store to various components

react-redux is a library that allows for hooks API (connect, as well) for managing the store.

```js
import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './App'
import noteReducer from './reducers/noteReducer'

const store = createStore(noteReducer)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
```

Use selector and dispatch to access/update the store:
```
js
import { useSelector, useDispatch } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()
  // ...

  const toggleImportance = (id) => {
    dispatch(toggleImportanceOf(id))
  }

  // ...
}
```

## Combined reducers

Adding multile reducers allow for more simplistic reducers that are loosely coupled.

```js
import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux' 
import App from './App'

import noteReducer from './reducers/noteReducer'
import filterReducer from './reducers/filterReducer'

const reducer = combineReducers({
  notes: noteReducer,
  filter: filterReducer
})

const store = createStore(reducer)

console.log(store.getState())

ReactDOM.render(
  /*
  <Provider store={store}>
    <App />
  </Provider>,
  */
  <div />,
  document.getElementById('root')
)
```

## redux thunk

Preferably, it would be helpful to have middleware that allows for react-redux to have asynchronous actions. This makes it easier to connect with backend, set timers, etc.

```js
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import noteReducer from './reducers/noteReducer'
import filterReducer from './reducers/filterReducer'

const reducer = combineReducers({
  notes: noteReducer,
  filter: filterReducer,
})

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

export default store
```js
export const initializeNotes = () => {
  return async dispatch => {
    const notes = await noteService.getAll()
    dispatch({
      type: 'INIT_NOTES',
      data: notes,
    })
  }
}

// app.js
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeNotes()) 
  },[dispatch]) 
```

## connect

`connect` is an older style of using react-redux. The selector and dispatch are mapped to the props of the components.

## Presentational vs Container Component

Defining and structuring React applications this way allows for the following benefits:

- Better separation of concerns. You understand your app and your UI better by writing components this way.
- Better reusability. You can use the same presentational component with completely different state sources, and turn those into separate container components that can be further reused.
- Presentational components are essentially your app’s “palette”. You can put them on a single page and let the designer tweak all their variations without touching the app’s logic. You can run screenshot regression tests on that page.

### Presentational

- Are concerned with how things look.
- May contain both presentational and container components inside, and usually have some DOM markup and styles of their own.
- Often allow containment via props.children.
- Have no dependencies on the rest of the app, such as Redux actions or stores.
- Don’t specify how the data is loaded or mutated.
- Receive data and callbacks exclusively via props.
- Rarely have their own state (when they do, it’s UI state rather than data).
- Are written as functional components unless they need state, lifecycle hooks, or performance optimizations.

### Container

- Are concerned with how things work.
- May contain both presentational and container components inside but usually don’t have any DOM markup of their own except for some wrapping divs, and never have any styles.
- Provide the data and behavior to presentational or other container components.
- Call Redux actions and provide these as callbacks to the presentational components.
- Are often stateful, as they tend to serve as data sources.
- Are usually generated using higher order components such as connect from React Redux, rather than written by hand.

## Redux and the component state

Know when Redux isn't needed and resort to `useState`. `useState` is better for local state within a component only, for example.