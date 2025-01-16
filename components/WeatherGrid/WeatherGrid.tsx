import React, { useEffect, useState } from 'react'

const WeatherGrid = ({ weatherData }: any) => {

    const [sunriseHour, setSunriseHour] = useState<string>('')
    const [sunriseMinute, setSunriseMinute] = useState<string>('')
    const [sunsetHour, setSunsetHour] = useState<string>('')
    const [sunsetMinute, setSunsetMinute] = useState<string>('')
    const [timezone, setTimezone] = useState<string>('')

    // Calculate sunrise and sunset time based with consideration of timezone
    useEffect(() => {
        if (weatherData && weatherData.sys.sunrise && weatherData.sys.sunset) {

            const sunriseTimestamp = new Date(weatherData.sys.sunrise * 1000);
            const sunriseHour = ((sunriseTimestamp.getUTCHours() + weatherData.timezone / 60 / 60) % 24).toString()
            const sunriseMinute = sunriseTimestamp.getMinutes().toString()
            setSunriseHour(sunriseHour.length >= 2 ? sunriseHour : "0" + sunriseHour)
            setSunriseMinute(sunriseMinute.length >= 2 ? sunriseMinute : "0" + sunriseMinute)

            const sunsetTimestamp = new Date(weatherData.sys.sunset * 1000);
            const sunsetHour = ((sunsetTimestamp.getUTCHours() + weatherData.timezone / 60 / 60) % 24).toString()
            const sunsetMinute = sunsetTimestamp.getMinutes().toString()
            setSunsetHour(sunsetHour.length >= 2 ? sunsetHour : "0" + sunsetHour)
            setSunsetMinute(sunsetMinute.length >= 2 ? sunsetMinute : "0" + sunsetMinute)

            setTimezone((weatherData.timezone / 60 / 60) >= 0 ? "+" + (weatherData.timezone / 60 / 60).toString() : (weatherData.timezone / 60 / 60).toString())
        }
    }, [weatherData])

    return (
        <>
            {weatherData ? (
                <div className="w-full grid grid-cols-1 tablet:grid-cols-3 gap-1 tablet:gap-4 items-center auto-rows-fr">
                    <div className="w-full h-full tablet:px-4 flex flex-col items-center">
                        <span className="text-darkgrey text-xl">Weather</span>
                        <div className="w-full h-full flex flex-col items-center justify-center mb-9 rounded-xl py-8 desktop:px-7 shadow-md transition-all hover:shadow-lg sm:p-9 lg:px-6 xl:px-9">
                            <img className="w-auto" src={`/images/icons/${weatherData.weather[0].icon}.png`} alt={weatherData.weather[0].description} />
                            <h3 className="mb-4 text-xl font-bold text-black sm:text-2xl lg:text-xl xl:text-2xl">{weatherData.weather[0].main}</h3>
                            <p className="text-base font-medium text-body-color">{weatherData.weather[0].description}</p>
                        </div>
                    </div>
                    <div className="w-full h-full tablet:px-4 flex flex-col items-center">
                        <span className="text-darkgrey text-xl">Temperature</span>
                        <div className="w-full h-full flex flex-row items-center mb-9 rounded-xl py-8 desktop:px-7 shadow-md transition-all hover:shadow-lg sm:p-9 lg:px-6 xl:px-9">
                            <div className="w-1/2 text-left mx-4">
                                <img className="h-[100px] mb-4 object-scale-down" src={`/images/icons/thermometer.png`} alt="Temperature Icon" />
                                <h3 className="text-md text-darkgrey sm:text-2xl lg:text-xl xl:text-2xl">Current:</h3>
                                <h3 className="text-4xl font-bold text-darkgrey sm:text-2xl lg:text-xl xl:text-2xl">{weatherData.main.temp}°C</h3>
                            </div>
                            <div className="w-1/2 mx-4">
                                <h3 className="text-md font-bold text-darkgrey sm:text-2xl lg:text-xl xl:text-2xl">Feels like:</h3>
                                <p className="mb-4 text-base font-medium text-darkgrey">{weatherData.main.feels_like}°C</p>
                                <h3 className="text-md font-bold text-darkgrey sm:text-2xl lg:text-xl xl:text-2xl">Max:</h3>
                                <p className="mb-4 text-base font-medium text-darkgrey">{weatherData.main.temp_max}°C</p>
                                <h3 className="text-md font-bold text-darkgrey sm:text-2xl lg:text-xl xl:text-2xl">Min:</h3>
                                <p className="text-base font-medium text-darkgrey">{weatherData.main.temp_min}°C</p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full h-full tablet:px-4 flex flex-col items-center">
                        <span className="text-darkgrey text-xl">Sunrise / Sunset</span>
                        <div className="w-full h-full flex flex-col items-center mb-9 rounded-xl py-8 desktop:px-7 shadow-md transition-all hover:shadow-lg sm:p-9 lg:px-6 xl:px-9">
                            <div className="w-full flex flex-row items-center">
                                <div className="w-1/2 text-left flex flex-col items-center mx-4">
                                    <img className="h-[100px] mb-4 object-scale-down" src={`/images/icons/sunrise.png`} alt="Sunrise Icon" />
                                    <h3 className="text-md text-darkgrey sm:text-2xl lg:text-xl xl:text-2xl">Sunrise:</h3>
                                    <h3 className="mb-4 text-4xl font-bold text-darkgrey sm:text-2xl lg:text-xl xl:text-2xl">{sunriseHour.length > 0 && sunriseMinute.length > 0 && `${sunriseHour}:${sunriseMinute}`}</h3>
                                </div>
                                <div className="w-1/2 text-left flex flex-col items-center mr-4">
                                    <img className="h-[100px] mb-4 object-scale-down" src={`/images/icons/sunset.png`} alt="Sunset Icon" />
                                    <h3 className="text-md text-darkgrey sm:text-2xl lg:text-xl xl:text-2xl">Sunset:</h3>
                                    <h3 className="mb-4 text-4xl font-bold text-darkgrey sm:text-2xl lg:text-xl xl:text-2xl">{sunsetHour.length > 0 && sunsetMinute.length > 0 && `${sunsetHour}:${sunsetMinute}`}</h3>
                                </div>
                            </div>
                            <p className="text-base font-medium text-body-color">GMT{timezone}</p>
                        </div>
                    </div>
                    <div className="w-full h-full tablet:px-4 flex flex-col items-center">
                        <span className="text-darkgrey text-xl">Wind Speed</span>
                        <div className="w-full h-full flex flex-col items-center mb-9 rounded-xl py-8 desktop:px-7 shadow-md transition-all hover:shadow-lg sm:p-9 lg:px-6 xl:px-9">
                            <img className="h-[100px] mb-4 object-scale-down" src={`/images/icons/storm.png`} alt="Sunrise Icon" />
                            <h3 className="text-md text-darkgrey sm:text-2xl lg:text-xl xl:text-2xl">Speed:</h3>
                            <h3 className="mb-4 text-4xl font-bold text-darkgrey sm:text-2xl lg:text-xl xl:text-2xl">{weatherData.wind.speed}m/s</h3>
                        </div>
                    </div>
                    <div className="w-full h-full tablet:px-4 flex flex-col items-center">
                        <span className="text-darkgrey text-xl">Humidity</span>
                        <div className="w-full h-full flex flex-col items-center mb-9 rounded-xl py-8 desktop:px-7 shadow-md transition-all hover:shadow-lg sm:p-9 lg:px-6 xl:px-9">
                            <img className="h-[100px] mb-4 object-scale-down" src={`/images/icons/humidity.png`} alt="Sunrise Icon" />
                            <h3 className="text-md text-darkgrey sm:text-2xl lg:text-xl xl:text-2xl">Humidity:</h3>
                            <h3 className="mb-4 text-4xl font-bold text-darkgrey sm:text-2xl lg:text-xl xl:text-2xl">{weatherData.main.humidity}%</h3>
                        </div>
                    </div>
                    <div className="w-full h-full tablet:px-4 flex flex-col items-center">
                        <span className="text-darkgrey text-xl">Visibility</span>
                        <div className="w-full h-full flex flex-col items-center mb-9 rounded-xl py-8 desktop:px-7 shadow-md transition-all hover:shadow-lg sm:p-9 lg:px-6 xl:px-9">
                            <img className="h-[100px] mb-4 object-scale-down" src={`/images/icons/visibility.png`} alt="Sunrise Icon" />
                            <h3 className="text-md text-darkgrey sm:text-2xl lg:text-xl xl:text-2xl">Visibility:</h3>
                            <h3 className="mb-4 text-4xl font-bold text-darkgrey sm:text-2xl lg:text-xl xl:text-2xl">{weatherData.visibility / 1000}km</h3>
                        </div>
                    </div>
                </div>
            ) : (
                <p>Loading weather data...</p>
            )}</>
    )
}

export default WeatherGrid