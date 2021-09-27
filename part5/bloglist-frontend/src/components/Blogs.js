import React, { useState, useEffect, useRef } from 'react'
import Blog from './Blog'
import BlogForm from './BlogForm'
import blogService from '../services/blogs'
import Togglable from './Togglable'

const Blogs = ({ user, setUser, setNotification }) => {
  const [blogs, setBlogs] = useState([])
  const blogFormRef = useRef()

  const addBlog = async (input) => {
    blogService.setToken(user.token)

    try {
      const newBlog = {
        title: input.title,
        author: input.author,
        url: input.url,
        user: user.id,
        likes: 0
      }

      const response = await blogService.create(newBlog)
      setBlogs(blogs.concat(response))
      blogFormRef.current.toggleVisibility()
      
      setNotification({message: `Your new blog, ${response.title} by ${response.author} has been added.`, type: 'info' })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    } catch(error) {
      setNotification({message: error.response.data.error, type: 'error' })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const likeBlog = async (input) => {
    blogService.setToken(user.token)

    try {
      const newBlog = {
        title: input.title,
        author: input.author,
        url: input.url,
        user: input.user,
        likes: input.likes + 1,
        id: input.id
      }

      const response = await blogService.like(newBlog)
      
      setNotification({message: `Liked the blog, ${response.title} by ${response.author}.`, type: 'info' })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    } catch(error) {
      setNotification({message: error.response.data.error, type: 'error' })
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
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  return (
    <>
      <p>User {user.name} is logged in <button onClick={logOut}>logout</button></p>
      <Togglable buttonLabel='Add new blog' ref={blogFormRef}>
        <BlogForm addBlog={addBlog} />
      </Togglable>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} likeBlog={likeBlog} />)}
    </>
  )
}

export default Blogs