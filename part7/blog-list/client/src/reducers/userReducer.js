import blogService from '../services/blogs'
import loginService from '../services/login'
import { resetNotification, updateNotification } from './notificationReducer'

const reducer = (state = null, action) => {
  switch(action.type) {
  case 'USER/LOGIN':
    return action.data
  case 'USER/LOGOUT':
    return null
  default:
    return state
  }
}

export const restore = (user) => {
  return async dispatch => {
    blogService.setToken(user.token)

    dispatch({
      type: 'USER/LOGIN',
      data: user
    })
  }
}

export const login = (username, password) => {
  return async dispatch => {
    try {
      const user = await loginService.login({
        username, password
      })

      blogService.setToken(user.token)

      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
      dispatch(resetNotification())

      dispatch({
        type: 'USER/LOGIN',
        data: user
      })
    } catch (exception) {
      dispatch(updateNotification('Invalid username or password.', 'error', 10))
    }
  }
}

export const logout = () => {
  window.localStorage.clear()

  return async dispatch => {
    dispatch({
      type: 'USER/LOGOUT'
    })
  }
}

export default reducer