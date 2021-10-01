import React from 'react'
import { useDispatch } from 'react-redux'
import { create } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const add = (event) => {
    event.preventDefault()
    dispatch(create(event.target.content.value))
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