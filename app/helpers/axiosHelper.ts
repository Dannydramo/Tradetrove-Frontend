import axios from 'axios';
import { deleteCookie } from 'cookies-next';
interface AxiosOptions {
    url: string;
    method: 'get' | 'post' | 'put' | 'delete' | 'patch';
    body?: object | null;
    headers?: object | undefined;
}

axios.defaults.baseURL = process.env.NEXT_PUBLIC_APP_API_URL;
axios.defaults.withCredentials = true;
axios.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response.status === 401) {
            deleteCookie('isLoggedIn');
            window.location.href='/login'
        }
        return Promise.reject(error);
    }
);
export const Axios = async ({ url, method, body, headers }: AxiosOptions) => {
    const res = await axios({
        method: method,
        url: url,
        data: body,
        headers: headers,
        withCredentials: true,
    });
    return res.data;
};
