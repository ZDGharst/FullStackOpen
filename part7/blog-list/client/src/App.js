import React, { useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import NavBar from './components/NavBar'
import Notification from './components/Notification'
import User from './components/User'
import Users from './components/Users'

import { initializeBlogs } from './reducers/blogReducer'
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

    dispatch(initializeBlogs())
  }, [])

  const style = {
    margin: 10
  }

  if(!user) {
    return (
      <div style={style}>
        <h1>Login</h1>
        <LoginForm />
      </div>
    )
  }

  return (
    <Router>
      <NavBar />

      <div style={style}>
        <Switch>
          <Route path="/users/:id">
            <User />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/blogs/:id">
            <Blog />
          </Route>
          <Route path="/create">
            <BlogForm />
          </Route>
          <Route path="/">
            <Blogs />
          </Route>
        </Switch>
      </div>

      <Notification />
    </Router>

  )
}

export default App