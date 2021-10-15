import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const getComments = async (id) => {
  const request = await axios.get(`${baseUrl}/${id}/comments`)
  return request.data
}

const create = async (newObject) => {
  const request = await axios.post(baseUrl, newObject, {
    headers: { Authorization: token }
  })
  return request.data
}

const like = async (newObject) => {
  const request = await axios.put(`${baseUrl}/${newObject.id}`, newObject, {
    headers: { Authorization: token }
  })

  return request.data
}

const remove = async (id) => {
  const request = await axios.delete(`${baseUrl}/${id}`, {
    headers: { Authorization: token }
  })

  return request.data
}

const exports = { setToken, getAll, getComments, create, like, remove }

export default exports
