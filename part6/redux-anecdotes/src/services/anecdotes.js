import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (content) => {
  const newObject = { content, votes: 0 }
  const response = await axios.post(baseUrl, newObject)
  return response.data
}

const vote = async (id) => {
  const resource = `${baseUrl}/${id}`
  const anecdote = await axios.get(resource)
  const voteForAnecdote = { ...anecdote.data, votes: anecdote.data.votes + 1 }
  return await axios.put(resource, voteForAnecdote)
}

const exports = { getAll, create, vote }

export default exports