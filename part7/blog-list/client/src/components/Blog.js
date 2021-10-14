import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { deleteBlog, likeBlog } from '../reducers/blogReducer'

const Blog = ({ id }) => {
  const blog = useSelector(state => state.blogs.find(blog => blog.id === id))
  const user = useSelector(state => state.user)
  const [showDetails, setShowDetails] = useState(false)
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

  if(showDetails) {
    return (
      <div style={blogStyle}>
        {blog.title} <button onClick={() => setShowDetails(false)}>Hide</button><br />
        URL: {blog.url}<br />
        Likes: {blog.likes} <button onClick={incrementLikes}>Like</button><br />
        Author: {blog.author}<br />
        User: {blog.user.username}<br />
        {user.username === blog.user.username ? deleteButton() : null}
      </div>
    )
  }

  return(
    <div className='blog' style={blogStyle}>
      {blog.title} <button onClick={() => setShowDetails(true)}>View</button>
    </div>
  )
}

export default Blog
