import { ProductProps } from './product';

interface Vendor {
    _id: string;
    businessName: string;
    email: string;
    orders: any[];
    updated_at: string | null;
    created_at: string;
    __v: number;
}

export interface Order {
    _id: string;
    vendor: Vendor;
    products: ProductProps[];
    paymentStatus: string;
    totalPrice: number;
    createdAt: string;
    __v: number;
}
