import React, { ElementType, ReactElement, ReactNode } from "react";
import { Link } from 'react-router-dom';
import { LuUsers } from "react-icons/lu";
import { capitalizeFirstLetter } from "../../Utils"

interface ExplorerItemProps {
  to: string;
  id: string;
  title: string;
  description?: string;
  Icon?: ElementType
  OnelineIcon?: ReactNode
  
}

export const ExplorerItem: React.FC<ExplorerItemProps> = ({ to, OnelineIcon, id, title, description, Icon = LuUsers }) => {
  return (
    <Link to={to} key={id}>
      <li className="py-2 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700 transition duration-200">
        
        <span className="flex items-center">
          {OnelineIcon ? OnelineIcon :

            <Icon className="mr-3 text-gray-400" size={20} />
          }

          <span className="flex flex-col">
            <span className="font-normal">{capitalizeFirstLetter(title)}</span>
            {description && <span className="text-gray-500 text-xs">{capitalizeFirstLetter(description)}</span>}
          </span>
        </span>
      </li>
    </Link>
  );
};
