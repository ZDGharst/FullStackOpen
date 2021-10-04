const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}


const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch(action.type) {
    case 'ANECDOTE/INITIALIZE':
      return action.data
    case 'ANECDOTE/ADD':
      return state.concat(action.data)
    case 'ANECDOTE/VOTE':
      const id = action.data.id
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
  return {
    type: 'ANECDOTE/INITIALIZE',
    data: anecdotes
  }
}

export const createAnecdote = (content) => {
  return {
    type: 'ANECDOTE/ADD',
    data: asObject(content)
  }
}

export const voteAnecdote = (id) => {
  return {
    type: 'ANECDOTE/VOTE',
    data: { id }
  }
}

export default reducer