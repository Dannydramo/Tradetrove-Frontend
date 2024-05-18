import { Axios } from '../helpers/axiosHelper';

let status: number;
let message: string;
let data: any;
export const getPopularVendors = async () => {
    try {
        const response = await Axios({
            url: 'vendor/get-popular-vendors',
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

export const getVendorsByState = async (state: string) => {
    try {
        const response = await Axios({
            url: `user/vendors/${state}`,
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
export const getVendorsByStateAndProduct = async (
    state: string,
    category: string
) => {
    try {
        const response = await Axios({
            url: `user/vendors/${state}?category=${category}`,
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
export const getVendorDetailsByBusinessName = async (businessName: string) => {
    try {
        const response = await Axios({
            url: `user/get-vendor-details?businessName=${businessName}`,
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

export const getProductsByVendor = async (id: string) => {
    try {
        const response = await Axios({
            url: `user/vendor/products/${id}`,
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

export const getVendorCartDetails = async (vendorId: string) => {
    try {
        const response = await Axios({
            url: `user/vendor-cart-details/${vendorId}`,
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

export const getVendorDetailsById = async (vendorId: string) => {
    try {
        const response = await Axios({
            url: `user/get-vendor-details?vendorId=${vendorId}`,
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
