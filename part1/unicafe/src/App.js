import React, { useState } from 'react'

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>
const Feedback = ({ type, tally }) => <p>{type}: {tally}</p>

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const incrementGood = () => setGood(good + 1)
  const incrementNeutral = () => setNeutral(neutral + 1)
  const incrementBad = () => setBad(bad + 1)

  return (
    <>
      <h1>Feedback</h1>

      <h2>Give Feedback</h2>
      <Button onClick={incrementGood} text='Good' />
      <Button onClick={incrementNeutral} text='Neutral' />
      <Button onClick={incrementBad} text='Bad' />

      <h2>Statistics</h2>
      <Feedback type='Good' tally={good} />
      <Feedback type='Neutral' tally={neutral} />
      <Feedback type='Bad' tally={bad} />
    </>
  )
}

export default App