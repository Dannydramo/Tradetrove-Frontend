'use client';
import React, { useEffect, useState } from 'react';
import { getProductsByVendor } from '../service/vendor';
import ProductCard from './ProductCard';
import { ProductProps } from '../interface/product';
import ProductCardSkeleton from '../skeleton/ProductCardSkeleton';

const VendorProducts = ({ vendorId }: { vendorId: string }) => {
    const [products, setProducts] = useState<ProductProps[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchProductByVendor = async () => {
            setIsLoading(true);
            const { status, message, data } = await getProductsByVendor(
                vendorId
            );
            if (status !== 200) {
                setIsLoading(false);
                return;
            }
            setProducts(data);
            setIsLoading(false);
        };
        fetchProductByVendor();
    }, [vendorId]);

    return (
        <>
            {isLoading ? (
                <ProductCardSkeleton />
            ) : (
                <>
                    {products.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-6 lg:gap-4 lg:grid-cols-4">
                            {products.map((product: ProductProps) => (
                                <ProductCard
                                    key={product._id}
                                    product={product}
                                />
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-gray-500 mt-10">
                            No products found for this vendor.
                        </p>
                    )}
                </>
            )}
        </>
    );
};

export default VendorProducts;
