# Part5 - Testing React apps

## Sending the token to the backend along with the request

Add the token to the Authorization header in the request.

```js
let token = null
const setToken = newToken => 
  token = `bearer ${newToken}`
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}
```

## Saving data to the local storage

You can save key-value string pairs to the users local storage on theiir browser.

```js
window.localStorage.setItem('name', 'juha tauriainen')
window.localStorage.getItem('name')
window.localStorage.clear()
```

Care should be taken for XSS attacks.

## Nested components

Components and other data can be nested inside of a component.

```js
<Parent>
  <Child>
  <Child>
</Parent>

// within Parent component
<div>
  {props.children}
</div>
```

## References to components with ref

Best practice says that states should be held as close to the child component as possible. Sometimes, components need to send data or commands up from a child component. To do so, use refs.

```js
// parent
import React, { useState, useEffect, useRef } from 'react'

const noteFormRef = useRef()

<Togglable buttonLabel='new note' ref={noteFormRef}>      <NoteForm createNote={addNote} />
</Togglable>

// child
useImperativeHandle(ref, () => {
  return {
    toggleVisibility
  }
})
```

## PropTypes

PropTypes can be used (`npm install prop-types`) to give types and requirements to props.

```js
import PropTypes from 'prop-types'

const Togglable = React.forwardRef((props, ref) => {
  // ..
})

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}
```

## Testing React appps

You may write tests in a test folder or alongside the code (`Note.test.js`) in the same directory.

Using Jest to write tests for React components:

```js
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Note from './Note'

test('renders content', () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true
  }

  const component = render(
    <Note note={note} />
  )

  expect(component.container).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )
})
```

You can use fireEvent to simulate clicks or form completions. You can use mock functions using `jest.fn()`.

```js
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Note from './Note'

test('renders content', () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true
  }

  const component = render(
    <Note note={note} />
  )

  expect(component.container).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )
})
```

## Test coverage

Easily find out the coverage of our tests using `CI=true npm test -- --coverage`.

## Cypress

Cypress is used for end to end testiing (E2E). 

```js
describe('Note app', function() {
  it('front page can be opened', function() {
    cy.visit('http://localhost:3000')
    cy.contains('Notes')
    cy.contains('Note app, Department of Computer Science, University of Helsinki 2021')
  })
})

describe('Note app',  function() {
  it('user can log in', function() {
    cy.contains('log in').click()
    cy.get('#username').type('mluukkai')
    cy.get('#password').type('salainen')
    cy.get('#login-button').click()
    cy.contains('Matti Luukkainen logged in')  })
})
```

Write custom commands to speed up testing creeation.

```js
Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', 'http://localhost:3001/api/login', {
    username, password
  }).then(({ body }) => {
    localStorage.setItem('loggedNoteappUser', JSON.stringify(body))
    cy.visit('http://localhost:3000')
  })
})

describe('when logged in', function() {
  beforeEach(function() {
    cy.login({ username: 'mluukkai', password: 'salainen' })
    })
})
```

## Using a test router to control the database

```js
const router = require('express').Router()
const Note = require('../models/note')
const User = require('../models/user')

router.post('/reset', async (request, response) => {
  await Note.deleteMany({})
  await User.deleteMany({})

  response.status(204).end()
})

module.exports = router

// within App.js
if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}
```