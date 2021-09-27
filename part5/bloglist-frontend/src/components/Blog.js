import React, { useState } from 'react'

const Blog = ({ blog }) => {
  const [showDetails, setShowDetails] = useState(false)
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
        Likes: {blog.likes} <button>Like</button><br />
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