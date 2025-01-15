"use client"
import { useEffect, useState } from "react";

import axios from "axios";

//Components
import CitySearchBar from "@/components/CitySearchBar/CitySearchBar";

export default function Home() {

  const [city, setCity] = useState<any>(null);

  // Store city state when user select city
  const handleCitySelected = (selectedCity: any) => {
    setCity(selectedCity)
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div id="citySearchSection">
        <CitySearchBar handleCitySelected={handleCitySelected} />
      </div>
    </div>
  );
}
