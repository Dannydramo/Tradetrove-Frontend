import { Axios } from '../helpers/axiosHelper';
import { getCookie } from 'cookies-next';

let status: number;
let message: string;
let data: any;

export const getAllWishlist = async () => {
    const token = getCookie('token');
    try {
        const response = await Axios({
            url: 'wishlist/',
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

export const addToWishlist = async (productId: string) => {
    const token = getCookie('token');
    try {
        const response = await Axios({
            url: 'wishlist/new',
            method: 'post',
            body: { productId },
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

export const removeFromWishlist = async (productId: string) => {
    const token = getCookie('token');
    try {
        const response = await Axios({
            url: `wishlist/remove/${productId}`,
            method: 'delete',
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

export const fetchProductWishlistStatus = async (productId: string) => {
    const token = getCookie('token');
    try {
        const response = await Axios({
            url: `wishlist/status/${productId}`,
            method: 'get',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        status = 200;

        message = response.data.message;
        data = response.data.wishlist;
    } catch (err: any) {
        status = err.response.status;
        message = err.response.data.message;
    }
    return { status, message, data };
};
