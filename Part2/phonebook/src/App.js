import './App.css'
import React, { useState, useEffect } from 'react'
import axios from 'axios'

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

const CountryList = ({countries, viewHandler, weatherHandler, weather}) => {
  if (countries.length > 10) {
    return (
      <div>Too many matches, please further specify your search</div>
    )
  } else if (countries.length === 1) {
    let country = countries[0]
    axios
      .get(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${country.capital}`)
      .then(response => {
        console.log(response.data)
        weatherHandler(response.data)
      })
      return (
        <div>
          <h2>{country.name}</h2>
          <br></br>
          Capital: {country.capital}
          <br></br>
          Population: {country.population}
          <h3>Languages:</h3>
          <ul>
            {country.languages.map(language => <li>{language.name}</li>)}
          </ul>
          <img src={country.flag} alt='' width="600" height="300"></img>

          <div>
            <h3>Weather in {country.capital}</h3>
            <b>Temperature: </b>{weather.current.temperature} Celsius
            <img src={weather.current.weather_icons[0]} alt="" />
            <b>Wind: </b>{weather.current.wind_speed} direction {weather.current.wind_dir}
          </div>
        </div>
      )

  } else {
    return (
      <div>
        {countries.map(country => <div>{country.name}
        <button onClick={viewHandler} value={country.name}>Show</button></div>)}
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
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNum, setNewNum ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [ newCountryFilter, setNewCountryFilter ] = useState('')
  const [ countries, setCountries ] = useState([])
  const [ weather, setWeather ] = useState({
    "current": {
      "temperature": 0,
      "weather_icons": [""],
      "wind_speed": 0,
      "wind_dir": ""
    }
  })

  const personsHook = () => {
    axios.get('http://localhost:3001/persons').then(response => {
      console.log('Persons Promise Fulfilled')
      setPersons(response.data)
    })
  }

  useEffect(personsHook, [])

  const countriesHook = () => {
    axios.get(`https://restcountries.eu/rest/v2/name/${newCountryFilter}`)
    .then(response => {
      console.log('Countries Promise Fulfilled')
      console.log(response.data)
      setCountries(response.data)
    })
  }

  useEffect(countriesHook)

  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }

  const handleNumChange = (e) => {
    setNewNum(e.target.value)
  }

  const handleFilterChange = (e) => {
    setNewFilter(e.target.value)
  }

  const handleCountryFilterChange = (e) => {
    setNewCountryFilter(e.target.value)
  }

  const handleShowCountryView = (e) => {
    setNewCountryFilter(e.target.value)
  }

  const handleWeather = (e) => {
    setWeather(e)
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

      <br></br>

      <div>Find Countries: <input value={newCountryFilter} onChange={handleCountryFilterChange} /></div>
      <div>
        <CountryList countries={countries} viewHandler={handleShowCountryView} weatherHandler={handleWeather} weather={weather}/>
      </div>
    </div>
  )
}

export default App