import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Blogs from './components/Blogs'
import { restore } from './reducers/userReducer'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(restore(user))
    }
  }, [])

  return (
    <>
      <h1>Blogs</h1>
      <Notification />
      {user
        ? <Blogs />
        : <LoginForm />}
    </>
  )
}

export default App