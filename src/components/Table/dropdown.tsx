import React, { useState, useCallback } from 'react';
import { FaRegEyeSlash } from 'react-icons/fa';
import { IoEyeSharp } from 'react-icons/io5';

interface DropdownProps {
    options: string[];
    onSelect: (option: string) => void;
}

const DropdownOption: React.FC<{
    option: string;
    isSelected: boolean;
    onSelect: (option: string) => void;
}> = ({ option, isSelected, onSelect }) => (

    <button
        onClick={() => onSelect(option)}
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left w-full"
    >

        {isSelected ? (
            <IoEyeSharp className="mr-2 h-5 w-5 text-gray-500 inline-block" />
        ) : (
            <FaRegEyeSlash className="mr-2 h-5 w-5 text-gray-500 inline-block" />
        )}
        {option}
    </button>
);

const Dropdown: React.FC<DropdownProps> = ({ options, onSelect }) => {

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const [iconStates, setIconStates] = useState<Record<string, boolean>>(
        options.reduce((acc, option) => ({ ...acc, [option]: true }), {})
    );

    const handleToggle = useCallback(() => {
        setIsOpen(prev => !prev);
    }, []);
   

    const handleSelect = useCallback((option: string) => {
        onSelect(option);
        setIsOpen(false);
    }, [onSelect]);
    

    const toggleIcon = useCallback((option: string) => {
        setIconStates(prev => {
            const newState = !prev[option];
            return {
                ...prev,
                [option]: newState,
            };
        });
    }, []);
   

    return (
        <div className="relative inline-block">
            <button
                type="button"
                className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-gray-300 hover:bg-gray-50 focus:outline-none"
                onClick={handleToggle}
            >
                <IoEyeSharp className="mr-2 h-5 w-5 text-gray-500" />
                View
                <svg
                    className="-mr-1 ml-2 h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                    />
¿                </svg>
            </button>

            {isOpen && (
                <div className="absolute right-0 z-10 mt-1 w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">

                    <div className="py-1">
                        <span className="px-2 py-1.5 text-sm font-semibold">
                            <b>Toggle Columns</b>
                        </span>

                        {options.map((option, index) =>
                            option === 'Actions' ? null : (
                                <DropdownOption
                                    key={index}
                                    option={option}
                                    isSelected={iconStates[option]}
                                    onSelect={(opt: string) => {
                                        handleSelect(opt);
                                        toggleIcon(opt);
                                    }}
                                />
                            )
                        )}
                       
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dropdown;
