import React from "react";
import { Searcher } from "./Searcher";
import { Paginator } from "./Pagination";

import { EmptyTable } from "./EmptyTable";
import { Children } from "../../types";
import { PageTitle, PageTitleProps } from "../common/PageTitle";
import { Container } from "../common/Container";
import { SkeletonTable } from "../Skeletons/Skeleton";
import { IoIosArrowBack } from "react-icons/io";
import { RxDashboard } from "react-icons/rx";
import { PiPicnicTableBold } from "react-icons/pi";
import { FiPlusCircle } from "react-icons/fi";
import { HeaderTitles } from "./headerTitles";
import { LinksMenu } from "../common/LinksMenu/LinksMenu";
import { LinkButton } from "../common/LinksMenu/LinkButton";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { converter, TableHeaderProps } from "../../features/Table/TitltesSlice";
import { setPagination } from "../../features/Table/PaginatorSlice";
import LinkButtonExcel from "./LinkButtonExce";
import { PaginationProps } from "../../types/Pagination.types";
import OnlineUsers from "./OnlineUsers";



interface TableProps extends Children {
  pageTitleProps: PageTitleProps;
  paginationProps: PaginationProps;
  headerTitlesProps: TableHeaderProps;
  isLoading: boolean;
}

export const Table: React.FC<TableProps> = ({
  children,
  pageTitleProps,
  paginationProps,
  headerTitlesProps,
  isLoading,
}) => {

  const hasData = React.Children.count(children) > 0;
  const { pagination } = paginationProps;
  const { headerTitles } = headerTitlesProps;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPagination(pagination));
    dispatch(converter(headerTitles));
  }, [dispatch, pagination, headerTitles]);

  const { title } = pageTitleProps;





  return (
    <>
      <LinksMenu>
        <LinkButton label="Back" icon={IoIosArrowBack} />
        <LinkButton label="Dashboard" to="/admin/" icon={RxDashboard} />
        <LinkButton label="Tables" to="/admin/tables" icon={PiPicnicTableBold} />
        <LinkButtonExcel />
        <LinkButton label="Create" to="create" type="black" icon={FiPlusCircle} />
      </LinksMenu>


      <PageTitle title={title} />

      <Container isLoading={false}>

        <div className="flex justify-center my-4 md:justify-start w-full md:my-0">
          <Searcher />
        </div>
        <div className="w-full overflow-x-auto rounded-md mx-auto">
          <table className="w-full min-w-full min-h-96 mx-auto">
            <thead className="bg-gray-50 dark:bg-gray-800 border-b-1 dark:border-slate-500">
              <tr className="bg-white dark:bg-slate-800 text-left dark:bg-meta-4">
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    className="form-checkbox h-4 w-4 text-gray-900 dark:text-gray-400"
                  />
                </td>
                <HeaderTitles />
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <SkeletonTable
                />
              ) : hasData ? (
                children
              ) : (
                <EmptyTable />  // Usa el nuevo componente
              )}
            </tbody>
          </table>
          <Paginator />
        </div>
      </Container>
    </>
  );
};
