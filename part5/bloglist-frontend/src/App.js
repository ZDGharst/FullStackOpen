import React, { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'

const App = () => {
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

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
      <Notification notification={notification} />
      {user
        ? <Blogs user={user} setUser={setUser} setNotification={setNotification} />
        : <LoginForm setUser={setUser} setNotification={setNotification}  />}
    </>
  )
}

export default App