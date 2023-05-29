import React, { useEffect, useState } from 'react'
import './Weather.css'
const Weather = () => {
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const timezoneOffset = 19800; // Time zone offset in second
  const currentDate = new Date();
  const currentHour = currentDate.getHours();
  const currentUtcOffset = currentDate.getTimezoneOffset() * 60; // Get the current UTC offset in seconds
  const localTimeOffset = currentUtcOffset + timezoneOffset;
  const localTime = new Date(currentDate.getTime() + localTimeOffset * 1000).toLocaleTimeString();
  const Time = () => {
    if (currentHour >= 12) {
      return 'PM'
    }
    else {
      return 'AM'
    }
  }
  const [data, setData] = useState(null);
  const [city, setCity] = useState(null);
  const [sys, setSys] = useState(null);
  const [search, setSearch] = useState("Jaunpur");
  useEffect(() => {
    const fetchApi = async () => {
      const q = process.env.REACT_APP_API_KEY;
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=${q}`
      const response = await fetch(url);
      const resjson = await response.json();
      console.log(resjson);
      setData(resjson);
      setCity(resjson.main);
      setSys(resjson.sys);
    };
    fetchApi();
  }, [search])
  return (
    <div className='Container'>
      <div className='Search'>
        <i class="fas fa-search search-icon"></i>
        <input type='search' value={search} onChange={(event) => {
          setSearch(event.target.value)
        }} />
      </div>
      {!city ? (<div className='errormsg'><h1><b>data not found !</b></h1></div>) : (<div className='info'>
        <section className='three'><h4> {new Date(data.dt * 1000).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} | {daysOfWeek[new Date(data.dt * 1000).getDay()]}</h4>
          <h4>{localTime} {Time()}</h4></section>
        <section className='one'>
          <i class="fa-solid fa-cloud fa-2xl" style={{ color: '#fff70f' }}></i>
          <h2>
            <i className="fa-solid fa-location-dot"></i> {search}, {sys.country}
          </h2>
          <h1>
          {city.temp}°Celsius({data.weather[0].description})
          </h1>
          <i class="fa-solid fa-temperature-half"></i> <b>{city.feels_like}°C</b> </section>
        <section className='two'>
          Pressure: {city.pressure}mb <br />
          <br />
          Humidity: {city.humidity}% <br />
          <br />
          Min: {city.temp_min}°C <br />
          <br />
          Max: {city.temp_max}°C<br />
          <br />
          Visibility: {data.visibility / 1000}Km <br />
          <br />
          Wind Speed: {data.wind.speed} km/h <br />
          <br />
          Sunrise: {new Date(sys.sunrise * 1000).toLocaleTimeString()} AM <br />
          <br />
          Sunset: {new Date(sys.sunset * 1000).toLocaleTimeString()} PM
        </section>
      </div>)}
    </div>
  )
}
export default Weather
