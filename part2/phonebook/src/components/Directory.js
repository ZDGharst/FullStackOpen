import React from 'react'
import Person from './Person'

const Directory = ({ persons, filter }) => (
  <table>
    <thead>
      {
        persons
          .filter(person => person.name.toLowerCase().indexOf(filter.toLowerCase()) > -1)
          .map(person => <Person key={person.name} person={person} />)
      }
    </thead>
  </table>
)

export default Directory