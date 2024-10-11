import { RoleOptions } from '../Roles/RoleOptions';
import { documentTypes, genders, status } from './Const';



export const userEditInputsInfo = () => {

    return [
        {
            id: "name",
            label: "Name",
            placeholder: "Enter your name",
            type: "text",
        },
        {
            id: "lastName",
            label: "Last name",
            placeholder: "Enter your last name",
            type: "text",
        },
        {
            id: "docType",
            label: "Document type",
            placeholder: "Enter your doc type",
            type: "select",
            options: documentTypes,
        },
        {
            id: "docNumber",
            label: "Document number",
            placeholder: "Enter your document number",
            type: "number",
        },
        {
            id: "sex",
            label: "Gender",
            placeholder: "Select your sex",
            type: "select",
            options: genders,
        },
        {
            id: "email",
            label: "Email",
            placeholder: "Enter your email",
            type: "email",
        },
        {
            id: "phoneNumber",
            label: "Phone",
            placeholder: "Enter your phone number",
            type: "number",
        },
        {
            id: "birthday",
            label: "Birthday",
            placeholder: "Enter your birthday",
            type: "date",
        },
        {
            id: "status",
            label: "Status",

            placeholder: "Enter your status",
            type: "select",
            options: status,
        },
        {
            id: "roleId",
            label: "Role",
            placeholder: "Enter your role ID",
            type: "select",
            options: RoleOptions(),
        },
        {
            id: "createdAt",
            label: "Created at",
            placeholder: "Created At",
            type: "date",
            disabled: true,
            readonly: true,
        },
        {
            id: "updatedAt",
            label: "Updated at",
            placeholder: "Updated At",
            type: "date",
            disabled: true,
            readonly: true,
        },
    ];
}
