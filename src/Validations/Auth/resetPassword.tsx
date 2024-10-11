import * as yup from 'yup';
export const resetPaswordSchema = yup.object().shape({
    password: yup.string().required("New password is required").min(6, "Password must be at least 6 characters long"),
    passwordConfirmation: yup.string().oneOf([yup.ref("newPassword")], "Passwords must match").required("Confirm password is required"),
  });