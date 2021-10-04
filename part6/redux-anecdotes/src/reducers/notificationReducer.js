const reducer = (state = null, action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch(action.type) {
    case 'UPDATE':
      return action.data
    case 'RESET':
      return null
    default:
      return state
  }
}

export const updateNotification = (content) => {
  return {
    type: 'UPDATE',
    data: content
  }
}

export const resetNotification = () => {
  return {
    type: 'RESET'
  }
}

export default reducer