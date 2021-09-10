import React from 'react'
import FormItem from './FormItem'

const FilterForm = ({ value, onChange }) => (
  <form>
    <FormItem Item text='Filter by name' value={value} onChange={onChange} />
  </form>
)

export default FilterForm