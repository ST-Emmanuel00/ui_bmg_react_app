import { useEffect, useRef, useState } from "react";
import { IoPersonOutline, IoSettingsOutline } from "react-icons/io5";
import { SlLogout } from "react-icons/sl";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { User } from "../../types";
import { capitalizeFirstLetter } from "../../Utils";
import { LuUserCircle, LuUserCircle2 } from "react-icons/lu";

export const AccountDropdown = ({
  user,
  onClick,
}: {
  user: User;
  onClick: () => void;
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const dropdown = useRef<HTMLDivElement>(null);
  const [fullname, setFullname] = useState<string>("");
  const [role, setRole] = useState<string>("");

  useEffect(() => {
    if (user) {
      setFullname(capitalizeFirstLetter(`${user.name} ${user.lastName}`));
      setRole(capitalizeFirstLetter(user?.role?.name ?? "") );
    }
  }, [user]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdown.current &&
        !dropdown.current.contains(event.target as Node) &&
        !trigger.current?.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <section>
      <div className="container">
        <div className="flex justify-center">
          <div className="relative inline-block">
            <button
              ref={trigger}
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="inline-flex  text-slate-500  dark:text-slate-400 items-center justify-center rounded-lg px-4 py-2 text-base font-medium text-dark dark:border-gray-600 dark:bg-slate-900"
            >
              <LuUserCircle2
                size={24}
                className=" dark:text-white mr-2"
              />
              <span className="hidden md:block text-black  dark:text-slate-400">{fullname}</span>
            </button>
            <div
              ref={dropdown}
              className={`absolute mt-4 right-0 top-full w-[240px] divide-y divide-stroke overflow-hidden rounded-lg bg-white dark:divide-gray-600 dark:bg-gray-700 ${
                dropdownOpen ? "block z-50" : "hidden"
              }`}
            >
              <div className="px-4 py-3">
                <p className="text-sm  font-semibold text-black dark:text-white">
                  {role}
                </p>
              </div>
              <div>
                <Link
                  to="/admin/profile"
                  className="flex w-full items-center gap-5 px-4 py-2.5 text-sm font-medium text-dark hover:bg-gray-50 dark:text-white dark:hover:bg-gray-600"
                >
                  <IoPersonOutline size={20} className="text-black dark:text-white" />
                  <span className="flex items-center text-black gap-2 dark:text-slate-400">View profile</span>
                </Link>

                <a
                  href="#0"
                  className="flex w-full items-center gap-5 px-4 py-2.5 text-sm font-medium text-dark hover:bg-gray-50 dark:text-white dark:hover:bg-gray-600"
                >
                  <IoSettingsOutline size={20} className="text-black dark:text-white " />
                  <span className="flex text-black items-center gap-2 dark:text-slate-400">Settings</span>
                </a>
              </div>
              <div>
                <button
                  onClick={onClick}
                  className="flex w-full items-center gap-5 px-4 py-2.5 text-sm font-medium text-dark hover:bg-gray-50 dark:text-white dark:hover:bg-gray-600"
                >
                  <SlLogout size={20} className="text-black dark:text-white" />
                  <span className="flex text-black items-center gap-2 dark:text-slate-400">Log out</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
