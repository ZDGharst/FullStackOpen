import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import loginService from '../services/login'
import PropTypes from 'prop-types'
import { resetNotification, updateNotification } from '../reducers/notificationReducer'

const LoginForm = ({ setUser }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      setUser(user)
      setUsername('')
      setPassword('')

      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
      dispatch(resetNotification())
    } catch (exception) {
      dispatch(updateNotification('Invalid username or password.', 'error', 10))
    }
  }

  return (
    <form onSubmit={handleLogin} >
      <div>
        username
        <input type="text" value={username} id="username" name="Username" onChange={({ target }) => setUsername(target.value)} />
      </div>
      <div>
        password
        <input type="password" value={password} id="password" name="Password" onChange={({ target }) => setPassword(target.value)} />
      </div>
      <button id="login-button" type="submit">login</button>
    </form>
  )
}

LoginForm.propTypes  = {
  setUser: PropTypes.func.isRequired
}

export default LoginForm
