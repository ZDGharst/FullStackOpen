import React from 'react'

const FormItem = ({ text, value, onChange }) => <div><label>{text}</label> <input value={value} onChange={onChange} /></div>

export default FormItem