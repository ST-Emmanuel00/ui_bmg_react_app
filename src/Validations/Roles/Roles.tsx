import * as  yup from 'yup'

export const rolesSchema = yup.object().shape({
    name: yup.string().required('Name is required').max(20, 'Name must be at most 20 character long')
        .matches(/^[A-Za-z]+$/, 'Name can only contain letters'),

    description: yup.string().required('Description is required').max(255, 'Description must be at most 255 characters long').matches(/^[A-Za-z0-9\s.,_\-(){}\[\]]+$/, 'Description can only contain letters and common punctuation')
})

