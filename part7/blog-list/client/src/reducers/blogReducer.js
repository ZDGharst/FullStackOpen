import blogService from '../services/blogs'
import { updateNotification } from './notificationReducer'

const reducer = (state = [], action) => {
  const id = 5 // action.data.id ? action.data.id : null
  switch(action.type) {
  case 'BLOG/INITIALIZE':
    return action.data
  case 'BLOG/ADD':
    return state.concat(action.data)
  case 'BLOG/VOTE':
    return state.map(anecdote => anecdote.id !== id ? anecdote : action.data)
  default:
    return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    try {
      const blogs = await blogService.getAll()
      blogs.sort((a, b) => {
        return b.likes - a.likes
      })

      dispatch({
        type: 'BLOG/INITIALIZE',
        data: blogs
      })
    }
    catch(error) {
      let notif

      if(error.response) {
        notif = error.response.data.error ? error.response.data.error : error.message
      } else if (error.request) {
        notif = 'Request failed.'
      } else {
        notif = 'Unknown error.'
      }

      dispatch(updateNotification(
        notif, 'error'
      ))
    }
  }
}

export const createBlog = (blog) => {
  return async dispatch => {
    try {
      const response = await blogService.create(blog)

      dispatch({
        type: 'BLOG/ADD',
        data: response
      })

      dispatch(updateNotification(
        `Your new blog, ${response.title} by ${response.author} has been added.`, 'info'
      ))
    } catch(error) {
      let notif

      if(error.response) {
        notif = error.response.data.error ? error.response.data.error : error.message
      } else if (error.request) {
        notif = 'Request failed.'
      } else {
        notif = 'Unknown error.'
      }

      dispatch(updateNotification(
        notif, 'error'
      ))
    }
  }
}

// export const voteAnecdote = (anecdote) => {
//   return async dispatch => {
//     const updatedAnecdote = await anecdoteService.vote(anecdote)
//     dispatch({
//       type: 'ANECDOTE/VOTE',
//       data: updatedAnecdote
//     })
//   }
// }

export default reducer