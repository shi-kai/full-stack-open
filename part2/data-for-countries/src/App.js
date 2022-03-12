import axios from "axios";
import { useEffect, useState } from "react";
import Countrylist from "./Countrylist";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then(({ data }) => {
      setCountries(data);
    });
  }, []);

  const filtered = countries.filter((c) =>
    c.name.common.toLowerCase().includes(keyword.toLowerCase())
  );

  return (
    <>
      <div>
        find countries
        <input
          type="search"
          value={keyword}
          onChange={({ target }) => setKeyword(target.value)}
        />
      </div>
      <Countrylist countries={filtered} setKeyword={setKeyword} />
    </>
  );
};

export default App;
