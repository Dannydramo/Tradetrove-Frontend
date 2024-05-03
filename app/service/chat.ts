import { Axios } from '../helpers/axiosHelper';

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
        data = response.data.savedConversation;
    } catch (err: any) {
        status = err.response.status;
        message = err.response.data.message;
    }
    return { status, message, data };
};

export const getConversation = async (userId: string) => {
    try {
        const response = await Axios({
            url: `conversation/${userId}`,
            method: 'get',
        });

        status = 200;
        message = response.message;
        data = response.data.conversation;
    } catch (err: any) {
        status = err.response.status;
        message = err.response.data.message;
    }
    return { status, message, data };
};

export const getMessages = async (currentChatId: string) => {
    try {
        const response = await Axios({
            url: `message/${currentChatId}`,
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

export const sendMessage = async (payload: {
    conversationId: string;
    sender: string;
    text: string;
}) => {
    try {
        const response = await Axios({
            url: `message/send`,
            method: 'post',
            body: payload,
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
