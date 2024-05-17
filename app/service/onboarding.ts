import { Axios } from '../helpers/axiosHelper';
import {
    ChangePasswordProps,
    ForgotPasswordProps,
    LoginProps,
    RegisterProps,
    ResetPasswordProps,
} from '../interface/onboarding';
import { getCookie, setCookie } from 'cookies-next';

let status: number;
let message: string;
let data: any;

export const signupUser = async (payload: RegisterProps) => {
    try {
        const response = await Axios({
            url: 'user/auth/register',
            method: 'post',
            body: payload,
        });

        status = 200;
        message = response.message;
        data = response.data.user;
        setCookie('token', response.token, {
            secure: true,
            maxAge: 60 * 6 * 24,
        });
    } catch (err: any) {
        status = err.response.status;
        message = err.response.data.message;
    }
    return { status, message, data };
};

export const loginUser = async (payload: LoginProps) => {
    try {
        const response = await Axios({
            url: 'user/auth/login',
            method: 'post',
            body: payload,
            withCredentials: false,
        });

        status = 200;
        message = response.message;
        data = response.data.user;
        // setCookie('token', response.token, {
        //     secure: true,
        //     httpOnly: true,
        //     partitioned: true,
        //     sameSite:''
        //     maxAge: 60 * 6 * 24,
        // });
    } catch (err: any) {
        status = err.response.status;
        message = err.response.data.message;
    }
    return { status, message, data };
};

export const forgotPassword = async (payload: ForgotPasswordProps) => {
    try {
        const response = await Axios({
            url: 'user/auth/forgot-password',
            method: 'post',
            body: payload,
        });

        status = 200;
        message = response.message;
    } catch (err: any) {
        status = err.response.status;
        message = err.response.data.message;
    }
    return { status, message };
};

export const resetPassword = async (
    payload: ResetPasswordProps,
    token: string
) => {
    try {
        const response = await Axios({
            url: `user/auth/reset-password/${token}`,
            method: 'patch',
            body: payload,
        });
        status = 200;
        message = response.message;

        data = response.data.user;
    } catch (err: any) {
        status = err.response.status;
        message = err.response.data.message;
    }
    return { status, message, data };
};

export const changePassword = async (payload: ChangePasswordProps) => {
    const token = getCookie('token');
    try {
        const response = await Axios({
            url: 'user/auth/change-password',
            method: 'patch',
            body: payload,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        status = 200;
        message = response.message;
        data = response.data;
    } catch (err: any) {
        status = err.response.status;
        message = err.response.data.message;
    }
    return { status, message };
};

export const getUserDetails = async () => {
    const token = getCookie('token');
    try {
        const response = await Axios({
            url: 'user/details',
            method: 'get',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
        });

        status = 200;
        message = response.message;
        data = response.data;
    } catch (err: any) {
        status = err.response.status;
        message = err.response.data.message;
    }
    return { status, message, data };
};
