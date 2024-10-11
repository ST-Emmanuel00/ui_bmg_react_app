import { useNavigate } from "react-router-dom";
import { Container, Form, Input } from "../../components";
import { initialRoleState, Role } from "../../types";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useAxios } from "../../Hooks";
import { yupResolver } from "@hookform/resolvers/yup";
import { rolesSchema } from "../../Validations/Roles/Roles";
import { TableActions } from "../../components/Table/TableActions";
import { TableSwitch } from "../../components/Table/TableSwitch"; // Asumiendo que las rutas son correctas

export const RolesCreate: React.FC = () => {
  const { response, hasError, isLoading, post } = useAxios();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Role>({
    resolver: yupResolver(rolesSchema),
    defaultValues: initialRoleState,
  });

  const navigate = useNavigate();

  const inputData = [
    {
      id: "name",
      label: "Role Name",
      placeholder: "Enter role name",
      type: "text",
      required: true,
    },
    {
      id: "description",
      label: "Role Description",
      placeholder: "Enter role description",
      type: "textarea",
      required: true,
    },
  ];

  const onSubmit = handleSubmit(async (data) => {
    const roleData: Record<string, unknown> = {
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    try {
      await post("roles", roleData);
      navigate("/admin/roles");
    } catch (error) {
      console.error("Error al crear rol y permisos:", error);
    }
  });

  // Datos de ejemplo para los componentes TableActions y TableSwitch
  const actionItems = [
    { title: "Edit", onClick: () => console.log("Edit clicked") },
    { title: "Delete", onClick: () => console.log("Delete clicked") },
  ];

  const roleStatus = { id: "1", status: true };

  return (
    <Container>
      <Form
        title={"Create a New Role"}
        message={"You are about to create a new role within the system. Please fill out the form below to define the role and assign the appropriate permissions. Ensure that the permissions you select align with the responsibilities of this role to maintain a secure and efficient workflow."}
        onSubmit={onSubmit}
        btnreturn={() => navigate(-1)}
        response={response}
        hasError={hasError}
        isLoading={isLoading}
        to="/admin/roles/"
      >
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg transition-colors">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {inputData.map((inputProps, index) => (
              <Input
                key={index}
                id={inputProps.id}
                label={inputProps.label}
                placeholder={inputProps.placeholder}
                type={inputProps.type}
                register={register(inputProps.id as keyof Role)}
                hasError={hasError}
                response={response}
                required={inputProps.required}
                className="bg-gray-100 dark:bg-gray-700 dark:text-white dark:border-gray-600" liveErrors={undefined}              />
            ))}
          </div>

          {/* Aquí integramos los componentes TableActions y TableSwitch */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold">Role Actions</h3>
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3">Role</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-6 py-4">Admin</td>
                  <td className="px-6 py-4">
                    <TableSwitch
                      id={roleStatus.id}
                      status={roleStatus.status}
                    />
                  </td>
                  <td className="px-6 py-4">
                    <TableActions array={actionItems} />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </Form>
    </Container>
  );
};