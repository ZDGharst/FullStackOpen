import React from 'react'
import Country from './Country'
import CountryDetails from './CountryDetails'

const CountryList = ({ countries, filter }) => {
  if(countries.length === 0 || filter === '') {
    return null;
  }

  const filteredCountries = countries.filter(country => country.name.toLowerCase().indexOf(filter.toLowerCase()) > -1)

  if(filteredCountries.length === 0) {
    return <p>Zero matches, specify another filter</p>
  }

  if(filteredCountries.length > 10) {
    return <p>Too many matches, specify another filter</p>
  }

  if(filteredCountries.length === 1) {
    return <CountryDetails country={filteredCountries[0]} />
  }

  return (
    <>
      {filteredCountries.map(country => <Country country={country} />)}
    </>
  )
}

export default CountryList