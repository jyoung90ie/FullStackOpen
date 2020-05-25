import React, { useState, useEffect } from 'react'
import axios from 'axios'

const WeatherDetail = ({ capitalCity }) => {
    // create state variables
    const [weatherData, setWeatherData] = useState({})

    // wrap promise request in useEffect to call only when capitalCity changes
    useEffect(() => {
        // get api key from .env file
        const apiKey = process.env.REACT_APP_WEATHERSTACK_API

        axios
            .get(`http://api.weatherstack.com/current?access_key=${apiKey}&query=${capitalCity}`)
            .then(response => {

                // store data in state variable
                setWeatherData(response.data.current)
            })
    }, [capitalCity])
    // pull weather data from external api for country capital city


    return (<>
        <h2>Weather in {capitalCity}</h2>
        <strong>temperature:</strong> {weatherData.temperature} Celcius<br />
        <img src={weatherData.weather_icons} width="100" height="100" alt="weather icon" /><br />
        <strong>wind:</strong> {weatherData.wind_speed} mph direction {weatherData.wind_dir}
    </>)
}

const CountryDetail = ({ country }) => {
    // display detailed information for a single country
    return (
        <>
            <h1>{country.name}</h1>
            capital: {country.capital}<br />
        population: {country.population}<br />
            <h2>languages</h2>
            <ul>
                {country.languages
                    .map(language => {
                        return <li key={language.name}>{language.name}</li>
                    })
                }
            </ul>
            <img src={country.flag} width="150" height="100" alt="country flag" />
            <WeatherDetail capitalCity={country.capital} />
        </>
    )

}

// display list of countries that match result
const Countries = ({ countries, handleButton }) => {
    const numberOfCountries = countries.length
    if (numberOfCountries === 1) {
        // return detailed view if only one country returned
        return <CountryDetail country={countries[0]} />
    } else if (numberOfCountries > 10) {
        return <p>Your search term returned too many results, please be more specific</p>
    }

    return (
        <ul>
            {countries.map(country => {
                return (
                    <li key={country.name}>
                        {country.name}
                        <button type="button" value={country.name} onClick={handleButton}>show</button>
                    </li>
                )
            })}
        </ul>
    )

}

const App = () => {
    const [country, setCountry] = useState('')
    const [countries, setCountries] = useState([])
    const [searchCountries, setSearchCountries] = useState([])

    // get data from api - this only needs to be run once
    useEffect(
        () => {
            axios
                .get('https://restcountries.eu/rest/v2/all')
                .then(response => {
                    setCountries(response.data)
                })
        },
        []
    )

    // parse api data and return relevant results
    useEffect(
        () => {
            // filter array values that match country
            const filteredCountries = countries.filter(result => {
                // store country in lowercase, want case insenstive search
                const countryName = result.name.toLowerCase()
                const searchCountry = country.toLowerCase()

                return countryName.includes(searchCountry)
            })
            setSearchCountries(filteredCountries)
            // with remaining data, return country list
        },
        // run each time the country variable changes
        [country, countries]
    )

    // when input value changes, update state variable 'country'
    const handleCountryChange = event => {
        setCountry(event.target.value)
    }

    return (
        <div>
            find countries <input value={country} onChange={handleCountryChange} />
            <Countries countries={searchCountries} handleButton={handleCountryChange} />
        </div>
    )
}

export default App