import React from 'react'
import { connect } from 'react-redux'
import { updateFilter } from '../reducers/filterReducer'

const Filter = (props) => {
  const style = {
    margin: 10
  }

  const handleChange = (event) => {
    props.updateFilter(event.target.value)
  }

  return (
    <>
      <label htmlFor='filter'>Filter</label>
      <input id='filter' name='filter' style={style} onChange={handleChange} />
    </>
  )
}

const mapDispatchToProps = {
  updateFilter
}

const ConnectedFilter = connect(null, mapDispatchToProps)(Filter)

export default ConnectedFilter
