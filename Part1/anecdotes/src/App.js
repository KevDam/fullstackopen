import React, { useState } from 'react';
import './App.css';

const Button = (props) => {
  return (
    <button onClick={props.handler}>
      New anecdote
    </button>

  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blod tests when diagnosing patients'
  ]

  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array.apply(null, new Array(7)).map(Number.prototype.valueOf,0))
  let pointsCopy = [...points]

  const randomAnecdote = () => setSelected(Math.floor(Math.random() * 7))
  const vote = (index) => {
    pointsCopy[index] += 1
    setPoints(pointsCopy)
  }


  let mostVoted = anecdotes[pointsCopy.indexOf(Math.max(...pointsCopy))]


  return (
    <div>
      <h1>Anecdote of the Day</h1>
      <div>
        {anecdotes[selected]}
        <br></br>
        has {pointsCopy[selected]} votes
        <br></br>
        <button onClick={() => vote(selected)}>Vote</button>
        <Button handler={randomAnecdote} />
      </div>

      <h1>Highest Voted Anecdote</h1>
      <div>
        {mostVoted}
        <br></br>
        has {Math.max(...pointsCopy)} votes
      </div>
    </div>
  )
}

export default App;
