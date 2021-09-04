import React from 'react'

const FormElement = ({ label, value, onChange }) => <div><label>{label}</label> <input type="text" value={value} onChange={onChange} /></div>

export default FormElement