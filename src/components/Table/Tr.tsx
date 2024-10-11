import { Children } from "../../types";

interface TrProps extends Children {
  className?: string
}

export const Tr: React.FC<TrProps> = ({ children,
  className
}) => {
  return (
    <tr className={`hover:bg-gray-50 dark:hover:bg-gray-700`}>
      <td className="px-4 py-3">
        <input
          type="checkbox"
          className= {`${className}  form-checkbox h-4 w-4 text-gray-600 dark:text-gray-400`}
        />
      </td>
      {children}
    </tr>
  );
};
