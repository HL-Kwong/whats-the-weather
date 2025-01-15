import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    API_URL_PREFIX: process.env.API_URL_PREFIX,
    API_KEY: process.env.API_KEY,
    API_GET_WEATHER: process.env.API_GET_WEATHER,
    API_GET_CITY: process.env.API_GET_CITY
  }
};

export default nextConfig;
