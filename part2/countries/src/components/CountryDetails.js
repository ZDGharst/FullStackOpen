import React from 'react'

const CountryDetails = ({ country }) => (
  <>
    <h2>{country.name}</h2>
    <p>Capital: {country.capital}</p>
    <p>Population: {country.population}</p>
    <h3>Languages</h3>
    <ul>
      {country.languages.map(language => <li>{language.name}</li>)}
    </ul>
    <img src={country.flag} width='250px' />
  </>
)

export default CountryDetails