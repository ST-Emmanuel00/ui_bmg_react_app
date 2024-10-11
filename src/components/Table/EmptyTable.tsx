
import { useSelector } from "react-redux";
import { RootState } from "../../Store/TableStore";
import { LinkButton } from "../common/LinksMenu/LinkButton";
import { FiPlusCircle } from "react-icons/fi";
import { IoIosArrowBack } from "react-icons/io";


export const EmptyTable = () => {
  const headerTitles = useSelector((state: RootState) => state.headerTitles);

  return (
    <tr>
      <td colSpan={headerTitles.length} className="text-center py-10">
        <div className="flex flex-row items-center justify-center">
          <img
            src="/src/assets/notfound.png"
            alt="Data Not Found"
            className="w-1/4 max-w-xs"
          />
          <div className="flex flex-col items-start">
            <h2 className="font-bold text-customRed text-5xl mb-4">
              No Data Found
            </h2>
            <p className="font-normal text-slate-900 dark:text-slate-400 text-xl mb-6">
              It seems we couldn't find any data at the moment.
            </p>
            <div className="flex ">
              <LinkButton label="Back" icon={IoIosArrowBack} />
              <LinkButton label="Create" to="create" type="black" icon={FiPlusCircle} />
            </div>
          </div>
        </div>
      </td>
    </tr>
  );

};
