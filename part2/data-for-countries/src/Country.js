import { useState, useEffect } from "react";
import axios from "axios";
import Weather from "./Weather";

const Country = ({ country }) => {
  const [weather, setWeather] = useState(null);
  const languages = Object.values(country.languages);
  const capital = country.capital[0];

  useEffect(() => {
    const key = process.env.REACT_APP_API_KEY;
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${key}&units=metric`;
    axios.get(url).then(({ data }) => {
      setWeather(data);
    });
  }, []);

  return (
    <>
      <h2>{country.name.common}</h2>
      <div>capital {capital} </div>
      <div>area {country.area} </div>
      <h3>languages</h3>
      <ul>
        {languages.map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img
        src={country.flags.png}
        alt={`Flag of ${country.name.common}`}
        width={150}
      />
      <Weather weather={weather} city={capital} />
    </>
  );
};

export default Country;
