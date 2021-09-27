import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
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

export default { setToken, getAll, create, like, remove }
