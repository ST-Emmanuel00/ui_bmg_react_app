import { Children } from "../../types";
import { Skeleton } from "../Skeletons/Skeleton";

export const Container: React.FC<Children> = ({ children, isLoading }) => {
  return (
    <div className="overflow-hidden bg-white sm:border mb-2 border-slate-100 dark:border-slate-800 sm:rounded-3xl dark:bg-slate-800 md:mx-4  md:px-6 md:py-6 sm:pb-8">
      <div className="flex flex-wrap items-center dark:text-white">
        {isLoading ? <Skeleton /> : children}
      </div>
    </div>
  );
};
