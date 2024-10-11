import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LuClipboardEdit, LuUserPlus2 } from "react-icons/lu";
import { initialUserState, PaginationProps, User } from "../../types";
import { Table, TableActions, TableSwitch, Td, Tr } from "../../components";
import { RootState } from "../../Store";
import { useAxios } from "../../Hooks";
import { UserEdit } from "./UserEdit";
import { setPagination } from "../../features/Table/PaginatorSlice";
import { usersHeaderTitles } from "../../Utils";
import { navigation } from '../../Utils/Common/navegation';
import { useNavigate } from "react-router-dom";


export interface ColumnSortConfig {
  atributte: string,
  order: string
}

export const Users = () => {
  const dispatch = useDispatch()
  // Api
  const { response, isLoading, get } = useAxios();
  // Modal
  const [userSelected, setUserSelected] = useState<User>(initialUserState);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  // Users
  const [users, setUsers] = useState<User[]>();
  // const pagination = initialPaginationValues
  const pagination = useSelector((state: RootState) => state.pagination)

  const { page, items } = pagination;

  const { searchValue } = useSelector((state: RootState) => state.searcher)

  const { sorted: { attribute, order } } = useSelector((state: RootState) => state.orderColumns)

  useEffect(() => {

    if (searchValue !== "") {
      get(`users/search/?search=${searchValue}`);
    } else {
      get(`users/?page=${page}&items=${items}&order=${order}&attribute=${attribute}`);
    }
  }, [page, items, searchValue, attribute, order]);

  useEffect(() => {
    if (response) {
      setUsers(response?.info?.users as User[]);
      dispatch(setPagination(response?.info?.pagination as PaginationProps))
    }
  }, [response]);

  const handleEditClick = (user: User) => {
    setIsOpen(true);
    setUserSelected(user);
  };

  const navigation = useNavigate()
  return (
    <>

      <Table
        pageTitleProps={{ title: 'Users list' }}
        headerTitlesProps={{ headerTitles: usersHeaderTitles }}
        paginationProps={{ pagination }}
        isLoading={isLoading}
      >
        {users?.map((user) => (
          <Tr key={user.id}>
            <Td type="secundary" value={user.docNumber} />
            <Td type="secundary" value={`${user?.name} ${user?.lastName}`} />
            <Td type="tag" value={user?.role?.name} />
            <Td type="double" values={[{ label: "Phone", value: user.phoneNumber }, { label: "Email", value: user.email }]} />
            <Td type="double" values={[{ label: "sex", value: user.sex }, { label: "Document type", value: user.docType }]} />

            <TableSwitch id={user?.id} status={user?.status ?? true} />

            <TableActions array={[
              {
                title: 'Edit',
                icon: <LuClipboardEdit />,
                onClick: () => handleEditClick(user)
              },

              {
                title: 'Profile',
                icon: <LuUserPlus2 />,
                onClick: () => navigation(`profile/${user.id}`)
              }
            ]} />

          </Tr>
        ))}
      </Table >

      {/* Edit user */}
      < UserEdit
        postEffect={() => get(`users/?page=${page}&items=${items}`)}
        user={userSelected}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </>
  );
};