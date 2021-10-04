const reducer = (state = '', action) => {
  switch(action.type) {
    case 'FILTER/UPDATE':
      return action.filter
    default:
      return state
  }
}

export const updateFilter = (filter) => {
  return  {
    type: 'FILTER/UPDATE',
    filter
  }
}

export default reducer
