import { Children } from "../../../types";

export const LinksMenu: React.FC<Children> = ({ children }) => {
  return (
    <div className="w-full my-4 lg:my-0">
      <div className="rounded-lg">
        <ul className="flex items-center space-x-2 overflow-x-auto scrollbar-hide w-full lg:justify-start">
          <li className="flex items-center">
            {children}
          </li>
        </ul>
      </div>
    </div>
  );
};
