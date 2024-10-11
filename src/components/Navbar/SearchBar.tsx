import React, { useRef, useState, useEffect } from "react";
import { LuSearch } from "react-icons/lu";
import { LuUserCog, LuFileText } from "react-icons/lu"; 
import { useAxios } from "../../Hooks";
import { User, Role, Module } from "../../types"; 
import {ExplorerItem} from "./ExplorerItem";

export const SearchBar: React.FC = () => {
  const [state, setState] = useState<{
    value: string;
    users: User[];
    roles: Role[];
    modules: Module[];
  }>({
    value: "",
    users: [],
    roles: [],
    modules: [],
  });

  const { response, post } = useAxios();
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // if (state.value.length > 1) {
      post(`explorer/all/?searchTerm=${state.value}`).catch(error => console.error("Error fetching data:", error));
    // }
  }, [state.value, post]);

  useEffect(() => {
    if (response?.info) {
      setState(prevState => ({
        ...prevState,
        users: response.info.users as User[],
        roles: response.info.roles as Role[],
        modules: response.info.modules as Module[],
      }));
    }
  }, [response]);


  const handleFocus = () => setShowSuggestions(true);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(e.target as Node) &&
        !inputRef.current?.contains(e.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (value: string) => {
    setState(prevState => ({ ...prevState, value }));
    setShowSuggestions(false); 
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'p') {
        e.preventDefault(); 
        inputRef.current?.focus(); 
      }
    };
    
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="flex justify-center w-full">
      <div className="relative w-full sm:w-3/4 md:w-4/5 lg:w-3/5">
        <div
          className="relative border bg-white dark:bg-gray-700 dark:border-none w-full h-10 flex items-center rounded-3xl"
          title="Ctrl + P to open search"
        >
          <button
            type="button"
            className="absolute top-1/2 left-3 transform -translate-y-1/2"
            aria-label="Search"
          >
            <LuSearch className="text-slate-400 dark:text-white" />
          </button>
          <input
            type="text"
            placeholder="Search all"
            value={state.value}
            className="w-full bg-transparent pl-10 pr-4 focus:outline-none border-none text-black dark:text-white"
            onChange={(e) => setState(prevState => ({ ...prevState, value: e.target.value }))}
            onFocus={handleFocus}
            ref={inputRef}
            autoComplete="off"
          />
        </div>

        {showSuggestions && (
          <div ref={suggestionsRef} tabIndex={-1}>
            <div className="absolute w-full mt-2 bg-white dark:bg-gray-700 border rounded-3xl shadow-lg z-50">
              <ul className="p-4 space-y-4 max-h-60 overflow-y-auto">

                {/* Users Section */}
                {state.users.length > 0 && (
                  <>
                    <li className="font-semibold text-gray-400">
                      Users
                    </li>
                    {state.users.map((user: User) => (
                      <ExplorerItem
                        key={user.id}
                        to={`/admin/users/profile/${user.id}`}
                        title={`${user.name} ${user.lastName}`}
                        description={user?.role?.name}
                        id={user.id}
                      />
                    ))}
                  </>
                )}
                {/* Roles Section */}
                {state.roles.length > 0 && (
                  <>
                    <li className="font-semibold text-gray-400 ">
                      Roles
                    </li>
                    {state.roles.map((role: Role) => (
                      <ExplorerItem
                      Icon={LuUserCog}
                        key={role.id}
                        to={`/admin/roles/${role.id}`}
                        title={role.name}
                        description={role.description}
                        id={role.id}
                      />
                    ))}
                  </>
                )}


                {/* Modules Section */}
                {state.modules.length > 0 && (
                  <>
                    <li className="font-semibold text-gray-400 ">
                      Modules
                    </li>
                    {state.modules.map((module: Module) => (
                      <ExplorerItem
                      Icon={LuFileText}
                        key={module.id}
                        to={module.name}
                        title={module.name}
                        id={module.id}
                      />
                    ))}
                  </>
                )}
              </ul>
            </div>
          </div>
        )}

        
      </div>
    </div>
  );
};
