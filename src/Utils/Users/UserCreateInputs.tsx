import { RoleOptions } from "../Roles/RoleOptions";
import { documentTypes, genders } from "./Const";


export const userCreateInputsInfo = () => {
  return  [
    {
      id: "name",
      label: "Name",
      placeholder: "Enter your name",
      type: "text",
      required: true,
    },
    {
      id: "lastName",
      label: "Last name",
      placeholder: "Enter your last name",
      type: "text",
      required: true,
    },
    {
      id: "docType",
      label: "Document type",
      placeholder: "Enter your doc type",
      type: "select",
      options: documentTypes,
      required: true,
    },
    {
      id: "docNumber",
      label: "Document number",
      placeholder: "Enter your document number",
      type: "number",
      required: true,
    },
    {
      id: "sex",
      label: "Gender",
      placeholder: "Select your sex",
      type: "select",
      options: genders,
      required: true,
    },
    {
      id: "birthday",
      label: "Birthday",
      placeholder: "Enter your birthday",
      type: "date",
      required: true,
    },
    {
      id: "email",
      label: "Email",
      placeholder: "Enter your email",
      type: "email",
      required: true,
    },
    {
      id: "phoneNumber",
      label: "Phone",
      placeholder: "Enter your phone number",
      type: "text",
      required: true,
    },
    {
      id: "roleId",
      label: "Role",
      placeholder: "Enter your role ID",
      type: "select",
      options: RoleOptions(),
      required: true,
    },
    {
      id: "password",
      label: "Password",
      placeholder: "Enter your password",
      type: "password",
      required: true,
    },
    {
      id: "passwordConfirmation",
      label: "Confirm Password",
      placeholder: "Confirm your password",
      type: "password",
      required: true,
    },
  ];
}

