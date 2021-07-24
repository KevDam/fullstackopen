import './App.css'
import React, { useState, useEffect } from 'react'
import personService from './services/persons.js'

const Person = ({person, handleDeletePerson}) => {
  return (
    <div>
      {person.name}: {person.number} <button onClick={
        () => {
          if(window.confirm(`Are you sure you want to delete ${person.name}?`)){
            handleDeletePerson(person.id)
          }
        }
      }>Delete</button>
    </div>
  )
}

const PersonList = ({persons, filter, handleDeletePerson}) => {
  if (filter === '') {
    return (
      <div>
        {persons.map(person => <Person key={person.name} person={person} handleDeletePerson={handleDeletePerson} />)}
      </div>
    )
  } else {
    let filteredPersons = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

    return (
      <div>
        {filteredPersons.map(person => <Person key={person.name} person={person} handleDeletePerson={handleDeletePerson}/>)}
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

const Notification = ({message}) => {
  if (message === '' || message === null) {
    return null
  } else {
    return (
      <div className="error">
        {message}
      </div>
    )
  }
}

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNum, setNewNum ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [ newError, setNewError ] = useState('')

  const personsHook = () => {
    personService.getAll().then(response => {
      console.log('Persons Promise Fulfilled')
      setPersons(response.data)
    })
  }

  useEffect(personsHook, [])

  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }

  const handleNumChange = (e) => {
    setNewNum(e.target.value)
  }

  const handleFilterChange = (e) => {
    setNewFilter(e.target.value)
  }

  const handleDeletePerson = (id) => {
    personService.deletePerson(id)
      .then(response => {
        let newPersons = persons.filter(p => p.id !== id)
        setPersons(newPersons)
      }).catch(error => {
        console.log(error.response.data)
        setNewError(error.message)
      })

  }

  const addPerson = (e) => {
    e.preventDefault()

    if (persons.find(person => (person.name === newName && person.number === newNum))) {
      setNewError(`${newName} is already added to the phonebook`)
    } else if (persons.find(person => person.name === newName)) {
      let selectedPerson = persons.find(person => person.name === newName)

      if (window.confirm(`${selectedPerson.name} is already added to the phonebook, replace the old number with a new one?`)) {
        const updatedPerson = {
          name: newName,
          number: newNum,
          id: selectedPerson.id
        }

        let updatedPersons = persons.map(p => p.id === updatedPerson.id ? updatedPerson : p)
        setPersons(updatedPersons)
        setNewName('')
        setNewNum('')

        personService
          .update(updatedPerson.id, updatedPerson)
          .then(response => {
            console.log(response)
          }).catch(error => {
            console.log(error.response.data)
            setNewError(error.message)
          })
      }
    } else {
      const personObj = {
        name: newName,
        number: newNum
      }

      setPersons(persons.concat(personObj))
      setNewName('')
      setNewNum('')

      personService
        .create(personObj)
        .then(response => {
          console.log(response)
        }).catch(error => {
          console.log(error.response.data)
          setNewError(error.message)
        })
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={newError} />
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
      <PersonList persons={persons} filter={newFilter} handleDeletePerson={handleDeletePerson}/>
    </div>
  )
}

export default App
