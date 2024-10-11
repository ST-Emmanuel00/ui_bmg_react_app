import { useContext } from "react";
import { User } from "../../types";
import { SocketContext } from "../../Providers";
import { AccountDropdown } from "./DropdownUser";
import { CustomizedSwitches } from "./ToggleSwitch";
import LinkNavbar from "./LinkNavbar";
import { MdErrorOutline } from "react-icons/md";
import { SearchBar } from "../Navbar/SearchBar";
import OnlineUsers from "../Table/OnlineUsers";

export const Navbar = ({
  user,
  onClick,
}: {
  user: User;
  onClick: () => void;
}) => {

  const socket = useContext(SocketContext)

  return (
    <>
      <header className="w-full px-4 bg-gray-50 dark:bg-slate-900 dark:border-slate-600">
        <div className="flex flex-col md:flex-row w-full items-center justify-between py-2">
          {/* Left side */}
          <div className="flex items-center justify-between w-full md:w-auto mb-2 md:mb-0">
            <div className="flex items-center gap-2">
              <div className="hidden md:block">
                <h5 className="font-semibold dark:text-white text-slate-950">
                  Barmanager
                </h5>
              </div>
            </div>

            {/* Mobile menu button or logo can be added here */}
          </div>

          <div className="flex flex-grow items-center justify-center">
            <SearchBar />
          </div>

          {/* Right-aligned items */}
          <div className="flex items-center gap-2">
            <ul className="flex items-center gap-4">
              <li >
                <OnlineUsers />
              </li>
              <LinkNavbar ICON={MdErrorOutline} />
              <li>
                <AccountDropdown user={user} onClick={() => { onClick(), socket?.disconnect() }} />
              </li>
              <li>
                <CustomizedSwitches />
              </li>
            </ul>
          </div>
        </div>
      </header>
    </>
  );
};
