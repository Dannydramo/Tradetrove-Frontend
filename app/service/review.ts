import { Axios } from '../helpers/axiosHelper';
import { getCookie } from 'cookies-next';

let status: number;
let message: string;
let data: any;

export const getProductReviews = async (productId: string) => {
    try {
        const response = await Axios({
            url: `/review/get/${productId}`,
            method: 'get',
            withCredentials: false,
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

export const postReview = async (payload: {
    comment: string;
    rating: number;
    productId: string;
}) => {
    const token = getCookie('token');
    try {
        const response = await Axios({
            url: `/review/create`,
            method: 'post',
            body: payload,
            headers: { Authorization: `Bearer ${token}` },
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
