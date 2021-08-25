import React, { useState } from 'react'

const Button    = ({ onClick, text }) => <button onClick={onClick}>{text}</button>
const Statistic = ({ label, value })  => <tr><td>{label}</td><td>{value}</td></tr>

const Statistics = ({ good, neutral, bad }) => {
  const calculateTotal    = good + neutral + bad
  if(calculateTotal === 0)
  {
    return (
      <>
        <h2>Statistics</h2>
        <p>No feedback given.</p>
      </>
    )
  }
  const calculateAverage  = (good - bad) / calculateTotal
  const calculatePositive = good / calculateTotal + '%'

  return (
    <>
      <h2>Statistics</h2>
      <table>
        <tbody>
          <Statistic label='Good'     value={good} />
          <Statistic label='Neutral'  value={neutral} />
          <Statistic label='Bad'      value={bad} />
          <Statistic label='Total'    value={calculateTotal} />
          <Statistic label='Average'  value={calculateAverage} />
          <Statistic label='Positive' value={calculatePositive} />
        </tbody>
      </table>
    </>
  )
}

const App = () => {
  const [good, setGood]       = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad]         = useState(0)

  const incrementGood    = () => setGood(good + 1)
  const incrementNeutral = () => setNeutral(neutral + 1)
  const incrementBad     = () => setBad(bad + 1)


  return (
    <>
      <h1>Feedback</h1>

      <h2>Give Feedback</h2>
      <Button onClick={incrementGood}    text='Good' />
      <Button onClick={incrementNeutral} text='Neutral' />
      <Button onClick={incrementBad}     text='Bad' />

      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  )
}

export default App