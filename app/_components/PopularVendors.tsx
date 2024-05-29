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
                    {vendors.length > 0 ? (
                        <div className="grid grid-cols-2 gap-8 my-8  lg:grid-cols-3 xl:grid-cols-4">
                            {vendors.map((vendor) => (
                                <VendorsCard
                                    key={vendor?._id}
                                    vendor={vendor}
                                />
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-gray-500 mt-8">
                            No popular vendors found.
                        </p>
                    )}
                </>
            ) : (
                <ProductCardSkeleton />
            )}
        </div>
    );
};

export default PopularVendors;
