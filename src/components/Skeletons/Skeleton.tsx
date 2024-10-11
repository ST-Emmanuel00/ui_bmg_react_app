import { useSelector } from "react-redux";
import { Td } from "../Table/Td";
import { Tr } from "../Table/Tr";



import { HeaderTitlesProps } from "../../features/Table/TitltesSlice";
import { RootState } from "../../Store/TableStore";

export const Skeleton = () => {
  return (
    <div className="container">
      <div className="mx-auto w-full space-y-4 sm:space-y-4 sm:px-4 sm:mt-4 mt-4 mx-4">
        <div className="h-3 w-2/6 rounded-full bg-gradient-to-r from-slate-100 to-slate-100 dark:from-slate-600 dark:to-slate-600"></div>
        <div className="h-3 w-3/6 rounded-full bg-gradient-to-r from-slate-100 to-slate-100 dark:from-slate-600 dark:to-slate-600"></div>
        <div className="h-3 w-2/5 rounded-full bg-gradient-to-r from-slate-100 to-slate-100 dark:from-slate-600 dark:to-slate-600"></div>
        <div className="h-3 w-2/6 rounded-full bg-gradient-to-r from-slate-100 to-slate-100 dark:from-slate-600 dark:to-slate-600"></div>
      </div>
    </div>
  );
};

export const SkeletonTable: React.FC = ({ }) => {
  const headerTitlesData = useSelector((state: RootState) => state.headerTitles as HeaderTitlesProps[])
  return (
    <>
      {Array.from({ length: 4 }).map((_, rowIndex) => (
        <Tr className="h-4 bg-slate-900 rounded animate-pulse" key={rowIndex}>
          {
            headerTitlesData.map((title, colIndex) => (
              <Td key={colIndex}>
                <h1 className="w-1/2 h-3 bg-slate-200 rounded animate-pulse"></h1>
              </Td>
            ))
          }
        </Tr >
      ))}
    </>
  );
};