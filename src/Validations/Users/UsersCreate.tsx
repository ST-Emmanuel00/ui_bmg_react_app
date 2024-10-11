import * as  yup from 'yup'
import { documentTypes2, genders2 } from '../../Utils'

const sixteenYearsAgo = new Date();
sixteenYearsAgo.setFullYear(sixteenYearsAgo.getFullYear() - 16);

export const userSchema = yup.object().shape({

    name: yup
        .string()
        .required('Name is required')
        .max(20, 'Name must be at most 20 character long')
        .matches(/^[A-Za-z]+$/, 'Name can only contain letters'),

    lastName: yup
        .string()
        .required('Last name is required')
        .max(20, 'Last name must be a maximum of 20 characters')
        .matches(/^[A-Za-z]+$/, 'Last name can only contain letters'),

    docType: yup
        .string()
        .required('Document type is required')
        .oneOf(documentTypes2),

    docNumber: yup
        .string()
        .required('Document number is required')
        .min(8, 'Document number must be between 8 and 10 characters')
        .test('lenght', 'Document number must be between 8 and 10 characters', value => {
            return value ? value.length >= 8 && value.length <= 10 : false
        }),

    sex: yup
        .string()
        .required('Sex is required')
        .oneOf(genders2, 'Sex must be Male, Female, or Other'),

    email: yup.string()
        .email('Ingresa un email valido')
        .required('Requerido'),

    phoneNumber: yup
        .string()
        .required('Phone number is required')
        .test('lenght', 'Phone number must be 10 characters', value => {
            return value ? value.length >= 8 && value.length <= 10 : false
        }),

    password: yup
        .string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters long')
        .matches(
            /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'Password must have at least one uppercase letter, one lowercase letter, one number, and one special character'
        ),

    birthday: yup
        .date()
        .required('Birthday is required')
        .max(new Date(), 'Birthday cannot be in the future')
        .min(sixteenYearsAgo, 'You must be at least 16 years old'),


    passwordConfirmation: yup
        .string()
        .oneOf([yup.ref('password')], 'Passwords must match')
        .required('Confirm password is required'),

    roleId: yup
        .string()
        .required('roleId is required')


})

