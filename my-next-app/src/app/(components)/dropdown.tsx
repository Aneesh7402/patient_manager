'use client';

import { Dispatch, SetStateAction, useState } from 'react';
import { XMarkIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

interface MultiSelectDropDownProps {
  options: string[];
  selected: string[];
  setSelected: Dispatch<SetStateAction<string[]>>;
  maxOptions?: number;
  disableWidget?: boolean;
  minimumSelection?: number; // New prop to set the minimum selection requirement
}

export default function MultiSelectDropDown({
  options,
  selected,
  setSelected,
  maxOptions,
  disableWidget,
  minimumSelection = 1, // Default to 1 if not provided
}: MultiSelectDropDownProps) {
  const [open, setOpen] = useState(false);

  const toggleOption = (option: string) => {
    if (selected.includes(option)) {
      if (selected.length > minimumSelection) {
        setSelected((prev) => prev.filter((item) => item !== option));
      }
    } else if (!maxOptions || selected.length < maxOptions) {
      setSelected((prev) => [...prev, option]);
    }
  };

  const removeOption = (option: string) => {
    if (selected.length > minimumSelection) {
      setSelected((prev) => prev.filter((item) => item !== option));
    }
  };

  return (
    <div className="relative flex items-start flex-wrap gap-2 w-full">
      {/* Dropdown Toggle */}
      <div className="relative">
        <button
          className="flex items-center bg-white border border-gray-300 px-4 py-2 rounded-lg shadow-sm hover:bg-gray-100 text-gray-600 text-sm"
          onClick={() => setOpen(!open)}
        >
          Select Columns
          <ChevronDownIcon className="w-4 h-4 text-black ml-2" />
        </button>

        {/* Dropdown Content */}
        {open && (
          <div className="absolute z-10 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 p-4">
            <p className="text-sm font-medium text-gray-500 mb-2">
              Visible Columns
            </p>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {options.map((option) => {
                const isSelected = selected.includes(option);
                const isDisabled =
                  !isSelected &&
                  maxOptions !== undefined &&
                  selected.length >= maxOptions;
                return (
                  <label
                    key={option}
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      className="form-checkbox h-4 w-4 text-teal-600"
                      checked={isSelected}
                      onChange={() => toggleOption(option)}
                      disabled={isDisabled}
                    />
                    <span
                      className={`text-sm ${
                        isSelected
                          ? 'text-teal-600 font-medium'
                          : 'text-gray-700'
                      } ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      {option}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Selected badges next to button */}
      {!disableWidget && (
        <div className="flex flex-wrap gap-2 items-center">
          {selected.map((option) => (
            <span
              key={option}
              className="flex items-center bg-teal-100 text-teal-700 px-2 py-1 text-xs rounded-full"
            >
              {option}
              <button
                onClick={() => removeOption(option)}
                className={`ml-1 focus:outline-none cursor-pointer ${
                  selected.length <= minimumSelection
                    ? 'opacity-50 cursor-not-allowed'
                    : ''
                }`}
                disabled={selected.length <= minimumSelection}
              >
                <XMarkIcon className="h-4 w-4 text-teal-700 hover:text-teal-900" />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
