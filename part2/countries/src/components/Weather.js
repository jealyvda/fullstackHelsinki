import axios from 'axios'
import { useState, useEffect } from "react"

const Weather = ({ country }) => {
  const api_key = process.env.REACT_APP_API_KEY
  const lat = country.capitalInfo.latlng[0] 
  const lon = country.capitalInfo.latlng[1]

  const [weather, setWeather] = useState({})

    
  useEffect(() => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`)
      .then(response => {
        const temp = response.data.main.temp
        const icon = response.data.weather[0].icon
        const wind_speed = response.data.wind.speed
        setWeather({
          temp,
          icon,
          wind_speed
        })
      })
  }, [api_key, lat, lon])

  return(
    <>
    <h1> Weather</h1>
    <p>temperature {weather.temp} &#8451;</p>
    <img src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`}/>
    <p>wind {parseFloat(weather.wind_speed)} m/s </p>
    </>
  )


}

export default Weather