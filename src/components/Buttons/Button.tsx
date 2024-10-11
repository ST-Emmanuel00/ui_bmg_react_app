import React, { ReactNode } from "react";
import { FiPlusCircle } from "react-icons/fi";
import { IoIosSend } from "react-icons/io";
import { Link } from "react-router-dom";

export interface ButtonProps {
  value: string;
  icon?: ReactNode;
  to?: string;
}

export interface SendButtonProps {
  isLoading: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  value,
  icon = <FiPlusCircle size={20} />,
  to = "create",
}) => {
  return (
    <Link
      to={to}
      className="inline-flex items-center justify-center whitespace-nowrap rounded dark:bg-[#EAB308] bg-gray-900 mr-8 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-90 sm:px-5"
    >
      {value}
      <span className="pl-2">{icon}</span>
    </Link>
  );
};

export const SendButton: React.FC<SendButtonProps> = ({ isLoading }) => {
  return (
    <div className="flex justify-end items-end h-full">
      {isLoading ? (
        <button className="inline-flex h-12 items-center justify-center gap-2.5 rounded-full bg-primary px-6 py-3 text-base font-medium text-white">
          <span>
            <svg
              className="animate-spin"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                opacity="0.5"
                cx="10"
                cy="10"
                r="9"
                stroke="white"
                strokeWidth="2"
              />
              <mask id="path-2-inside-1_2527_20936" fill="white">
                <path d="M18.4713 13.0345C18.9921 13.221 19.5707 12.9508 19.7043 12.414C20.0052 11.2042 20.078 9.94582 19.9156 8.70384C19.7099 7.12996 19.1325 5.62766 18.2311 4.32117C17.3297 3.01467 16.1303 1.94151 14.7319 1.19042C13.6285 0.597723 12.4262 0.219019 11.1884 0.0708647C10.6392 0.00512742 10.1811 0.450137 10.1706 1.00319C10.1601 1.55625 10.6018 2.00666 11.1492 2.08616C12.0689 2.21971 12.9609 2.51295 13.7841 2.95511C14.9023 3.55575 15.8615 4.41394 16.5823 5.45872C17.3031 6.50351 17.7649 7.70487 17.9294 8.96348C18.0505 9.89002 18.008 10.828 17.8063 11.7352C17.6863 12.2751 17.9506 12.848 18.4713 13.0345Z" />
              </mask>
              <path
                d="M18.4713 13.0345C18.9921 13.221 19.5707 12.9508 19.7043 12.414C20.0052 11.2042 20.078 9.94582 19.9156 8.70384C19.7099 7.12996 19.1325 5.62766 18.2311 4.32117C17.3297 3.01467 16.1303 1.94151 14.7319 1.19042C13.6285 0.597723 12.4262 0.219019 11.1884 0.0708647C10.6392 0.00512742 10.1811 0.450137 10.1706 1.00319C10.1601 1.55625 10.6018 2.00666 11.1492 2.08616C12.0689 2.21971 12.9609 2.51295 13.7841 2.95511C14.9023 3.55575 15.8615 4.41394 16.5823 5.45872C17.3031 6.50351 17.7649 7.70487 17.9294 8.96348C18.0505 9.89002 18.008 10.828 17.8063 11.7352C17.6863 12.2751 17.9506 12.848 18.4713 13.0345Z"
                stroke="white"
                strokeWidth="4"
                mask="url(#path-2-inside-1_2527_20936)"
              />
            </svg>
          </span>
          Loading...
        </button>
      ) : (
        <button
          type="submit"
          className="flex mt-6 mr-3 w-28 justify-center rounded-full bg-gradient-to-r from-yellow-500 to-yellow-600 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:from-yellow-600 hover:to-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
        >
          Send
          <IoIosSend size={24} className="ml-2 " />
        </button>
      )}
    </div>
  );
};
