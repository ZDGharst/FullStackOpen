import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import PropTypes from 'prop-types'

import { deleteBlog, likeBlog } from '../reducers/blogReducer'

const Blog = ({ user, blog }) => {
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
    <div className='blog'  style={blogStyle}>
      {blog.title} <button onClick={() => setShowDetails(true)}>View</button>
    </div>
  )
}

Blog.propTypes = {
  user: PropTypes.object.isRequired,
  blog: PropTypes.object.isRequired,
  likeBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired
}

export default Blog
