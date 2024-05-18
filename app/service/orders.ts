import { Axios } from '../helpers/axiosHelper';

let status: number;
let message: string;
let data: any;

export const getAllOrders = async () => {
    try {
        const response = await Axios({
            url: 'orders/',
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

export const getRecentOrder = async (vendorId: string) => {
    try {
        const response = await Axios({
            url: `orders/user-recent-order?vendorId=${vendorId}`,
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
