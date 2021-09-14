import React, { useEffect, useState } from 'react'

import AddPersonForm from './components/AddPersonForm'
import Directory from './components/Directory'
import FilterForm from './components/FilterForm'
import Notification from './components/Notification'
import personService from './services/person'

const App = () => {
  const [ persons, setPersons ]           = useState([])
  const [ newName, setNewName ]           = useState('')
  const [ newNumber, setNewNumber ]       = useState('')
  const [ filter, setFilter ]             = useState('')
  const [ notification, setNotification ] = useState(null)
  const [ notifType, setNotifType ]       = useState(null)

  const handleNameChange   = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => setFilter(event.target.value)

  const handleNotificationChange = (message, type) => {
    let timer = 5000
    if(type === 'critical') {
      timer = 30000
    }
    setNotification(message)
    setNotifType(type)
  
    setTimeout(() => {
      setNotification(null)
    }, timer)
  }

  const fetchPersons = () => personService.getAll().then(personResponse => {
    setPersons(personResponse)
  }).catch(error => {
    handleNotificationChange(`Couldn't connect to backend service. Please try again later.`, 'critical')
  })
  useEffect(fetchPersons, [])

  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = { name: newName, number: newNumber }

    const lookupPerson = persons.find(p => p.name === newName)

    if(lookupPerson) {
      if(window.confirm(`The name '${newName}' is already added to phonebook. Would you like to replace the old number with the new one?`)) {
        personService.update(lookupPerson.id, newPerson).then(returnedPerson => {
          setPersons(persons.map(person => person.id !== lookupPerson.id ? person : returnedPerson))
          handleNotificationChange(`Updated '${newName}' in the phonebook.`, 'success')
        }).catch(error => {
          handleNotificationChange(`Couldn't update '${newName}'. ${error.response.data.error}`, 'error')
        })
      }
      handleNotificationChange(`Didn't update '${newName}' in the phonebook.'`, 'error')
      return
    }

    if(persons.some(p => p.number === newNumber)) {
      handleNotificationChange(`The phone number ${newNumber} is already added to phonebook`, 'error')
      return
    }

    personService.create(newPerson).then(returnedPerson => {
      setPersons(persons.concat(returnedPerson))
      setNewName('')
      setNewNumber('')
      handleNotificationChange(`Added '${newName}' to the phonebook.'`, 'success')
    }).catch(error => {
      handleNotificationChange(`Couldn't add '${newName}'. ${error.response.data.error}`, 'error')
      console.log(error.response.data.error)
    })
  }

  const removePerson = (id) => {
    const lookupPerson = persons.find(p => p.id === id)

    return () => {
      personService.remove(id).then(response => {
        setPersons(persons.filter(person => person.id !== id))
        handleNotificationChange(`Removed '${lookupPerson.name}' from the phonebook.'`, 'success')
      }).catch(error => {
        if(error.response) {
          handleNotificationChange(`${lookupPerson.name} doesn't exist or was already removed from the phonebook.`, 'error')
        } else if(error.request) {
          handleNotificationChange(`Couldn't find the backend service. Please try again later.`, 'critical')
        }
      })
    }
  }


  return (
    <>
      <h1>Phonebook</h1>
      <Notification message={notification} type={notifType} />
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
      <Directory persons={persons} filter={filter} remove={removePerson} />
    </>
  )
}

export default App