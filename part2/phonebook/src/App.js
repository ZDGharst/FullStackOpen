import React, { useState } from 'react'
import FilterForm from './components/FilterForm'
import AddPersonForm from './components/AddPersonForm'
import Directory from './components/Directory'

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
      <FilterForm value={filter} onChange={handleFilterChange} />

      <h2>Add Entry</h2>
      <AddPersonForm
        addPerson={addPerson}
        name={newName}
        handleNameChange={handleNameChange}
        number={newNumber}
        handleNumberChange={handleNumberChange}
      />
      
      <h2>Directory</h2>
      <Directory persons={persons} filter={filter} />
    </>
  )
}

export default App