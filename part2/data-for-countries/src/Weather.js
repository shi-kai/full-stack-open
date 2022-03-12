const Weather = ({ weather, city }) => {
  if (weather === null) return null;

  const icon = `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;

  return (
    <>
      <h3>Weather in {city}</h3>
      <p>temperature {weather.main.temp} Celsius</p>
      <img src={icon} alt={`icon for ${weather.weather[0].description}`} />
      <p>wind {weather.wind.speed} m/s</p>
    </>
  );
};

export default Weather;
