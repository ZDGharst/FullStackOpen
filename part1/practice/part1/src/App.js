import React from 'react'

const Hello = ({ name, age }) => {
  
  const bornYear = () => new Date().getFullYear() - age

  return (
    <div>
      <p>
        Hello {name}, you are {age} years old
      </p>
      <p>So you were probably born in {bornYear()}</p>    </div>
  )
}

const Footer = () => {
  return (
    <div>
      greeting app created by <a href="https://github.com/zdgharst">zdgharst</a>
    </div>
  )
}

const App = () => {
  const name = 'Waffles'
  const age = 8

  return (
    <>
      <h1>Greetings</h1>
      <Hello name="Ziggy" age ={4+10} />
      <Hello name={name} age={age} />
      <Footer />
    </>
  )
}

export default App