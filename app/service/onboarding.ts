import { Axios } from '../helpers/axiosHelper';
import { LoginProps, RegisterProps } from '../interface/onboarding';
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

export const getUserDetails = async () => {
    const token = getCookie('token');
    try {
        const response = await Axios({
            url: 'user/details',
            method: 'get',
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
    return { status, message, data };
};
