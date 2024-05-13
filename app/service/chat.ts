import { Axios } from '../helpers/axiosHelper';
import { getCookie } from 'cookies-next';

let status: number;
let message: string;
let data: any;
export const startConversation = async (vendorId: string, userId: string) => {
    try {
        const response = await Axios({
            url: 'conversation/new',
            method: 'post',
            body: { vendorId, userId },
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
