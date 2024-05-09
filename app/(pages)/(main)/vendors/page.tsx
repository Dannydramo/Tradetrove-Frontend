'use client';
import Layout from '@/app/_components/Layout';
import VendorsCard from '@/app/_components/VendorsCard';
import { VendorProps } from '@/app/interface/vendor';
import { getVendors } from '@/app/service/vendor';
import ProductCardSkeleton from '@/app/skeleton/ProductCardSkeleton';
import React, { useState, useEffect } from 'react';

const AllVendors = () => {
    const [vendors, setVendors] = useState<VendorProps[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchAllVendor = async () => {
            try {
                const { status, message, data } = await getVendors();
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
        <Layout>
            {' '}
            <div className="my-12">
                <h1 className="font-bold text-center text-xl uppercase">
                    Popular Vendors
                </h1>
                {!loading ? (
                    <>
                        <div className="grid grid-cols-2 gap-8 my-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {vendors.map((vendor) => (
                                <VendorsCard
                                    key={vendor?._id}
                                    vendor={vendor}
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
        </Layout>
    );
};

export default AllVendors;
