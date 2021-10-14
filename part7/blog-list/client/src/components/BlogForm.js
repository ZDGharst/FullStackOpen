import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'

import { createBlog } from '../reducers/blogReducer'

const BlogForm = ({ blogFormRef }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const dispatch = useDispatch()

  const handleCreate = async (event) => {
    event.preventDefault()

    dispatch(createBlog({
      title,
      author,
      url,
      likes: 0
    }))

    /* TODO: Don't activate if create blog wasn't successful. */
    setTitle('')
    setAuthor('')
    setUrl('')

    blogFormRef.current.toggleVisibility()
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
  blogFormRef: PropTypes.func.isRequired
}

export default BlogForm