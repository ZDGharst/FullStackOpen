import React from 'react'
import FormItem from './FormItem'

const AddPersonForm = ({ addPerson, name, handleNameChange, number, handleNumberChange}) => (
  <form onSubmit={addPerson}>
    <FormItem text='Name'   value={name}   onChange={handleNameChange} />
    <FormItem text='Number' value={number} onChange={handleNumberChange} />
    <div>
      <button type="submit">Add</button>
    </div>
  </form>
)

export default AddPersonForm