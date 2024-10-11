import React, { useState, useEffect } from 'react';

export interface CheckboxOption {
  id: number;
  label: string;
  checked: boolean;
}

interface CheckboxProps {
  onChange: (selectedOptions: CheckboxOption[]) => void;
  title: string;
}

// Datos iniciales para httpMethods y etiquetas
const httpMethodsData = [
  { id: 1, method: 'GET' },
  { id: 2, method: 'POST' },
  { id: 3, method: 'PUT' },
  { id: 4, method: 'DELETE' }
];

const exampleLabels = [
  'Example 1',
  'Example 2',
  'Example 3',
  'Example 4'
];

// Combinación de datos para inicializar el estado de httpMethods
const initialOptions: CheckboxOption[] = httpMethodsData.map((method, index) => ({
  id: method.id,
  label: exampleLabels[index] || method.method,
  checked: false
}));

const Checkbox: React.FC<CheckboxProps> = ({ onChange, title }) => {
  const [checkboxes, setCheckboxes] = useState<CheckboxOption[]>(initialOptions);
  const [isListVisible, setIsListVisible] = useState(false);

  useEffect(() => {
    const selectedOptions = checkboxes.filter(checkbox => checkbox.checked);
    onChange(selectedOptions);
  }, [checkboxes]);

  // Controla el estado de casillas seleccionadas
  const handleCheckboxChange = (index: number) => {
    const newCheckboxes = checkboxes.map((checkbox, i) =>
      i === index ? { ...checkbox, checked: !checkbox.checked } : checkbox
    );
    setCheckboxes(newCheckboxes);
  };

  const toggleListVisibility = () => {
    setIsListVisible(!isListVisible);
  };

  return (
    <div className="flex justify-center items-center h-full p-4">
      <div className={`border-2 w-full py-2 pl-10 pr-10 text-sm border-gray-300 bg-white shadow-lg relative focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500 focus:border-transparent dark:border-dark-3 dark:bg-dark-3 dark:placeholder-dark-5 ${isListVisible ? 'rounded-lg' : 'rounded-full'}`}>
        <div className="flex items-center justify-between mb-4">
          <span className="text-gray-800 font-semibold ">{title}</span>
          <svg
            className={`w-5 h-5 text-gray-700 cursor-pointer transform mr-1 ${isListVisible ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            onClick={toggleListVisibility}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
        <div className={`${isListVisible ? 'block' : 'hidden'} overflow-hidden`}>
          {checkboxes.map((option, index) => (
            <div key={index} className="flex items-center mb-2 p-2 rounded-md hover:bg-gray-100">
              <input
                type="checkbox"
                checked={option.checked}
                onChange={() => handleCheckboxChange(index)}
                className={`appearance-none w-4 h-4 border-2 rounded-md ${option.checked ? 'bg-blue-500 border-blue-500' : 'border-gray-400'} focus:outline-none`}
              />
              <label className="ml-4 text-gray-700 cursor-pointer">{option.label}</label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Checkbox;
