import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Form, Button } from 'react-bootstrap'

import { login } from '../reducers/userReducer'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()

    dispatch(login(username, password))
  }

  return (
    <Form onSubmit={handleLogin}>
      <Form.Group>
        <Form.Label>Username: </Form.Label>
        <Form.Control
          name="username"
          onChange={({ target }) => setUsername(target.value)}
          type="text"
          value={username}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Password: </Form.Label>
        <Form.Control
          name="password"
          onChange={({ target }) => setPassword(target.value)}
          type="password"
          value={password}
        />
      </Form.Group>
      <Button id="login-button" type="submit">Login</Button>
    </Form>
  )
}

export default LoginForm
