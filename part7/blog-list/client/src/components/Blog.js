import React from 'react'
import { useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'

import { deleteBlog, likeBlog } from '../reducers/blogReducer'

const Blog = () => {
  const id = useParams().id
  const blog = useSelector(state => state.blogs.find(blog => blog.id === id))
  const user = useSelector(state => state.user)

  if(!blog) {
    return null
  }

  const dispatch = useDispatch()

  const incrementLikes = () => {
    dispatch(likeBlog({ ...blog, likes: blog.likes + 1 }))
  }

  const deleteButton = () => {
    return (<button onClick={() => dispatch(deleteBlog(blog))}>delete blog</button>)
  }

  const blogStyle = {
    border: 'solid',
    borderWidth: 1,
    margin: 5,
    padding: 5,
    width: 500
  }

  return (
    <div style={blogStyle}>
      {blog.title}<br />
      URL: {blog.url}<br />
      Likes: {blog.likes} <button onClick={incrementLikes}>Like</button><br />
      Author: {blog.author}<br />
      User: {blog.user.username}<br />
      {user.username === blog.user.username ? deleteButton() : null}
    </div>
  )
}

export default Blog
