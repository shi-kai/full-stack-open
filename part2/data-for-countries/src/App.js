import axios from "axios";
import { useEffect, useState } from "react";
import Weather from "./Weather";

const App = () => {
  const [countryList, setCountryList] = useState([]);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountryList(response.data);
    });
  }, []);

  const handleKeywordChange = (event) => {
    setKeyword(event.target.value);
  };

  let vis;
  if (countryList.length > 0 && keyword !== "") {
    const searchResult = countryList.filter((country) => {
      return country.name.common.toLowerCase().includes(keyword.toLowerCase());
    });

    if (searchResult.length > 10) {
      vis = "Too many matches, specify another filter";
    } else if (searchResult.length > 1 && searchResult.length <= 10) {
      vis = searchResult.map((country) => {
        return <p key={country.name.common}>{country.name.common}</p>;
      });
    } else if (searchResult.length === 1) {
      const {
        name: { common },
        capital,
        area,
        languages,
        flags: { png },
        latlng,
      } = searchResult[0];

      vis = (
        <>
          <h2>{common}</h2>
          <p>captial {capital[0]}</p>
          <p>area {area}</p>
          <h3>languages</h3>
          <ul>
            {Object.values(languages).map((language) => (
              <li key={language}>{language}</li>
            ))}
          </ul>
          <img src={png} alt="country flag" />
          <h3>Weather in {capital[0]}</h3>
          <Weather latlng={latlng} />
        </>
      );
    } else {
      vis = "no match, specify another filter";
    }
  }

  return (
    <div>
      find countries
      <input type="search" value={keyword} onChange={handleKeywordChange} />
      <div>{vis}</div>
    </div>
  );
};

export default App;
