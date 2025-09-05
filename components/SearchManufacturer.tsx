"use client";

import Image from "next/image";
import { Fragment, useState, useEffect } from "react";
import { Combobox, Transition } from "@headlessui/react";

import { SearchManuFacturerProps } from "@/types";
import { manufacturers } from "@/constants";

const SearchManufacturer = ({ manufacturer, setManuFacturer }: SearchManuFacturerProps) => {
  const [query, setQuery] = useState("");
  const [selectedManufacturer, setSelectedManufacturer] = useState(manufacturer);

  useEffect(() => {
    setSelectedManufacturer(manufacturer);
  }, [manufacturer]);

  const filteredManufacturers =
    query === ""
      ? manufacturers
      : manufacturers.filter((item) =>
          item
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  const handleChange = (value: string) => {
    setSelectedManufacturer(value);
    setManuFacturer(value);
  };

  return (
    <div className='search-manufacturer'>
      <Combobox value={selectedManufacturer} onChange={handleChange}>
        <div className='relative w-full'>
          <Combobox.Button className='absolute top-[14px] left-4'>
            <Image
              src='/car-logo.svg'
              width={20}
              height={20}
              alt='car logo'
            />
          </Combobox.Button>

          <Combobox.Input
            className='search-manufacturer__input'
            displayValue={(item: string) => item}
            onChange={(event) => setQuery(event.target.value)}
            placeholder='Volkswagen...'
          />

          <Transition
            as={Fragment}
            leave='transition ease-in duration-100'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options className='custom-filter__options'>
              {filteredManufacturers.length === 0 && query !== "" ? (
                <Combobox.Option
                  value={query}
                  className='search-manufacturer__option'
                >
                  Create "{query}"
                </Combobox.Option>
              ) : (
                filteredManufacturers.map((item) => (
                  <Combobox.Option
                    key={item}
                    className={({ active }) =>
                      `relative search-manufacturer__option ${
                        active ? "bg-[#2B59FF] text-white" : "text-black-100"
                      }`
                    }
                    value={item}
                  >
                    {({ selected, active }) => (
                      <>
                        <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>
                          {item}
                        </span>

                        {selected ? (
                          <span className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active? "text-white": "text-primary-blue"}`}></span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
};

export default SearchManufacturer;