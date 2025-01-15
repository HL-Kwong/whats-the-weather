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
    <div className="flex flex-col items-center min-h-screen p-8 pb-20">
      <h1 className="text-4xl text-darkgrey py-8">What's the weather</h1>
      <div id="citySearchSection" className="w-full h-auto p-8 flex flex-col items-center">
        <CitySearchBar handleCitySelected={handleCitySelected} />
      </div>
      <div id="weatherDetailSection" className="w-full h-auto tablet:p-8 flex flex-row items-center">
        {weatherData &&
          <WeatherGrid weatherData={weatherData} />
        }
      </div>
    </div>
  );
}
