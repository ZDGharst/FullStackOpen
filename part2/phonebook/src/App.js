import React, { useEffect, useState } from 'react'
import FilterForm from './components/FilterForm'
import AddPersonForm from './components/AddPersonForm'
import Directory from './components/Directory'
import personService from './services/person'

const App = () => {
  const [ persons, setPersons ]       = useState([])
  const [ newName, setNewName ]     = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ]       = useState('')

  const fetchPersons = () => personService.getAll().then(personResponse => {
    setPersons(personResponse)
  })
  useEffect(fetchPersons, [])

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

    personService.create(newPerson).then(returnedPerson => {
      setPersons(persons.concat(newPerson))
      setNewName('')
      setNewNumber('')
    })
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