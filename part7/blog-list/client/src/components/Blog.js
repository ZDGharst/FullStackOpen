import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Form, Table } from 'react-bootstrap'

import { deleteBlog, likeBlog } from '../reducers/blogReducer'
import blogService from '../services/blogs'
import { Link } from 'react-router-dom'

const Blog = () => {
  const id = useParams().id

  const blog = useSelector(state => state.blogs.find(blog => blog.id === id))
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState('')

  useEffect(() => {
    const getAllComments = async () => {
      const c = await blogService.getComments(id)
      setComments(c)
    }

    return getAllComments()
  }, [])

  if(!blog) {
    return null
  }

  const addComment = async (e) => {
    e.preventDefault()
    console.log('hi')

    const postComment = await blogService.postComment(id, { content: newComment })
    setComments(comments.concat(postComment))
    setNewComment('')
  }

  const incrementLikes = () => {
    dispatch(likeBlog({ ...blog, likes: blog.likes + 1 }))
  }

  const deleteButton = () => {
    return (<Button variant='danger' onClick={() => dispatch(deleteBlog(blog))}>Delete</Button>)
  }

  return (
    <div>
      <Table hover>
        <thead>
          <tr>
            <th colSpan='2'>{blog.title}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Link</td>
            <td><a href={blog.url}>{blog.url}</a></td>
          </tr>
          <tr>
            <td>Likes</td>
            <td>{blog.likes}</td>
          </tr>
          <tr>
            <td>Blog Author</td>
            <td>{blog.author}</td>
          </tr>
          <tr>
            <td>Posted by</td>
            <td><Link to={`/users/${blog.user.id}`}>{blog.user.username}</Link></td>
          </tr>
        </tbody>
      </Table>
      <p></p>
      <Button onClick={incrementLikes}>Like</Button> { ' ' }
      {user.username === blog.user.username ? deleteButton() : null}

      <hr />

      <h3>Comments:</h3>

      {comments.length > 0
        ? comments.map(comment => <p style={{ marginTop: 10 }} key={comment.id}>{comment.content}</p>)
        : <p>No comments yet.</p>}

      <Form onSubmit={addComment}>
        <Form.Group>
          <Form.Control
            name="comment"
            onChange={({ target }) => setNewComment(target.value)}
            as="textarea"
            value={newComment}
          />
        </Form.Group>
        <Button as='button'>Add comment</Button>
      </Form>
    </div>

  )
}

export default Blog
