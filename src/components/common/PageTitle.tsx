import { capitalizeFirstLetter } from "../../Utils";
import { ReactNode } from "react";

export interface PageTitleProps {
  title: string;
  children?: ReactNode;
  breadcrum?: boolean;
  message?: string;
}

export const PageTitle: React.FC<PageTitleProps> = ({
  title = "",
  message,
  children = <></>,
}) => {
  const titleFormated = capitalizeFirstLetter(title);

  return (
    <div className="sm:m-4 mx-6 sm:container">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-stroke dark:border-dark-3">
        <div className="w-full">
          <div className="flex items-center justify-start">
            <h2 className="text-xl font-medium text-slate-900 dark:text-white">
              {titleFormated}
            </h2>
          </div>

          {message && (
            <p className="text-sm text-slate-400 dark:text-dark-6">
              {message}
            </p>
          )}
        </div>
        <div className="flex flex-col items-start space-y-4 mt-4 md:mt-0 md:flex-row md:items-center md:space-y-0 md:space-x-4">
          {children}
        </div>
      </div>
    </div>
  );
};