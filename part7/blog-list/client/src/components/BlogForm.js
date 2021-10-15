import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Form, Button } from 'react-bootstrap'

import { createBlog } from '../reducers/blogReducer'

const BlogForm = () => {
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
  }

  return (
    <Form onSubmit={handleCreate}>
      <h2>Post a new blog</h2>
      <Form.Group>
        <Form.Label>Title: </Form.Label>
        <Form.Control
          name="title"
          onChange={({ target }) => setTitle(target.value)}
          type="text"
          value={title}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Author: </Form.Label>
        <Form.Control
          name="title"
          onChange={({ target }) => setAuthor(target.value)}
          type="text"
          value={author}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>URL: </Form.Label>
        <Form.Control
          name="title"
          onChange={({ target }) => setUrl(target.value)}
          type="text"
          value={url}
        />
      </Form.Group>
      <Button id="create-button" type="submit">Create</Button>
    </Form>
  )
}

export default BlogForm