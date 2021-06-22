import './App.css';
import React, { useState } from 'react'

const Person = ({person}) => {
  return (
    <div>
      {person.name}: {person.number}
    </div>
  )
}

const PersonList = ({persons, filter}) => {
  if (filter === '') {
    return (
      <div>
        {persons.map(person => <Person key={person.name} person={person} />)}
      </div>
    )
  } else {
    let filteredPersons = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

    return (
      <div>
        {filteredPersons.map(person => <Person key={person.name} person={person} />)}
      </div>
    )
  }
}

const Filter = ({value, onChange}) => {
  return (
    <div>
        <h2>Filter by Name</h2>
        <div>
          Search: <input value={value} onChange={onChange} />
        </div>
      </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])

  const [ newName, setNewName ] = useState('')
  const [ newNum, setNewNum ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')

  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }

  const handleNumChange = (e) => {
    setNewNum(e.target.value)
  }

  const handleFilterChange = (e) => {
    setNewFilter(e.target.value)
  }

  const addPerson = (e) => {
    e.preventDefault()

    if (persons.find(person => person.name === newName)) {
      window.alert(`${newName} is already added to the phonebook`)
    } else {
      const personObj = {
        name: newName,
        number: newNum
      }

      setPersons(persons.concat(personObj))
      setNewName('')
      setNewNum('')
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <h2>Add New Entry</h2>
      <form>
        <div>
          Name: <input value={newName} onChange={handleNameChange} />
          <br></br>
          Number: <input value={newNum} onChange={handleNumChange} />
        </div>
        <div>
          <button type="submit" onClick={addPerson}>add</button>
        </div>
      </form>
      <Filter value={newFilter} onChange={handleFilterChange} />
      <h2>Numbers</h2>
      <PersonList persons={persons} filter={newFilter} />
    </div>
  )
}

export default App
