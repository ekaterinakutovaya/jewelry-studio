import { Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

import { categories } from '@/utils/consts';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export const CategorySelect = ({ isDisabled, selectedCategory, setSelectedCategory }) => {  

  const activeClassName = 'relative h-12 sm:h-14 md:h-auto w-full md:min-w-[120px] lg:min-w-[110px] xl:cursor-pointer rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-center shadow-sm focus:border-purple-600 focus:outline-none focus:ring-1 focus:ring-purple-600 sm:text-sm';
  const idleClassName = 'relative h-12 sm:h-14 md:h-auto w-full md:min-w-[120px] lg:min-w-[110px] xl:min-w-[130px] cursor-default rounded-md border border-gray-300 bg-white py-2 text-center shadow-sm focus:border-purple-600 focus:outline-none focus:ring-1 focus:ring-purple-600';

  return (
    <Listbox value={selectedCategory} onChange={setSelectedCategory} disabled={isDisabled}>
      { ({open}) => (
        <>
          <div className="relative w-full  xl:max-w-[170px]">
            <Listbox.Button className={isDisabled ? idleClassName : activeClassName}>
              <span className="flex items-center justify-center w-full">
                <span className="block truncate text-center text-base md:text-xs xl:text-sm">{selectedCategory.label}</span>
              </span>
              {isDisabled ? (
              ''
            ) : (
              <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
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
              <Listbox.Options className="absolute z-[1010] mt-1 h-auto w-full rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {categories.map(category => (
                  <Listbox.Option
                    key={category.value}
                    className={ ({active}) =>
                      classNames(
                        active ? 'text-white bg-purple-600' : 'text-gray-900',
                        'relative z-50 h-12 md:h-auto xl:cursor-pointer select-none py-2 pl-3 pr-9 flex items-center'
                      )
                    }
                    value={category}
                  >
                    {({ selectedCategory, active }) => (
                      <>
                        <div className="flex items-center text-base md:text-xs xl:text-sm z-50">
                          <span
                            className={classNames(selectedCategory ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                          >
                            {category.label}
                          </span>
                        </div>

                        {selectedCategory ? (
                          <span
                            className={classNames(
                              active ? 'text-white' : 'text-purple-600',
                              'absolute z-50 inset-y-0 right-0 flex items-center pr-4'
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
      )
      }
    </Listbox>
  )
};
