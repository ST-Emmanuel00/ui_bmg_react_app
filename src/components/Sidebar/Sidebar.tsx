import { LuUsers, LuUserCog, LuX, LuMenu } from "react-icons/lu";
import { ModuleIconMenu } from "./ModuleIconMenu";
import { useState } from "react";
import { Link } from "react-router-dom";
import { PiPicnicTableBold } from "react-icons/pi";

import { Permission } from "../../types";
import { capitalizeFirstLetter } from "../../Utils";

interface AsideProps {
  permissions: Permission[];
}

export const Aside: React.FC<AsideProps> = ({ permissions }) => {
  const iconSize = 20;

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedModule, setSelectedModule] = useState("");

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const chooseModule = (module: string) => {
    setSelectedModule(module);
    setIsMenuOpen(false);
  };

  const moduleIcons: { [key: string]: React.ComponentType } = {
    tables: PiPicnicTableBold,
    users: LuUsers,
    roles: LuUserCog,
  };

  const modules = permissions
    ?.filter((module: Permission) => module?.module?.name !== "permissions")
    .map((module: Permission) => {
      const moduleName = module?.module?.name;
      const icon = moduleIcons[moduleName] || LuUsers; 

      return {
        to: moduleName,
        iconSize: iconSize,
        module: capitalizeFirstLetter(moduleName),
        icon: icon,
      };
    });

  return (
    <>
      <div className="lg:hidden absolute top-0 left-0 z-50 p-4">
        <button
          onClick={toggleMenu}
          className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white focus:outline-none"
        >
          {isMenuOpen ? <LuX size={iconSize} /> : <LuMenu size={iconSize} />}
        </button>
      </div>
      <aside
        className={`h-screen min-w-24tdark:bg-slate-900 overflow-y-auto duration-300 ease-linear ${
          isMenuOpen ? "absolute w-full z-50 bg-white dark:bg-slate-900" : "lg:w-24 hidden lg:block"
        }`}
      >
        <nav className="h-full py-5 flex flex-col lg:relative lg:h-auto">
          <div className="flex items-center justify-center mb-8 lg:mb-6 ">
            <Link to={"/admin"}>
              <img
                src="../src/assets/logobmg.png"
                alt="Logo"
                className="h-12 w-auto "
              />
            </Link>
          </div>
          <ul
            className={`flex-1 flex flex-col ${
              isMenuOpen ? "grid grid-cols-3 gap-y-2" : "justify-between"
            }`}
          >
            {modules.map((module, index) => (
              <ModuleIconMenu
                key={index}
                to={module.to}
                iconSize={module.iconSize}
                module={module.module}
                icon={module.icon}
                chooseModule={chooseModule}
                isSelected={selectedModule === module.module}
              />
            ))}
          </ul>
          <div className="lg:hidden absolute top-0 left-0 z-50 p-4">
            <button
              onClick={toggleMenu}
              className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white focus:outline-none"
            >
              {isMenuOpen ? (
                <LuX size={iconSize} />
              ) : (
                <LuMenu size={iconSize} />
              )}
            </button>
          </div>
        </nav>
      </aside>
    </>
  );
};
