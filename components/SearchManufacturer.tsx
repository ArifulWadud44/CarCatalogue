"use client";

import { useState, Fragment } from 'react';
import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions, Transition } from '@headlessui/react';
import { SearchManufacturerProps } from '@/types'
import React from 'react'
import Image from 'next/image';
import { manufacturers } from '@/constants';

const SearchManufacturer = ({manufacturer, setManufacturer} : SearchManufacturerProps) => {
    const [query, setQuery] = useState('')

    const filteredManufacturers = 
        query === ""
            ? manufacturers
            : manufacturers.filter((item) => (
                item.toLocaleLowerCase()
                .replace(/\s+/g, "")
                .includes(query.toLocaleLowerCase().replace(/\s+/g, ""))
            ))

  return (
    <div className='search-manufacturer'>
        <Combobox 
    value={manufacturer}
        onChange={setManufacturer}
        >
            <div className='relative w-full'>
        <ComboboxButton className="absolute top-[14px]">
        <Image 
        src="/car-logo.svg"
        alt='Car Logo'
        width={20}
        height={20}
        className='ml-4'
        />
        </ComboboxButton>
        <ComboboxInput
            className="search-manufacturer__input"
            placeholder='Mercedes Benz'
            displayValue={(manufacturer: string) => manufacturer}
            onChange={(e) => setQuery(e.target.value)}
        />
        <Transition 
        as={Fragment}
        leave='transtion ease-in duration-100'
        leaveFrom='opacity-100'
        leaveTo='opacity-0'
        afterLeave={() => setQuery('')}
        >
            <ComboboxOptions>
            {filteredManufacturers.length === 0 && query !== "" ? (
                <ComboboxOption
                    value={query}
                    className="search-manufacturer__option"
                >
                    Create "{query}"
                </ComboboxOption>
            )
            : (filteredManufacturers.map((item) => (
                <ComboboxOption
                value={item}
                key={item}
                className={({ active }) => `
                relative search-manufacturer__option
                ${active ? 'bg-black text-white' : 'text-gray-900'}`
                }
                >
                    {item}
                </ComboboxOption>
            )))
        }
        </ComboboxOptions>

                
        </Transition>
            </div>
        </Combobox>
    </div>
  )
}

export default SearchManufacturer