import { useEffect, useState } from "react";
import { useAxios } from "../../Hooks";
import { Role } from "../../types/Role.types";
import { capitalizeFirstLetter } from "../Common/Capitalize";

export const RoleOptions = () => {
  const [roleList, setRoleList] = useState<Role[]>([]); // Cambia el tipo a array de roles
  const { hasError, response, get } = useAxios();

  useEffect(() => {
    get("users/role");
  }, []);

  useEffect(() => {
    if (response) {
      setRoleList(response.info.roles as Role[]);
    }
  }, [response, hasError]);

  const list = roleList.map((role) => {
    return {
      label: `${capitalizeFirstLetter(role.name)} (${role?._count?.users}) `,
      value: role.id,
    };
  });

  return list;
};
