import React, { useState } from 'react'

const Blog = ({ blog, likeBlog }) => {
  const [showDetails, setShowDetails] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const incrementLikes = () => {
    setLikes(likes + 1)
    likeBlog({...blog, likes: likes})
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
        Author: {blog.author}
      </div>
    )
  }

  return(
    <div style={blogStyle}>
      {blog.title} <button onClick={() => setShowDetails(true)}>View</button>
    </div>  
  )
}

export default Blog