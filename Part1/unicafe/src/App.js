import React, { useState } from 'react'
import './App.css';

const Button = ({handler, text}) => {
  return (
    <button onClick={handler}>
      {text}
    </button>
  )
}

const Statistics = ({text, count}) => {
  return (
    <div>
      {text}: {count}
    </div>
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

  const allFeedback = () => good + neutral + bad
  const averageFeedback = () => {
    return ((good - bad) / allFeedback())
  }
  const positivePercentage = () => {
    let percent = (good / allFeedback()) * 100
    return percent.toString() + '%'
  }

  if (allFeedback() === 0) {
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
        No feedback given.
      </div>
      </div>
    )
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
        <Statistics text='Good' count={good} />
        <Statistics text='Neutral' count={neutral} />
        <Statistics text='Bad' count={bad} />
        <Statistics text='All' count={allFeedback()} />
        <Statistics text='Average' count={averageFeedback()} />
        <Statistics text='Positive' count={positivePercentage()} />
      </div>
    </div>
  )
}

export default App;
