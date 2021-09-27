import React, { useState, useEffect } from 'react'
import Blog from './Blog'
import BlogForm from './BlogForm'
import blogService from '../services/blogs'

const Blogs = ({ user, setUser }) => {
  const [blogs, setBlogs] = useState([])

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
    } catch {
      console.log('Unauthorized access.')
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
      <h1>Blogs</h1>
      <p>User {user.name} is logged in <button onClick={logOut}>logout</button></p>
      <BlogForm addBlog={addBlog} />
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />)}
    </>
  )
}

export default Blogs