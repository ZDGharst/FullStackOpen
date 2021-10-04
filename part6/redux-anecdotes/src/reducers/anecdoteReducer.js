import anecdoteService from '../services/anecdotes'

const reducer = (state = [], action) => {
  switch(action.type) {
    case 'ANECDOTE/INITIALIZE':
      return action.data
    case 'ANECDOTE/ADD':
      return state.concat(action.data)
    case 'ANECDOTE/VOTE':
      const id = action.data
      const anecdoteToVote = state.find(n => n.id === id)
      const votedAnecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1
      }
      return state.map(anecdote => anecdote.id !== id ? anecdote : votedAnecdote)
    default:
      return state
  }
}

export const initializeAnecdotes = (anecdotes) => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'ANECDOTE/INITIALIZE',
      data: anecdotes
    })
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.create(content)
    dispatch({
      type: 'ANECDOTE/ADD',
      data: newAnecdote
    })
  }
}

export const voteAnecdote = (id) => {
  return {
    type: 'ANECDOTE/VOTE',
    data: id
  }
}

export default reducer