import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'

import { deleteBlog, likeBlog } from '../reducers/blogReducer'
import blogService from '../services/blogs'

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

    const postComment = await blogService.postComment(id, { content: newComment })
    setComments(comments.concat(postComment))
  }

  const incrementLikes = () => {
    dispatch(likeBlog({ ...blog, likes: blog.likes + 1 }))
  }

  const deleteButton = () => {
    return (<button onClick={() => dispatch(deleteBlog(blog))}>delete blog</button>)
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <p>URL: {blog.url}</p>
      <p>Likes: {blog.likes} <button onClick={incrementLikes}>Like</button></p>
      <p>Author: {blog.author}</p>
      <p>User: {blog.user.username}</p>
      {user.username === blog.user.username ? deleteButton() : null}

      <h3>Comments</h3>
      <form onSubmit={addComment}>
        <input value={newComment} onChange={(e) => setNewComment(e.target.value)} />
        <button>Add comment</button>
      </form>

      {comments.length > 0
        ? <ul>{comments.map(comment => <li key={comment.id}>{comment.content}</li>)}</ul>
        : <p>No comments yet.</p>}
    </div>

  )
}

export default Blog
