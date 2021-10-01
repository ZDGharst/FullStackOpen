import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { create, increment } from './reducers/anecdoteReducer'

const App = () => {
  const anecdotes = useSelector(state => state)
    .sort((a, b) => a.votes < b.votes ? 1 : -1)
  const dispatch = useDispatch()

  const add = (event) => {
    event.preventDefault()
    dispatch(create(event.target.content.value))
    event.target.content.value = ''
  }

  const vote = (id) => dispatch(increment(id))

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={add}>
        <div><input name="content" /></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default App