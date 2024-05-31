'use client';
import React, { useEffect, useState } from 'react';
import DashboardLayout from '../_components/DashboardLayout';
import { getProducts } from '@/app/service/product';
import ProductCardSkeleton from '@/app/skeleton/ProductCardSkeleton';
import ProductCard from '@/app/_components/ProductCard';

const MarketPlace = () => {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchAllProducts = async () => {
            try {
                const { status, message, data } = await getProducts();
                if (status !== 200) {
                    setLoading(false);
                    return;
                }

                setProducts(data);
                setLoading(false);
            } catch (error) {
                console.log('Error fetching vendor');
                setLoading(false);
                return;
            }
        };
        fetchAllProducts();
    }, []);
    return (
        <DashboardLayout>
            <h1 className="my-2 text-2xl font-semibold">Marketplace</h1>
            <section>
                {!loading ? (
                    <>
                        {products.length > 0 ? (
                            <div className="grid grid-cols-2 gap-8 my-8  lg:grid-cols-3 xl:grid-cols-4">
                                {products.map((product) => (
                                    <ProductCard
                                        key={product._id}
                                        product={product}
                                    />
                                ))}
                            </div>
                        ) : (
                            <p className="text-center text-gray-500 mt-8">
                                No product found.
                            </p>
                        )}
                    </>
                ) : (
                    <ProductCardSkeleton />
                )}
            </section>
        </DashboardLayout>
    );
};

export default MarketPlace;
