"use client";

import { Fragment, useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Listbox, Transition } from "@headlessui/react";

import { CustomFilterProps } from "@/types";
import { updateSearchParamsClient } from "@/utils";

export default function CustomFilter({ title, options }: CustomFilterProps) {
  const router = useRouter();
  const [selected, setSelected] = useState(options[0]);

  // Синхронизируем состояние с URL параметрами при монтировании компонента
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const urlValue = searchParams.get(title.toLowerCase());
    
    if (urlValue) {
      const option = options.find(opt => opt.value === urlValue);
      if (option) setSelected(option);
    }
  }, [title, options]);

  const handleUpdateParams = (value: string) => {
    const newPathName = updateSearchParamsClient({ [title.toLowerCase()]: value });
    router.push(newPathName, { scroll: false });
  };

  return (
    <div className='w-fit'>
      <Listbox
        value={selected}
        onChange={(e) => {
          setSelected(e);
          handleUpdateParams(e.value);
        }}
      >
        <div className='relative w-fit z-10'>
          <Listbox.Button className='custom-filter__btn'>
            <span className='block truncate'>{selected.title}</span>
            <Image src='/chevron-up-down.svg' width={20} height={20} className='ml-4 object-contain' alt='chevron_up-down' />
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave='transition ease-in duration-100'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Listbox.Options className='custom-filter__options'>
              {options.map((option) => (
                <Listbox.Option
                  key={option.title}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 px-4 ${
                      active ? "bg-[#2B59FF] text-white" : "text-gray-900"
                    }`
                  }
                  value={option}
                >
                  {({ selected }) => (
                    <>
                      <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`} >
                        {option.title}
                      </span>
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}