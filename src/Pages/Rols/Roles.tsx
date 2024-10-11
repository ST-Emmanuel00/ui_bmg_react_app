import { useEffect, useState } from "react";
import { FaEye, FaTrash } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { Pagination, Role } from "../../types";
import { useAxios } from "../../Hooks";
import { Table, Td, Tr } from "../../components";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Store/TableStore";

import { setPagination } from "../../features/Table/PaginatorSlice";



export const Roles = () => {
  const { response, hasError, isLoading, get } = useAxios();
  const navigate = useNavigate();

  const [roles, setRoles] = useState<Role[]>();

  // TRAAE LOS DEL SLICE DEL PAGINATION
  const pagination = useSelector((state: RootState) => state.pagination)


  // DESESTRUCTURACIÓN DE DATOS DEL PAGINATION
  const { page, items } = pagination;


  //USEDISPATCH PARA DESPACHAR LAS FUNCIONES QUE TRAE EL SLICE DE PAGINATION
  const dispatch = useDispatch()
 

  const { searchValue } = useSelector((state: RootState) => state.searcher)
  const { sorted } = useSelector((state: RootState) => state.orderColumns)
  const { order, attribute } = sorted

  // Fetch roles on initial load and whenever pagination, searchValue, sortAttribute, or sortOrder changes
  useEffect(() => {
    if (searchValue !== "") {
      get(`roles/search/?search=${searchValue}&order=${order}&attribute=${attribute}`);
    } else {
      get(`roles/?page=${page}&items=${items}&order=${order}&attribute=${attribute}`);
    }
  }, [page, items, searchValue, order, attribute]);

  // Update roles and pagination when response changes
  useEffect(() => {
    if (response) {
      setRoles(response?.info?.roles as Role[]);
      dispatch(setPagination(response?.info?.pagination as Pagination));
    }
  }, [response]);

  const handleEditClick = (role: Role) => {
    navigate(`/admin/roles/edit/${role.id}`);
  };

  const handleDelete = (role: Role) => {
    // Add delete logic here if needed
  };

  const headerTitlesValues =
    [
      { label: 'Name', value: 'name' },
      { label: 'Permissions', value: 'permissions' },
      { label: 'Status', value: 'docNumber' },
      { label: 'Actions', value: 'actions' }
    ]

  return (
    <>
      {/* <AlertHandler hasError={hasError} redirec={false} /> */}
      <Table
      pageTitleProps={{title: 'Roles list'}}
        

        headerTitlesProps={{ headerTitles: headerTitlesValues }}


        paginationProps={{ pagination }}
        isLoading={isLoading}
      >
        {roles?.map((role) => (
          <Tr key={role.id}>
            <Td>
              <p className="text-black dark:text-white">{role.name}</p>
            </Td>
            <Td>
              <p className="text-black dark:text-white">Admin</p>
            </Td>
            <Td>
              <p
                className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${role.status
                  ? "bg-success text-success dark:bg-green-800 dark:text-green-200"
                  : "bg-danger text-danger dark:bg-red-800 dark:text-red-200"
                  }`}
              >
                {role.status ? "Active" : "Inactive"}
              </p>
            </Td>
            <Td>
              <div className="flex items-center space-x-3.5">
                <button
                  className="hover:text-primary dark:hover:text-primary-light hidden md:inline"
                  onClick={() => handleEditClick(role)}
                >
                  <MdEdit />
                </button>
                <button
                  className="hover:text-primary dark:hover:text-primary-light hidden md:inline"
                  onClick={() => handleDelete(role)}
                >
                  <FaTrash />
                </button>
                <button className="hover:text-primary dark:hover:text-primary-light md:hidden">
                  <FaEye />
                </button>
              </div>
            </Td>
          </Tr>
        ))}
      </Table>
    </>
  );
};
