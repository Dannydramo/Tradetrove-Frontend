import axios from 'axios';

interface AxiosOptions {
    url: string;
    method: 'get' | 'post' | 'put' | 'delete' | 'patch';
    body?: object | null;
    headers?: object | undefined;
    withCredentials?: boolean;
}

axios.defaults.baseURL = process.env.NEXT_PUBLIC_APP_API_URL;

export const Axios = async ({
    url,
    method,
    body,
    headers,
    withCredentials = true,
}: AxiosOptions) => {
    const res = await axios({
        method: method,
        url: url,
        data: body,
        headers: headers,
        withCredentials: withCredentials,
    });
    return res.data;
};
