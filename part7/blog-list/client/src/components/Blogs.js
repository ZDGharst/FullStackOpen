import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Blog from './Blog'
import BlogForm from './BlogForm'
import Togglable from './Togglable'
import { initializeBlogs } from '../reducers/blogReducer'

const Blogs = () => {
  const blogs = useSelector(state => state.blogs)
  const blogFormRef = useRef()

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])


  return (
    <>
      <Togglable buttonLabel='Add new blog' ref={blogFormRef}>
        <BlogForm blogFormRef={blogFormRef} />
      </Togglable>
      {blogs.map(blog =>
        <Blog key={blog.id} id={blog.id} />)}
    </>
  )
}

export default Blogs