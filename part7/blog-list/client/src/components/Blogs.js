import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Blog from './Blog'
import BlogForm from './BlogForm'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'
import Togglable from './Togglable'
import { updateNotification } from '../reducers/notificationReducer'
import { createBlog, initializeBlogs } from '../reducers/blogReducer'

const Blogs = ({ user, setUser }) => {
  const blogs = useSelector(state => state.blogs)
  const blogFormRef = useRef()
  const dispatch = useDispatch()

  blogService.setToken(user.token)

  const addBlog = async (input) => {
    const newBlog = {
      title: input.title,
      author: input.author,
      url: input.url,
      likes: 0
    }

    dispatch(createBlog(newBlog))
    blogFormRef.current.toggleVisibility()
  }

  const likeBlog = async (input) => {
    try {
      const newBlog = {
        title: input.title,
        author: input.author,
        url: input.url,
        likes: input.likes + 1,
        id: input.id
      }

      const response = await blogService.like(newBlog)

      dispatch(updateNotification(`Liked the blog, ${response.title} by ${response.author}.`, 'info'))
    } catch(error) {
      dispatch(updateNotification(error.response.data.error, 'error'))
    }
  }

  const deleteBlog = async (input) => {
    try {
      const result = window.confirm(`Are you sure you'd like to remove the blog ${input.title}? This can't be undone.`)
      if(!result) {
        return null
      }

      await blogService.remove(input.id)
      // setBlogs(blogs.filter(blog => blog.id !== input.id))

      dispatch(updateNotification(`Deleted the blog, ${input.title} by ${input.author}.`, 'info'))
    } catch(error) {
      dispatch(updateNotification(error.response.data.error, 'error'))
    }
  }

  const logOut = () => {
    window.localStorage.clear()
    setUser(null)
  }

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])


  return (
    <>
      <p>User {user.name} is logged in <button onClick={logOut}>logout</button></p>
      <Togglable buttonLabel='Add new blog' ref={blogFormRef}>
        <BlogForm addBlog={addBlog} />
      </Togglable>
      {blogs.map(blog =>
        <Blog key={blog.id} user={user} blog={blog} likeBlog={likeBlog} deleteBlog={deleteBlog} />)}
    </>
  )
}

Blogs.propTypes = {
  user: PropTypes.object.isRequired,
  setUser: PropTypes.func.isRequired
}

export default Blogs