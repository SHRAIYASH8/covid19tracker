import React, { useEffect, useState } from "react";
export default function UseEffect() {
  const [country, setCountry] = useState("");
  const [countryList, setCountryList] = useState([]);
  const [confirmed, setConfirmed] = useState(0);
  const [recovered, setRecovered] = useState(0);
  const [death, setDeath] = useState(0);
  React.useEffect(() => {
    fetch(`https://covid19.mathdro.id/api/countries/${country}`)
      .then((response) => response.json())
      .then((data) => {
        if (data?.confirmed !== undefined) {
          setConfirmed(data?.confirmed?.value);
          setRecovered(data?.recovered?.value);
          setDeath(data?.deaths?.value);
        } else if (data.error === undefined) {
          setCountryList(data?.countries?.map((country) => country.name));
        } else {
          alert(data?.error?.message);
        }
      });
  }, [country]);
  const handleSubmit = (event) => {
    event.preventDefault();
    setCountry(event?.target?.value);
  };
  return (
    <div>
      <h1>COVID-19 cases:</h1>
      <form onChange={handleSubmit}>
        <select name="countryName" value={countryList}>
          <option value="">Select the country</option>
          <>
            {countryList.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </>
        </select>
      </form>
      <br />
      <div className="wrapper">
        {country && (
          <>
            <strong>
              <div>{country}</div>
            </strong>
            <div>&nbsp;Confirmed cases: {confirmed}</div>
            <div>Recovered cases: {recovered}</div>
            <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Total Death: {death}</div>
          </>
        )}
      </div>
    </div>
  );
}
