import React, { useEffect, useState } from 'react';
import { getProductsByVendor } from '../service/vendor';
import ProductCard from './ProductCard';
import { ProductProps } from '../interface/product';

const VendorProducts = ({ vendorId }: { vendorId: string }) => {
    const [products, setProducts] = useState<ProductProps[]>([]);
    useEffect(() => {
        const fetchProductByVendor = async () => {
            const { status, message, data } = await getProductsByVendor(
                vendorId
            );
            if (status !== 200) {
                return;
            }
            setProducts(data);
        };
        fetchProductByVendor();
    }, []);
    return (
        <div className="grid sm:grid-cols-2 gap-6 mt-10 lg:mt-16 lg:gap-4 lg:grid-cols-4">
            {products.map((product: ProductProps) => (
                <ProductCard key={product._id} product={product} />
            ))}
        </div>
    );
};

export default VendorProducts;
