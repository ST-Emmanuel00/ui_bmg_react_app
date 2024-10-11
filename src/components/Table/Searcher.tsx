import { LuSearch } from "react-icons/lu";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchValue } from "../../features/Table/SearcherSlice";
import { RootState } from "../../Store/TableStore";

export const Searcher: React.FC = ({
 

}) => {

  const { searchValue } = useSelector((state: RootState) => state.searcher)

  const [value, setValue] = useState(searchValue);
  const inputRef = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch()

  const handleInputConfirm = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {

      dispatch(setSearchValue(value))
      // setSearchValue(value);
    }
  };

  const handleInputBlur = () => {
    dispatch(setSearchValue(value));
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "b") {
        e.preventDefault();
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="w-full max-w-20">
      <div className="relative border bg-white dark:bg-gray-700 dark:border-none w-full min-w-60 h-10 flex items-center rounded-3xl">
        <button
          type="button"
          className="absolute top-1/2 left-3 transform -translate-y-1/2"
          aria-label="Search"
        >
          <LuSearch className="text-slate-400 dark:text-white" />
        </button>
        <input
          type="text"
          placeholder="Search"
          value={value}
          className="w-full bg-transparent pl-9 pr-4 focus:outline-none border-none text-black dark:text-white"
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleInputConfirm}
          onBlur={handleInputBlur}
          ref={inputRef}
        />
      </div>
    </div>
  );
};
