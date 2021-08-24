import React, { useState } from 'react'

const Button    = ({ onClick, text }) => <button onClick={onClick}>{text}</button>
const Statistic = ({ label, value })  => <p>{label}: {value}</p>

const App = () => {
  const [good, setGood]       = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad]        = useState(0)

  const incrementGood    = () => setGood(good + 1)
  const incrementNeutral = () => setNeutral(neutral + 1)
  const incrementBad     = () => setBad(bad + 1)

  const calculateTotal    = good + neutral + bad
  const calculateAverage  = calculateTotal == 0 ? '' : (good - bad) / calculateTotal
  const calculatePositive = calculateTotal == 0 ? '' : good / calculateTotal + '%'

  return (
    <>
      <h1>Feedback</h1>

      <h2>Give Feedback</h2>
      <Button onClick={incrementGood}    text='Good' />
      <Button onClick={incrementNeutral} text='Neutral' />
      <Button onClick={incrementBad}     text='Bad' />

      <h2>Statistics</h2>
      <Statistic label='Good'     value={good} />
      <Statistic label='Neutral'  value={neutral} />
      <Statistic label='Bad'      value={bad} />
      <Statistic label='Total'    value={calculateTotal} />
      <Statistic label='Average'  value={calculateAverage} />
      <Statistic label='Positive' value={calculatePositive} />
    </>
  )
}

export default App