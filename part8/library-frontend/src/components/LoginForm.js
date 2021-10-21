import React, { useEffect, useState } from "react";
import { useMutation } from '@apollo/client'
import { LOGIN } from "../queries";

const LoginForm = ({ setToken }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const [login, result ] = useMutation(LOGIN, {
    onError: (err) => {
      setError(err.graphQLErrors[0].message);
    }
  })

  useEffect(() => {
    if(result.data) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('library-app-token', token)
    }
  }, [result.data]) // eslint-disable-line

  const handleLogin = (event) => {
    event.preventDefault()

    login({ variables: { username, password }})
  }

  return (
    <div>
      <h2>Login</h2>
      <p>{error}</p>
      <form onSubmit={handleLogin}>
        <p>
          <label htmlFor='username'>Username</label>
          <br />
          <input type='text' name='username' value={username} onChange={(event) => setUsername(event.target.value)} />
        </p>
        <p>
          <label htmlFor='password'>Password</label>
          <br />
          <input type='password' name='password' value={password} onChange={(event) => setPassword(event.target.value)} />
        </p>
        <p><button>Login</button></p>
      </form>
    </div>
  )
}

export default LoginForm