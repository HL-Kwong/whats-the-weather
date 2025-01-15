"use client"
import { useEffect, useState } from "react";

import axios from "axios";

//Components
import CitySearchBar from "@/components/CitySearchBar/CitySearchBar";
import WeatherGrid from "@/components/WeatherGrid/WeatherGrid";

export default function Home() {

  const [city, setCity] = useState<any>(null);
  const [weatherData, setWeatherData] = useState<any>(null);

  // Search city weather based on user selected city
  const fetchData = async () => {
    axios.get(`${process.env.API_GET_WEATHER}`, {
      params: {
        lat: city.lat,
        lon: city.lon,
        units: 'metric',
        appid: process.env.API_KEY
      }
    })
      .then(function (response) {
        setWeatherData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    if (city && city.lat && city.lon) {
      fetchData();
    }
  }, [city]);

  // Store city state when user select city
  const handleCitySelected = (selectedCity: any) => {
    setCity(selectedCity)
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div id="citySearchSection">
        <CitySearchBar handleCitySelected={handleCitySelected} />
      </div>
      <div id="weatherDetailSection">
        {weatherData &&
          <WeatherGrid weatherData={weatherData} />
        }
      </div>
    </div>
  );
}
