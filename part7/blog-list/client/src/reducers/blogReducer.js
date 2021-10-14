import blogService from '../services/blogs'
import { updateNotification } from './notificationReducer'

const reducer = (state = [], action) => {

  switch(action.type) {
  case 'BLOG/INITIALIZE':
    return action.data
  case 'BLOG/ADD':
    return state.concat(action.data)
  case 'BLOG/LIKE': {
    const id = action.data.id
    return state.map(blog => blog.id !== id ? blog : { ...blog, likes: blog.likes + 1 })
  }
  case 'BLOG/DELETE': {
    const id = action.data
    return state.filter(blog => blog.id !== id ? blog : null )
  }
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

export const likeBlog = (blog) => {
  return async dispatch => {
    try {
      const updatedBlog = await blogService.like(blog)

      dispatch({
        type: 'BLOG/LIKE',
        data: updatedBlog
      })

      dispatch(updateNotification(
        `You have liked ${updatedBlog.title}.`, 'info'
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

export const deleteBlog = (blog) => {
  return async dispatch => {
    try {
      await blogService.remove(blog.id)

      dispatch({
        type: 'BLOG/DELETE',
        data: blog.id
      })

      dispatch(updateNotification(
        `You have deleted ${blog.title}.`, 'info'
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

export default reducer