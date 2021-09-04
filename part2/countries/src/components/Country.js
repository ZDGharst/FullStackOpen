import React, { useState } from 'react'
import CountryDetails from './CountryDetails'

const CountryButton = ({ onClick, details }) => <button onClick={onClick}>{details ? 'hide' : 'show'}</button>

const Country = ({ country }) => {
  const [details, setDetails] = useState(false)
  const toggleDetails = () => setDetails(!details)

  return (
    <>
      <p>{country.name} <CountryButton onClick={toggleDetails} details={details} /></p>
      {details ? <CountryDetails country={country} /> : null}
    </>
  )
}

export default Country