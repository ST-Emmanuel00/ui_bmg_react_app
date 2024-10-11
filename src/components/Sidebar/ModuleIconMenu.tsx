import { ElementType } from "react";
import { BsPeopleFill } from "react-icons/bs";
import { Link } from "react-router-dom";

interface ModuleIconMenuProps {
  icon: ElementType;
  to: string;
  module: string;
  iconSize: number;
  chooseModule: (module: string) => void;
  isSelected: boolean;
}

export const ModuleIconMenu: React.FC<ModuleIconMenuProps> = (info) => {
  const {
    icon: Icon = BsPeopleFill,
    iconSize = 15,
    to = "profile",
    module,
    chooseModule,
    isSelected,
  } = info;

  const choseModuleIcon = () => {
    chooseModule(module);
  };

  return (
    <Link to={`${to}`} className="w-full my-2">
      <div className="w-full flex justify-center">
        <div className="mb-4">
          <div className="group relative inline-block">
            <div
              className={`relative rounded flex flex-col items-center justify-center text-base transition duration-300 ${
                isSelected ? "text-[#EAB308]" : "text-slate-600"
              } group-hover:text-[#EAB308] focus:text-[#EAB308]`}
              onClick={choseModuleIcon}
            >
              <Icon
                size={iconSize}
                className={`transition duration-300 ${
                  isSelected ? "text-[#EAB308]" : "text-slate-600"
                } group-hover:text-[#EAB308]`}
              />
              <p className="mt-1 text-sm text-center">{module}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
