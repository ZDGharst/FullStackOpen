import React, { useState, useEffect, useRef } from 'react'

import Blog from './Blog'
import BlogForm from './BlogForm'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'
import Togglable from './Togglable'

const Blogs = ({ user, setUser, setNotification }) => {
  const [blogs, setBlogs] = useState([])
  const blogFormRef = useRef()

  blogService.setToken(user.token)

  const addBlog = async (input) => {
    try {
      const newBlog = {
        title: input.title,
        author: input.author,
        url: input.url,
        likes: 0
      }

      const response = await blogService.create(newBlog)
      setBlogs(blogs.concat(response))
      blogFormRef.current.toggleVisibility()

      setNotification({ message: `Your new blog, ${response.title} by ${response.author} has been added.`, type: 'info' })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    } catch(error) {
      setNotification({ message: error.response.data.error, type: 'error' })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
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

      setNotification({ message: `Liked the blog, ${response.title} by ${response.author}.`, type: 'info' })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    } catch(error) {
      setNotification({ message: error.response.data.error, type: 'error' })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const deleteBlog = async (input) => {
    try {
      const result = window.confirm(`Are you sure you'd like to remove the blog ${input.title}? This can't be undone.`)
      if(!result) {
        return null
      }

      await blogService.remove(input.id)
      setBlogs(blogs.filter(blog => blog.id !== input.id))

      setNotification({ message: `Deleted the blog, ${input.title} by ${input.author}.`, type: 'info' })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    } catch(error) {
      console.log(error)
      setNotification({ message: error.response.data.error, type: 'error' })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const logOut = () => {
    window.localStorage.clear()
    setUser(null)
  }

  useEffect(() => {
    const getBlogs = async () => {
      const blogs = await blogService.getAll()
      blogs.sort((a, b) => {
        return a.likes < b.likes
      })
      setBlogs(blogs)
    }

    return getBlogs()
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