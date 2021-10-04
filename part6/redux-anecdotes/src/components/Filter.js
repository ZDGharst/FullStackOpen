import React from 'react'
import { useDispatch } from 'react-redux'
import { updateFilter } from '../reducers/filterReducer'

const Filter = () => {
  const dispatch = useDispatch()
  
  const style = {
    margin: 10
  }

  const handleChange = (event) => {
    dispatch(updateFilter(event.target.value))
  }

  return (
    <>
      <label for='filter'>Filter</label>
      <input id='filter' name='filter' style={style} onChange={handleChange} />
    </>
  )
}

export default Filter