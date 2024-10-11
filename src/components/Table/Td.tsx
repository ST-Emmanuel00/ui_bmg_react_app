import { ReactNode } from "react";
import { capitalizeFirstLetter } from "../../Utils";

export type RowType = "tag" | "bold" | "secundary" | "double";

interface Values {
  label: string;
  value: string; 
}

interface TdProps {
  type?: RowType;
  value?: string;
  children?: ReactNode
  values?: Values[]; 
}

export const Td: React.FC<TdProps> = ({
  value,
  type = "secundary",
  values = [], 
  children,
}) => {
  return (
    <td className="px-4 py-3 text-sm sm:text-base">
      {type === "tag" && (
        <span
          className="inline-block bg-gray-200 text-gray-800 text-xs font-semibold rounded-full px-2.5 py-0.5
         dark:bg-gray-700 dark:text-gray-400 truncate"
        >
          {value && capitalizeFirstLetter(value)}
        </span>
      )}

      {type === "bold" && (
        <span className="font-medium text-gray-900 dark:text-gray-300 truncate">
          {value && capitalizeFirstLetter(value)}
        </span>
      )}

      {type === "secundary" && (
        <p className="text-gray-400 dark:text-gray-400 truncate">
          {value && capitalizeFirstLetter(value)}
          {children}
        </p>
      )}

      {type === "double" && (
        <div>
          
          <div className="flex flex-col space-y-1">
            {values.map(({ label, value }) => (
              <span key={label} className="text-sm text-gray-400 dark:text-gray-400">
                {`${capitalizeFirstLetter(label)}: ${capitalizeFirstLetter(value)}`}
              </span>
            ))}
          </div>
        </div>
      )}
    </td>
  );
};
