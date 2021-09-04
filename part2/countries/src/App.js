import React, { useState, useEffect } from 'react'
import axios from 'axios'

import CountryList from './components/CountryList'
import FormElement from './components/FormElement'


const App = () => {
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])

  const handleFilterChange = (e) => {
    setFilter(e.target.value)
  }

  const countryRetrieval = () => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }
  
  useEffect(countryRetrieval, [])

  return (
    <>
      <h1>Country Directory</h1>
      <FormElement label='Find countries: ' value={filter} onChange={handleFilterChange} />
      <CountryList countries={countries} filter={filter} />
    </>
  )
}

export default App;
