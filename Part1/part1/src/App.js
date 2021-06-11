import logo from './logo.svg';
import './App.css';

import React, {useState} from 'react'

const Display = ({counter}) => <div>{counter}</div>


const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

const App = () => {
  let [ counter, setCounter ] = useState(0)

  const increaseByOne = () => setCounter(counter + 1)

  const setToZero = () => setCounter(0)

  const decreaseByOne = () => setCounter(counter - 1)

  return (
    <div>
      <Display counter={counter}/>
      <Button handleClick={increaseByOne} text="Increment" />
      <Button handleClick={decreaseByOne} text="Decrement" />
      <Button handleClick={setToZero} text="Reset" />
    </div>
  )
}

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// const Hello = ({name, age}) => {
//   const bornYear = () => new Date().getFullYear() - age


//   return (
//     <div>
//       <p>Hello {name}, you are {age} years old!</p>
//       <p>So you were probably born in {bornYear()}</p>
//     </div>
//   )
// }

// const App = () => {
//   const now = new Date()
//   const a = 23
//   const b = 46
//   var age = 24
//   console.log("Hello to the console")

//   return (
//   <div>
//     <img src={logo} className="App-logo" alt="logo" />
//     <Hello name="Kevin" age={age}/>
//     <p>It is {now.toString()}</p>
//     <p>
//       {a} plus {b} is {a + b}
//     </p>
//   </div>
//   )
// }

export default App;
