import * as Yup from 'yup';

export const registerValidationSchema = Yup.object().shape({
    userName: Yup.string().required('User Name is required'),
    email: Yup.string().required('Email is required').email('Email is invalid'),
    password: Yup.string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters'),
    confirmPassword: Yup.string()
        .required('Confirm Password is required')
        .oneOf([Yup.ref('password'), null!], 'Passwords must match'),
});

export const loginValidationSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email is invalid'),
    password: Yup.string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters'),
});

export const forgotPasswordValidationSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email is invalid'),
});
export const resetPasswordValidationSchema = Yup.object().shape({
    password: Yup.string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters'),
    confirmPassword: Yup.string().required('Confirm Password is required'),
});
export const changePasswordValidationSchema = Yup.object().shape({
    password: Yup.string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters'),
    newPassword: Yup.string()
        .required('New Password is required')
        .min(6, 'New Password must be at least 6 characters'),
    confirmNewPassword: Yup.string()
        .required('Confirm New Password is required')
        .oneOf([Yup.ref('newPassword'), null!], 'Passwords must match'),
});
