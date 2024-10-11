import { Link } from "react-router-dom";
import { MdArrowRight } from "react-icons/md";
import { useAppLocation } from "../../Utils";

export const Breadcrum = () => {
  const { paths: pathSegments } = useAppLocation();

  return (
    <div className="w-full hidden sm:block">
      <div className="rounded-lg bg-gray-50 sm:px-5 dark:border-slate-900 dark:bg-slate-900">
        <ul className="flex items-center">
          <li className="flex items-center">
            <Link
              to={""}
              className="flex items-center text-base font-medium text-slate-500 hover:text-gray-700 dark:text-white dark:hover:text-gray-300"
            >
              <span className="text-sm font-semibold">Dashboard</span>
            </Link>
          </li>

          {pathSegments.map((segment, index) => {
            const isLast = index === pathSegments.length - 1;
            return (
              <li className="flex items-center" key={index}>
                {index > 0}
                <MdArrowRight className="dark:text-white" />
                <Link
                  to={`${segment}`}
                  className={`flex items-center text-base font-medium hover:text-slate-700 dark:text-white dark:hover:text-gray-300 ${
                    isLast
                      ? "text-[#EAB308] dark:text-[#EAB308]"
                      : "text-slate-500"
                  }`}
                >
                  <span className="text-sm font-semibold">{segment}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
