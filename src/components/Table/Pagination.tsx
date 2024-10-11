import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdArrowForwardIos, MdOutlineArrowBackIosNew } from "react-icons/md";
import { setPagination } from "../../features/Table/PaginatorSlice";
import { RootState } from "../../Store/TableStore";

export const Paginator: React.FC = () => {

  const dataPaginationSlice = useSelector((state: RootState) => state.pagination)
  const { currentCount, totalCount, page, totalPage, items } = dataPaginationSlice;

  const updatePage = (newPage: number) => {
    dispatch(setPagination({ ...dataPaginationSlice, page: newPage }));
  };

  const nextPage = () => {
    if (page < totalPage) {
      updatePage(page + 1);
    }
  };

  const prevPage = () => {
    if (page > 1) {
      updatePage(page - 1);
    }
  };

  const [value, setValue] = useState<number>(items);
  const dispatch = useDispatch();

  const handleInputConfirm = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      dispatch(setPagination({ ...dataPaginationSlice, items: value }));
    }
  };

  const handleInputBlur = () => {
    dispatch(setPagination({ ...dataPaginationSlice, items: value }));
  };

  return (
    <div className="sticky bottom-0 left-0 w-full z-10">
      <div className="flex flex-col md:flex-row items-center justify-between py-4 px-4 space-y-4 md:space-y-0">
        {/* Selected Rows Info */}
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {`${currentCount} of ${totalCount} row(s) selected.`}
        </div>

        {/* Pagination Controls */}
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex items-center space-x-2">
            <label
              htmlFor="number-input"
              className="text-sm text-gray-500 dark:text-gray-400"
            >
              Rows per page
            </label>
            <div className="relative bg-gray-200 dark:bg-gray-700 rounded-3xl flex items-center h-10 px-3">
              <input
                id="number-input"
                type="number"
                value={value}
                onChange={(e) => { setValue(parseInt(e.target.value)); updatePage(1) }}
                onKeyDown={handleInputConfirm}
                onBlur={handleInputBlur}
                placeholder="#"
                min={1}
                className="w-12 bg-transparent focus:outline-none text-gray-700 dark:text-gray-300"
              />
            </div>
          </div>

          {/* Page Info */}
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {`Page ${page} of ${totalPage}`}
          </div>

          {/* Pagination Buttons */}
          <ul className="flex items-center space-x-2">
            <li>
              <button
                onClick={prevPage}
                className="flex items-center justify-center bg-gray-200 h-10 w-10 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-300 rounded-3xl dark:hover:bg-gray-500"
              >
                <MdOutlineArrowBackIosNew />
              </button>
            </li>

            <li>
              <button
                onClick={nextPage}
                className="flex items-center justify-center bg-gray-200 h-10 w-10 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-300 rounded-3xl dark:hover:bg-gray-500"
              >
                <MdArrowForwardIos />
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
