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

export const create = (content) => {
  return {
    type: 'UPDATE',
    data: 'asObject(content)'
  }
}

export const reset = (id) => {
  return {
    type: 'RESET',
    data: null
  }
}

export default reducer