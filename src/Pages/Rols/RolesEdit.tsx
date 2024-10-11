import { useNavigate, useParams } from "react-router-dom";
import { Container, Form, Input } from "../../components";
import { Role, initialRoleState } from "../../types";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useAxios } from "../../Hooks";

interface RoleForm extends Role {

}

export const RolesEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { response, hasError, isLoading, get, put } = useAxios();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<RoleForm>({
    defaultValues: { ...initialRoleState }, // Inicializar con `module`
  });

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the role data when the component mounts
    get(`roles/${id}`);
  }, []);

  useEffect(() => {
    if (response) {
      // Safely parse response to match Role type
      const roleData = response as unknown as Partial<RoleForm>;

      // Populate the form fields with the fetched data
      setValue("name", roleData.name ?? initialRoleState.name);
      setValue("description", roleData.description ?? initialRoleState.description);
      setValue("status", roleData.status ?? initialRoleState.status);
       // Agregar `module` aquí
      // Handle additional fields if needed
    }
  }, [response, setValue]);

  const onSubmit = handleSubmit(async (data) => {
    // Convert Role type to a compatible format
    const roleData = {
      ...data,
    };

    // Make sure the data conforms to the expected type
    await put(`roles/${id}`, roleData);
    navigate("/admin/roles");
  });

  return (
    <Container>
      <Form
        title={"Modify Role"}
        message={"You are about to modify a role within the system. Please fill out the form below to update the role's details and permissions. Ensure that the changes accurately reflect the responsibilities and access needed for this role to maintain security and functionality."}
        onSubmit={onSubmit}
        btnreturn={() => navigate(-1)}
        response={response}
        hasError={hasError}
        isLoading={isLoading}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            id="name"
            label="Name"
            placeholder="Enter role name"
            type="text"
            register={register("name")}
            hasError={hasError}
            response={response}
            required
            liveErrors={errors}
          />
          <Input
            id="description"
            label="Description"
            placeholder="Enter role description"
            type="text"
            register={register("description")}
            hasError={hasError}
            response={response}
            required
            liveErrors={errors}
          />
          {/* Add additional fields as necessary */}
          <Input
            id="module"
            label="Module"
            placeholder="Select Roles or Users"
            type="select"
            options={[
              { label: "Roles", value: "roles" },
              { label: "Users", value: "users" },
            ]}
            register={register("module")}
            hasError={hasError}
            response={response}
            liveErrors={errors}
          />
          <div className="flex flex-col space-y-2">
            <label className="block text-slate-500 dark:text-white">Permissions</label>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="create" />
              <label htmlFor="create" className="text-slate-500 dark:text-white">CREATE</label>
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="delete" />
              <label htmlFor="delete" className="text-slate-500 dark:text-white">DELETE</label>
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="edit" />
              <label htmlFor="edit" className="text-slate-500 dark:text-white">EDIT</label>
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="view" />
              <label htmlFor="view" className="text-slate-500 dark:text-white">VIEW</label>
            </div>
          </div>
        </div>
      </Form>
    </Container>
  );
};
