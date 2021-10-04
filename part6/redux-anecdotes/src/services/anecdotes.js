import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (content) => {
  const newAnecdote = {
    content,
    votes: 0
  }
  
  const response = await axios.post(baseUrl, newAnecdote)
  return response.data
}

const vote = async (id) => {
  const url = `${baseUrl}/${id}`
  const anecdote = await axios.get(url)

  const voteForAnecdote = {
    ...anecdote.data,
    votes: anecdote.data.votes + 1
  }

  const response = await axios.put(url, voteForAnecdote)
  return response.data
}

const exports = { getAll, create, vote }

export default exports