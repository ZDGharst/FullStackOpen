import React, { useState } from 'react'

import PropTypes from 'prop-types'

const Blog = ({ user, blog, likeBlog, deleteBlog }) => {
  const [showDetails, setShowDetails] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const incrementLikes = () => {
    setLikes(likes + 1)
    likeBlog({ ...blog, likes: likes })
  }

  const deleteButton = () => {
    return (<button onClick={() => deleteBlog(blog)}>delete blog</button>)
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
        Likes: {likes} <button onClick={incrementLikes}>Like</button><br />
        Author: {blog.author}<br />
        User: {blog.user.username}<br />
        {user.username === blog.user.username ? deleteButton() : null}
      </div>
    )
  }

  return(
    <div style={blogStyle}>
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
