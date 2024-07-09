import { Axios } from '../helpers/axiosHelper';

let status: number;
let message: string;
let data: any;

export const getAllWishlist = async () => {
    try {
        const response = await Axios({
            url: 'wishlist/',
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

export const addToWishlist = async (productId: string) => {
    try {
        const response = await Axios({
            url: 'wishlist/new',
            method: 'post',
            body: { productId },
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
    try {
        const response = await Axios({
            url: `wishlist/remove/${productId}`,
            method: 'delete',
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
    try {
        const response = await Axios({
            url: `wishlist/status/${productId}`,
            method: 'get',
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
