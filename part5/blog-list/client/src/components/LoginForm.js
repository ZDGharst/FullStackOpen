import React, { useState } from 'react'

import loginService from '../services/login'
import PropTypes from 'prop-types'

const LoginForm = ({ setUser, setNotification }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

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
    } catch (exception) {
      setNotification({ message: 'Invalid username or password.', type: 'error' })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
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
