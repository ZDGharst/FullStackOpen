import React from 'react'
import { connect } from 'react-redux'

import { createAnecdote } from '../reducers/anecdoteReducer'
import { updateNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
  const add = async (event) => {
    event.preventDefault()

    props.createAnecdote(event.target.content.value)
    props.updateNotification(`You added a new anecdote: ${event.target.content.value}`, 5)
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

const mapDispatchToProps = {
  createAnecdote,
  updateNotification
}

const ConnectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm)

export default ConnectedAnecdoteForm
