"use client"
import { Combobox, ComboboxInput, ComboboxOption, ComboboxOptions, Transition } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'

import axios from 'axios'

const CitySearchBar = ({ handleCitySelected }: any) => {

    const [selectedCity, setSelectedCity] = useState(null)
    const [filteredCities, setFilteredCities] = useState<any[]>([])
    const [query, setQuery] = useState('')

    // Search cities based on user input
    const searchCity = (city: string) => {
        axios.get(`${process.env.API_GET_CITY}`, {
            params: {
                q: city,
                limit: 5,
                appid: process.env.API_KEY
            }
        })
            .then(function (response) {
                setFilteredCities(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    // Trigger searchCity after 1 second delay
    useEffect(() => {
        if (query.length > 0) {
            const timeOutId = setTimeout(() => searchCity(query), 1000);
            return () => clearTimeout(timeOutId);
        }
    }, [query]);

    useEffect(() => {
        handleCitySelected(selectedCity)
    }, [selectedCity]);

    return (
        <div className="w-1/2 max-tablet:w-full">
            <Combobox value={selectedCity} onChange={setSelectedCity}>
                <div className="relative mt-1">
                    <div className="relative w-full p-2 cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md">
                        <ComboboxInput
                            className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-darkgrey focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
                            displayValue={(city) => (city as any)?.name}
                            onChange={(event) => setQuery(event.target.value)}
                            placeholder='Search city'
                        />
                    </div>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        afterLeave={() => setQuery('')}
                    >
                        <ComboboxOptions className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                            {filteredCities.length === 0 && query !== '' ? (
                                <div className="relative cursor-default select-none px-4 py-2 text-darkgrey">
                                    Nothing found.
                                </div>
                            ) : (
                                filteredCities.map((city, index) => (
                                    <ComboboxOption
                                        key={index}
                                        className="relative cursor-default select-none py-2 pl-10 pr-4 text-darkgrey"
                                        value={city}
                                    >
                                        <span className="block truncate font-normal">
                                            {city.name}
                                        </span>
                                    </ComboboxOption>
                                ))
                            )}
                        </ComboboxOptions>
                    </Transition>
                </div>
            </Combobox>
        </div>
    )
}

export default CitySearchBar