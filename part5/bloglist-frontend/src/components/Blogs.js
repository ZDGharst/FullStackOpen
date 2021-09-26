import React, { useState, useEffect } from 'react'
import Blog from './Blog'
import blogService from '../services/blogs'

const Blogs = ({ user, setUser }) => {
  const [blogs, setBlogs] = useState([])

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
      <h2>blogs</h2>
      <p>{user.name} logged in <button onClick={logOut}>logout</button></p>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />)}
    </>
    )
}

export default Blogs