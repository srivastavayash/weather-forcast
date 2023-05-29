import React, { useEffect, useState } from 'react'
import './Weather.css'
const Weather = () => {
  const [city, setCity] = useState(null);
  const [search, setSearch] = useState("Jaunpur");
  useEffect(() => {
    const fetchApi = async () => {
      const q = process.env.REACT_APP_API_KEY;
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=${q}`
      const response = await fetch(url);
      const resjson = await response.json();
      console.log(resjson); //changing complete ui design 
      setCity(resjson.main);
    };
    fetchApi();
  }, [search])
  return (
    <div className='Container'>
      <div className='Search'>
        <input type='search' value={search} onChange={(event) => {
          setSearch(event.target.value)
        }} />
      </div>
      {!city ? (<div className='errormsg'><h1><b>data not found !</b></h1></div>) : (<div className='info'>
        <h2>
          <i className="fa-solid fa-location-dot"></i> {search}
        </h2>
        <h1>
          {city.temp}°Celsius
        </h1>
        <h3>
          Min: {city.temp_min}°C | Max: {city.temp_max}°C
        </h3>
      </div>)}
    </div>
  )
}
export default Weather