import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import BlogForm from './BlogForm'
import Togglable from './Togglable'

const Blogs = () => {
  const blogs = useSelector(state => state.blogs)
  const blogFormRef = useRef()



  return (
    <>
      <Togglable buttonLabel='Add new blog' ref={blogFormRef}>
        <BlogForm blogFormRef={blogFormRef} />
      </Togglable>
      {blogs.map(blog =>
        <p key={blog.id}><Link to={`blogs/${blog.id}`}>{blog.title}</Link></p>
      )}
    </>
  )
}

export default Blogs