import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { updateNotification, resetNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const add = (event) => {
    event.preventDefault()
    dispatch(createAnecdote(event.target.content.value))
    dispatch(updateNotification(`You added a new anecdote: ${event.target.content.value}`))
    event.target.content.value = ''
    setTimeout(() => {
      dispatch(resetNotification())
    }, 5000)
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={add}>
        <div><input name="content" /></div>
        <button type="submit">create</button>
      </form>
    </>
  )
}

export default AnecdoteForm