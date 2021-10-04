import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { updateNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    return anecdotes
      .filter(
        anecdote => anecdote.content.toLowerCase().indexOf(filter.toLowerCase()) > -1
      )
      .sort((a, b) => a.votes < b.votes ? 1 : -1)
  })

  const dispatch = useDispatch()
  const vote = (anecdote) => { 
    dispatch(voteAnecdote(anecdote.id))
    dispatch(updateNotification(`You voted for the anecdote: ${anecdote.content}`, 3))
  }

  return (
    <>
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