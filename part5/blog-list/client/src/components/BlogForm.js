import React, { useState } from 'react'

import PropTypes from 'prop-types'

const BlogForm = ({ addBlog }) => {
  const [title, setTitle]   = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl]       = useState('')

  const handleCreate = async (event) => {
    event.preventDefault()

    addBlog({ title, author, url, })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <form onSubmit={handleCreate} >
      <h2>Create a new blog</h2>
      <div>
        title:
        <input type="text" value={title} id="title" name="Title" onChange={({ target }) => setTitle(target.value)} />
      </div>
      <div>
        author:
        <input type="text" value={author} id="author" name="Author" onChange={({ target }) => setAuthor(target.value)} />
      </div>
      <div>
        url:
        <input type="text" value={url} id="url" name="Url" onChange={({ target }) => setUrl(target.value)} />
      </div>
      <button type="submit">create</button>
    </form>
  )
}

BlogForm.propTypes = {
  addBlog: PropTypes.func.isRequired
}

export default BlogForm