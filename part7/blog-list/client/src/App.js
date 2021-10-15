import React, { useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import NavBar from './components/NavBar'
import Notification from './components/Notification'
import User from './components/User'
import Users from './components/Users'
import { restore } from './reducers/userReducer'

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

  if(!user) {
    return (
      <>
        <h1>Blogs</h1>
        <LoginForm />
      </>
    )
  }

  return (
    <Router>
      <h1>Blogs</h1>
      <Notification />
      <NavBar />

      <Switch>
        <Route path="/users/:id">
          <User />
        </Route>
        <Route path="/users">
          <Users />
        </Route>
        <Route path="/">
          <Blogs />
        </Route>
      </Switch>


    </Router>
  )
}

export default App