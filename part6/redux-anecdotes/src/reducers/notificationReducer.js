const reducer = (state = null, action) => {
  switch(action.type) {
    case 'NOTIFICATION/UPDATE':
      return action.data
    case 'NOTIFICATION/RESET':
      return null
    default:
      return state
  }
}

export const updateNotification = (content) => {
  return {
    type: 'NOTIFICATION/UPDATE',
    data: content
  }
}

export const resetNotification = () => {
  return {
    type: 'NOTIFICATION/RESET'
  }
}

export default reducer