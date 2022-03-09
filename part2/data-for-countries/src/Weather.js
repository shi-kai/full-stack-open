import { useEffect, useState } from "react";
import axios from "axios";

const Weather = (props) => {
  const [info, setInfo] = useState({});
  const {
    latlng: [lat, lng],
  } = props;

  useEffect(() => {
    axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${process.env.REACT_APP_API_KEY}`
      )
      .then((response) => {
        setInfo(response.data);
      });
  }, [lat, lng]);

  return (
    Object.keys(info).length > 0 && (
      <>
        <p>temperature {Math.floor(info.main.temp - 273.15)} Celsius</p>
        <img
          src={`http://openweathermap.org/img/wn/${info.weather[0].icon}@2x.png`}
          alt="weather icon"
        />
        <p>wind {info.wind.speed} m/s</p>
      </>
    )
  );
};

export default Weather;
