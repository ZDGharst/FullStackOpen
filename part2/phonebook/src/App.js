import React, { useState } from 'react'

const Person = ({ person }) => <tr><td>{person.name}</td><td>{person.number}</td></tr>
const FormItem = ({ text, value, onChange }) => <div><label>{text}</label> <input value={value} onChange={onChange} /></div>

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas',      number: '040-123456'    },
    { name: 'Ada Lovelace',     number: '39-44-5323523' },
    { name: 'Dan Abramov',      number: '12-43-234345'  },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])

  const [ newName, setNewName ]     = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ]       = useState('')

  const handleNameChange   = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => setFilter(event.target.value)

  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = { name: newName, number: newNumber }

    if(persons.some(p => p.name === newName)) {
      alert(`The name '${newName}' is already added to phonebook`)
      return
    }

    if(persons.some(p => p.number === newNumber)) {
      alert(`The phone number ${newNumber} is already added to phonebook`)
      return
    }

    setPersons(persons.concat(newPerson))
    setNewName('')
    setNewNumber('')
  }

  return (
    <>
      <h1>Phonebook</h1>
      <form>
        <FormItem Item text='Filter by name' value={filter} onChange={handleFilterChange} />
      </form>

      <h2>Add Entry</h2>
      <form onSubmit={addPerson}>
        <FormItem text='Name'   value={newName}   onChange={handleNameChange} />
        <FormItem text='Number' value={newNumber} onChange={handleNumberChange} />
        <div>
          <button type="submit">Add</button>
        </div>
      </form>

      <h2>Directory</h2>
      <table><thead>
        {persons.filter(person => person.name.toLowerCase().indexOf(filter.toLowerCase()) > -1).map(person => <Person key={person.name} person={person} />)}
      </thead></table>
    </>
  )
}

export default App