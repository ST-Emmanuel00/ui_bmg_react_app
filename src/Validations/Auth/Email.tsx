import * as  yup from 'yup'

export const emailSchema = yup.object().shape({
    email: yup.string().email('Ingresa un email valido').required('Requerido')
})
