import { Axios } from '../helpers/axiosHelper';
import { getCookie } from 'cookies-next';

let status: number;
let message: string;
let data: any;

export const getAllOrders = async () => {
    const token = getCookie('token');
    try {
        const response = await Axios({
            url: 'orders/',
            method: 'get',
            headers: {
                Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MmI3MzcxZWI5ZjEzZDY1YjllMTMyYyIsImlhdCI6MTcxNDE3MTk3MCwiZXhwIjoxNzE0MjA3OTcwfQ.LvCQ63EjRtzqJ6mzRfBd1QjKKvprJS7xTGw7Ba_7Cls`,
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
