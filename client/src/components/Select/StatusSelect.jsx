import { Fragment, useState, useEffect } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

import { status } from '@/utils/consts';


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export const StatusSelect = ({ isDisabled, selectedStatus, setSelectedStatus }) => {
  const activeClassName = 'relative h-12 sm:h-14 md:h-auto w-full md:min-w-[120px] lg:min-w-[110px] xl:cursor-pointer rounded-md border py-2 pl-3 pr-10 text-center shadow-sm focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600 sm:text-sm';
  const idleClassName = 'relative h-12 sm:h-14 md:h-auto w-full md:min-w-[120px] lg:min-w-[110px] cursor-default rounded-md border py-2 text-center shadow-sm focus:border-purple-600 focus:outline-none focus:ring-1 focus:ring-purple-600 sm:text-sm';

  return (
    <Listbox value={selectedStatus} onChange={setSelectedStatus} disabled={isDisabled}>
      {({ open }) => (
        <>
          {/* <div className="relative w-full sm:w-2/3 md:w-auto xl:w-3/4"> */}
          <div className="relative w-full xl:max-w-[170px]">
            <Listbox.Button className={isDisabled ? idleClassName : activeClassName}
              style={{ 
                backgroundColor: `${selectedStatus.color}`,
                border: `1px solid ${selectedStatus.color}`
              }}
            >
              <span className="flex items-center justify-center w-full">
                <span className="block truncate text-center text-base md:text-xs xl:text-sm">{selectedStatus.label}</span>
              </span>
              {isDisabled ? (
                ''
              ) : (
                <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                  <ChevronUpDownIcon className="h-5 w-5 text-gray-600" aria-hidden="true" />
                </span>
              )}

            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-[1010] mt-1 h-auto w-full rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm xl:text-sm">
                {status.map((cat) => (
                  <Listbox.Option
                    key={cat.value}
                    className={({ active }) =>
                      classNames(
                        active ? 'text-white bg-purple-600 z-50' : 'text-gray-900',
                        'relative h-12 md:h-auto xl:cursor-default select-none py-2 pl-3 pr-9 flex items-center'
                      )
                    }
                    value={cat}
                  >
                    {({ selectedStatus, active }) => (
                      <>
                        <div className="flex items-center text-base md:text-xs xl:text-sm">
                          <span
                            className={classNames(selectedStatus ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                          >
                            {cat.label}
                          </span>
                        </div>

                        {selectedStatus ? (
                          <span
                            className={classNames(
                              active ? 'text-white' : 'text-indigo-600',
                              'absolute inset-y-0 right-0 flex items-center pr-4'
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
};
