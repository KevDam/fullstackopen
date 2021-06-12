import React, { useState } from 'react'
import './App.css';

const Button = ({handler, text}) => {
  return (
    <button onClick={handler}>
      {text}
    </button>
  )
}

const Statistic = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({stats}) => {
  if (stats.numFeedback === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }

  return (
    <table>
      <tbody>
        <Statistic text='Good' value={stats.good} />
        <Statistic text='Neutral' value={stats.neutral} />
        <Statistic text='Bad' value={stats.bad} />
        <Statistic text='All' value={stats.numFeedback} />
        <Statistic text='Average' value={stats.avgFeedback} />
        <Statistic text='Positive' value={stats.posPercent} />
      </tbody>
    </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const incrementGood = () => setGood(good + 1)
  const incrementNeutral = () => setNeutral(neutral + 1)
  const incrementBad = () => setBad(bad + 1)

  let allFeedback = good + neutral + bad
  let averageFeedback = (good - bad) / allFeedback
  const positivePercentage = () => {
    let percent = (good / allFeedback) * 100
    return percent.toString() + '%'
  }

  let stats = {
    'good': good,
    'neutral': neutral,
    'bad': bad,
    'numFeedback': allFeedback,
    'avgFeedback': averageFeedback,
    'posPercent': positivePercentage()
  }

  return (
    <div>
      <div><h1>Give feedback!</h1></div>
      <div>
        <Button handler={incrementGood} text='Good' />
        <Button handler={incrementNeutral} text='Neutral' />
        <Button handler={incrementBad} text='Bad' />
      </div>

      <div>
        <h1>Statistics</h1>
      </div>

      <div>
        <Statistics stats={stats} />
      </div>
    </div>
  )
}

export default App;
