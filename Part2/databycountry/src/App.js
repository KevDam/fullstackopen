import React, {useState, useEffect} from React;
import './App.css';

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

const App = () => {
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

    const countriesHook = () => {
    axios.get(`https://restcountries.eu/rest/v2/name/${newCountryFilter}`)
    .then(response => {
      console.log('Countries Promise Fulfilled')
      console.log(response.data)
      setCountries(response.data)
    })
  }

  useEffect(countriesHook)


  return (
    <div>
      <div>Find Countries: <input value={newCountryFilter} onChange={handleCountryFilterChange} /></div>
      <div>
        <CountryList countries={countries} viewHandler={handleShowCountryView} weatherHandler={handleWeather} weather={weather}/>
      </div>
    </div>
  );
}

export default App;
