export interface ProductProps {
    quantity: string;
    _id: string;
    productName: string;
    description: string;
    category: string;
    price: number;
    inStock: boolean;
    images: string[];
}

export interface CartProductProps {
    id: string;
    name: string;
    price: string;
    image: string;
    quantity: number;
}
