import React from 'react'
import { useDispatch } from 'react-redux'

import anecdoteService from '../services/anecdotes'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { updateNotification, resetNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const add = async (event) => {
    event.preventDefault()

    const newAnecdote = await anecdoteService.create(event.target.content.value)
    dispatch(createAnecdote(newAnecdote))

    dispatch(updateNotification(`You added a new anecdote: ${newAnecdote.content}`))
    setTimeout(() => {
      dispatch(resetNotification())
    }, 5000)
    
    event.target.content.value = ''
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