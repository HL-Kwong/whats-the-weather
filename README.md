# What's the Weather Application

This responsive web application is built using **Next.js**, **Headless UI** and **Tailwind CSS** for the frontend, and it interacts with RESTful APIs using **Axios** to fetch weather data. The app allows users to search for a city and view detailed weather reports for their selected location.

## Features

1. **City Search**: Users can input a city name or part of a city name.
2. **City Suggestions**: The app fetches a list of up to 5 matching cities based on the input.
3. **City Selection**: Users select a city from the suggestions.
4. **Weather Report**: The app fetches detailed weather data for the selected city, including:
   - Overall weather condition
   - Temperature (Actual, Feels like, Min, Max)
   - Sunrise and sunset times (converted to the chosen city's timezone)
   - Wind speed
   - Humidity
   - Visibility
5. **Responsive Design**: The app is fully responsive, providing a seamless experience on both desktop and mobile devices.
6. **UI Enhancements**: Tailwind CSS and Headless UI ensure a sleek, accessible, and interactive user interface.
## Technology Stack

### Frontend
- **Next.js**: Framework for server-rendered React applications.
- **Headless UI**: Unstyled, fully accessible UI components.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Axios**: Promise-based HTTP client for API requests.

### API Integration
- RESTful APIs for fetching city suggestions and weather data.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/weather-finder.git
   ```
2. Navigate to the project directory:
   ```bash
   cd weather-finder
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a `.env.local` file in the root directory and add your API keys:
   ```env
   API_KEY=<your-weather-api-key>
   API_GET_WEATHER=https://api.openweathermap.org/data/2.5/weather
   API_GET_CITY=https://api.openweathermap.org/geo/1.0/direct
   ```
5. Start the development server:
   ```bash
   npm run dev
   ```

## Usage

1. Open the application in your browser at `http://localhost:3000`.
2. Enter the name or part of the name of a city in the search bar.
3. Select a city from the suggested list.
4. View the weather report for the selected city.

## Project Structure

```plaintext
weather-finder/
├── app/                 # App Router
├── components/          # Reusable components (e.g., CitySearchBar, WeatherGrid)
├── public/              # Static assets (e.g., images, icons)
├── styles/              # Global and component-specific styles
├── .env.local           # Environment variables (not included in the repo)
├── package.json         # Project dependencies and scripts
└── README.md            # Project documentation
```

## API Endpoints

### 1. City Suggestions API
- **Endpoint**: `https://api.openweathermap.org/geo/1.0/direct`
- **Method**: GET
- **Parameters**:
  - `q`: Partial or full city name
  - `limit`: Number of city returned
  - `appid`: Your API key
- **Response**: Array of up to 5 matching cities with their names, longitude, and latitude.

### 2. Weather Data API
- **Endpoint**: `https://api.openweathermap.org/data/2.5/weather`
- **Method**: GET
- **Parameters**:
  - `lat`: Latitude of the selected city
  - `lon`: Longitude of the selected city
  - `units`: Units of measurement
  - `appid`: Your API key
- **Response**: Weather details including condition, temperature, wind speed, humidity, visibility, sunrise, and sunset times.

## Screenshots

![alt text](https://haroldportfoliostorage.blob.core.windows.net/portfolio-assets/images/projectpage/whats-the-weather-screenshot.png)

## Acknowledgments

- [OpenWeatherMap API](https://openweathermap.org/api) for weather data.
- [Tailwind CSS Documentation](https://tailwindcss.com/docs) for styling guidelines.
- [Headless UI Documentation](https://headlessui.com/) for unstyled components guidelines.
- [Next.js Documentation](https://nextjs.org/docs) for framework support.
