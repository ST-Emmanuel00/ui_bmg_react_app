import { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";
import { AiFillAlert } from "react-icons/ai";
import { ApiResponse, ErrorApiResponse } from "../../types";
import { OptionsProps } from "../../Utils";

export interface InputProps<T extends FieldValues> {
  id: string;
  label?: string;
  hasError?: AxiosError | null;
  response?: ApiResponse | null;
  placeholder: string;
  type: string;
  options?: OptionsProps[];
  className?: string;
  disabled?: boolean;
  icon?: React.ReactNode;
  readonly?: boolean;
  required?: boolean;
  register: ReturnType<UseFormRegister<T>>;
  liveErrors: any; // Aquí se espera que errors sea un objeto con los errores
}

export const Input = <T extends FieldValues>(props: InputProps<T>) => {
  const {
    id,
    type,
    label,
    placeholder,
    className,
    disabled = false,
    required = true,
    icon,
    options,
    readonly = false,
    register,
    hasError,
    response,
    liveErrors,
  } = props;


  const [errors, setErrors] = useState<ErrorApiResponse | null>(null);
  const [success, setSuccess] = useState<ApiResponse | null>(null);
  const [errorMessage, setErrorMessage] = useState("");


  useEffect(() => {
    if (liveErrors) {

      setErrorMessage(liveErrors[id]?.message)
    }
  }, [register])

  useEffect(() => {
    if (hasError) {
      setErrors(hasError.response?.data as ErrorApiResponse);
    }
    else if (response) {
      setSuccess(response as ApiResponse);
      setErrors(null);
      setErrorMessage("");
    }
  }, [hasError, response]);

  useEffect(() => {

    errors?.errors.forEach((error: any) => {
      if (error.path.includes(id)) {
        setErrorMessage(errors.errors[0].message);
      }
    });
  }, [errors]);

  //   if (errors?.errors) {
  //     const matchingError = errors.errors.find((error) => error.path === id);
  //     if (matchingError) {
  //       setErrorMessage(matchingError.message);
  //     }
  //   }
  // }, [errors, id]);

  const baseInputClasses = `${className} ${errorMessage ? "border-red-600" : ""} text-gray-500 w-full py-2 pl-10 pr-10 text-sm border rounded-full focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500`;

  console.log('options', options)

  const renderInput = () => {
    switch (type) {
      case "select":
        return (
          <select
            id={id}
            disabled={disabled}
            className={baseInputClasses}
            {...register}
          >
            {Array.isArray(options) && options.map(({ label, value }) => (
              <option key={label} value={value}>
                {label}
              </option>
            ))}

          </select>
        );

      case "textArea":
        return (
          <textarea
            id={id}
            placeholder={placeholder}
            readOnly={readonly}
            required={required}
            className={`${baseInputClasses} resize-none`}
            {...register}
          />
        );

      case "date":
        return (
          <input
            type="date"
            id={id}
            placeholder={placeholder}
            readOnly={readonly}
            disabled={disabled}
            className={baseInputClasses}
            {...register}
          />
        );
      case "none":
        return null;

      default:
        return (
          <input
            type={type}
            id={id}
            placeholder={placeholder}
            readOnly={readonly}
            disabled={disabled}
            className={baseInputClasses}
            {...register}
          />
        );
    }
  };

  return (
    <div className="container space-y-7">
      <div className="w-full space-y-7">
        <div>
          <label
            htmlFor={id}
            className="pl-2 py-1 block  text-slate-800 dark:text-white"
          >
            {label}
          </label>
          <div className="relative">
            <span
              className={`absolute  left-0 top-0 flex h-full w-12 items-center justify-center text-red pointer-events-none ${errorMessage ? "border-red-600" : ""
                }`}
            >
              {icon}
            </span>
            {renderInput()}
            <span
              className={`absolute right-0 top-0 flex h-full w-12 items-center justify-center text-red pointer-events-none ${errorMessage ? "border-red-600" : ""
                }`}
            >
              {errorMessage ? <AiFillAlert className="text-gray-900" /> : ""}
            </span>
          </div>

          {errorMessage && <p className={`text-sm ${errorMessage ? "text-red-800" : ""} ml-3`}>
            {errorMessage}
          </p>}

        </div>
      </div>
    </div>
  );
};
