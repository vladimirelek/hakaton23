import React, { useState, useEffect } from "react";
import axios from "axios";
import "./temp.css";
import moment from "moment";

const Temperature = () => {
  const date = new Date();
  const [temperature, setTemperature] = useState(null);
  const [windSpeed, setWindSpeed] = useState(null);
  const [city, setCity] = useState("Mostar");
  const [currentTime, setCurrentTime] = useState(date.toLocaleTimeString());
  const [wco, setWco] = useState(null);
  const [value, setValue] = useState("");

  function storeInput() {
    var inputText = document.getElementById("textInput").value;
    console.log("Input Text:", inputText);
    setCity(inputText);
    document.getElementById("textInput").value = ""; // clear the input field
  }

  useEffect(() => {
    const url =
      "https://api.geoapify.com/v1/geocode/search?text=38%20" +
      city +
      "&apiKey=f7991299c25344399a2e69a7ed2db1c2";
    let coordinates;
    axios
      .get(url)
      .then((response) => {
        coordinates = [
          response.data.features[0].bbox[0],
          response.data.features[0].bbox[1],
        ];
        axios
          .get(
            "https://api.open-meteo.com/v1/forecast?latitude=" +
              coordinates[1] +
              "&longitude=" +
              coordinates[0] +
              "&current_weather=true"
          )
          .then((response) => {
            setWco(response.data.current_weather.weathercode);
            setTemperature(response.data.current_weather.temperature);
            setWindSpeed(response.data.current_weather.windspeed);
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  }, [setCity, city]);

  return (
    <div className="container">
      <div className="widget">
        <div className="txt">{`Vrijeme:${currentTime}`}</div>
        <div className="txt">{city}</div>
        <div className="txt">{temperature} °C</div>
        <div className="txt">{`Vjetar:${windSpeed}km/h`}</div>
        <div className="unos-lokacije">
          <input type="text" id="textInput" placeholder="unesite lokaciju" />
          <button class="lokacija" onClick={storeInput}>
            Unesi
          </button>
        </div>
      </div>
      <div className="widget1">
        {wco < 45 ? (
          <img
            src="https://cdn4.iconfinder.com/data/icons/cloud-based-weather-forecasts/512/weather01-sunshine-512.png"
            alt="nista"
            style={{ width: '200px', height: '200px' }}
            
          />
        ) : (
          <img
            src="https://cdn0.iconfinder.com/data/icons/weaher-forecast/128/weatherForecast-27-512.png"
            alt="nista"
          />
        )}
        <div className="txt1">{wco < 45 ? "Nije oblačno" : "Oblačno"}</div>
                  {wco > 55 ? (
          <img alt=""
            src="https://cdn-icons-png.flaticon.com/512/31/31823.png?w=740&t=st=1679190140~exp=1679190740~hmac=072d54bbfee95be4f6baf3bd07c87eeec46303364416f08a144abc532b884a68"
            style={{ width: '100px', height: '100px', position: 'relative', bottom: '20px', marginBottom: '40px' }}
          
          />
        ) : (
          <img alt=""
            src="https://cdn-icons-png.flaticon.com/512/106/106045.png"
            style={{ width: '100px', height: '100px', position: 'relative', bottom: '20px', marginBottom: '40px' }}
          />
        )}

                  <div className="txt1">{wco > 55 ? "Pada kisa" : "Ne pada kiša"}</div>
      </div>
    </div>
  );
};

export default Temperature;
