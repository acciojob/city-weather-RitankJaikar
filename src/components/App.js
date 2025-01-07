import React, { useState } from 'react';

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState(null);
  const API_KEY = 'fa8b6b96a01db77ae3d253c0e1c9b50a';

  const fetchWeather = (e) => {
    e.preventDefault();
    // setQuery('');

    if (!query) {
      alert('Please enter a city name.');
      return;
    }

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${API_KEY}&units=metric`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error('City not found');
        }
        return response.json();
      })
      .then((data) => {
        setWeather({
          city: data.name,
          temperature: data.main.temp,
          description: data.weather[0].description,
          icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
        });
        setQuery(''); // Clear the input field
      })
      .catch((error) => {
        // alert(error.message);
      });
  };

  return (
    <div className="App">
      <h1>City Weather App</h1>
      <form className="form" onSubmit={fetchWeather}>
        <input
          className="search"
          type="text"
          value={query}
          placeholder="Enter city name"
          onChange={(e) => setQuery(e.target.value)}
        />
        <button>Search</button>
      </form>
      <div className="weather">
        {weather && (
          <div>
            <h1>Weather info</h1>
            <h2 className="city">{weather.city}</h2>
            <p className="temperature">Temperature: {weather.temperature}°C</p>
            <p className="description">Condition: {weather.description}</p>
            <img src={weather.icon} alt="Weather Icon" className="icon" />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
