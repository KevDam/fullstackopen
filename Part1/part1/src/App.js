import logo from './logo.svg';
import './App.css';

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

const Hello = (props) => {
  return (
    <div>
      <p>Hello {props.name}, you are {props.age} years old!</p>
    </div>
  )
}

const App = () => {
  const now = new Date()
  const a = 23
  const b = 46
  var age = 24
  console.log("Hello to the console")

  return (
  <div>
    <img src={logo} className="App-logo" alt="logo" />
    <Hello name="Kevin" age={age}/>
    <p>It is {now.toString()}</p>
    <p>
      {a} plus {b} is {a + b}
    </p>
  </div>
  )
}

export default App;
