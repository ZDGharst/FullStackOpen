import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { increment } from '../reducers/anecdoteReducer'
import { updateNotification, resetNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
    .sort((a, b) => a.votes < b.votes ? 1 : -1)
  const dispatch = useDispatch()
  const vote = (anecdote) => { 
    dispatch(increment(anecdote.id))
    dispatch(updateNotification(`You voted for the anecdote: ${anecdote.content}`))
    setTimeout(() => {
      dispatch(resetNotification())
    }, 5000)
  }

  return (
    <>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </>
  )
}

export default AnecdoteList