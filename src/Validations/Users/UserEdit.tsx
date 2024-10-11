import * as yup from 'yup';
import { documentTypes2, genders2 } from '../../Utils';

export const userEditSchema = yup.object().shape({
    name: yup
        .string()
        .optional()
        .max(20, 'Name must be at most 20 characters long')
        .matches(/^[A-Za-z]+$/, 'Name can only contain letters'),

    lastName: yup
        .string()
        .optional()
        .max(20, 'Last name must be a maximum of 20 characters')
        .matches(/^[A-Za-z]+$/, 'Last name can only contain letters'),

    docType: yup
        .string()
        .optional()
        .oneOf(documentTypes2, 'Invalid document type'),

    docNumber: yup
        .string()
        .optional()
        .min(8, 'Document number must be between 8 and 10 characters')
        .test('length', 'Document number must be between 8 and 10 characters', value => {
            return value ? value.length >= 8 && value.length <= 10 : false;
        }),

    sex: yup
        .string()
        .optional()
        .oneOf(genders2, 'Sex must be Male, Female, or Other'),

    email: yup
        .string()
        .email('Please enter a valid email')
        .optional(),

    phoneNumber: yup
        .string()
        .optional()
        .test('length', 'Phone number must be between 8 and 10 characters', value => {
            return value ? value.length >= 8 && value.length <= 10 : false;
        }),

    // password: yup
    //     .string()
    //     .nullable()
    //     .min(8, 'Password must be at least 8 characters long')
    //     .matches(
    //         /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    //         'Password must have at least one uppercase letter, one lowercase letter, one number, and one special character'
    //     )
    //     .optional(), // El campo de contraseña no es obligatorio para la edición

    roleId: yup
        .string()
        .optional()
});
