import React from 'react'

const Person = ({ person, removePerson }) => <tr><td>{person.name}</td><td>{person.number}</td><td><button onClick={removePerson}>Delete</button></td></tr>

export default Person