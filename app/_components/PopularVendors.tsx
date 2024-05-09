'use client';
import React, { useEffect, useState } from 'react';
import VendorsCard from './VendorsCard';
import { getPopularVendors } from '../service/vendor';
import ProductCardSkeleton from '../skeleton/ProductCardSkeleton';

const PopularVendors = () => {
    const [vendors, setVendors] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchAllVendor = async () => {
            try {
                const { status, message, data } = await getPopularVendors();
                if (status !== 200) {
                    setLoading(false);
                    return;
                }
                setVendors(data);
                setLoading(false);
            } catch (error) {
                console.log('Error fetching vendor');
                setLoading(false);
                return;
            }
        };
        fetchAllVendor();
    }, []);
    return (
        <div className="my-12">
            <h1 className="font-bold text-center text-xl uppercase">
                Popular Vendors
            </h1>
            {!loading ? (
                <>
                    {' '}
                    <div className="grid grid-cols-2 gap-8 my-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {vendors.map((vendor) => (
                            <VendorsCard
                                key={vendor?._id}
                                vendor={vendor.vendor}
                            />
                        ))}
                    </div>
                </>
            ) : (
                <>
                    <ProductCardSkeleton />
                </>
            )}
        </div>
    );
};

export default PopularVendors;
