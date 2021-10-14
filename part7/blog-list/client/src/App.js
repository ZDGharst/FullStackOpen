import React, { useState, useEffect } from 'react'

import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'

const App = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  return (
    <>
      <h1>Blogs</h1>
      <Notification />
      {user
        ? <Blogs user={user} setUser={setUser} />
        : <LoginForm setUser={setUser} />}
    </>
  )
}

export default App