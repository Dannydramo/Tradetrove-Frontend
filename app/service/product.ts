import { Axios } from '../helpers/axiosHelper';

let status: number;
let message: string;
let data: any;

export const getProductDetails = async (productId: string) => {
    try {
        const response = await Axios({
            url: `/product/${productId}`,
            method: 'get',
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

export const getProducts = async () => {
    try {
        const response = await Axios({
            url: '/product/random-products',
            method: 'get',
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

export const getLatestProducts = async () => {
    try {
        const response = await Axios({
            url: '/product/latest',
            method: 'get',
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