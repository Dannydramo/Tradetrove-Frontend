'use client';
import React, { useEffect, useState } from 'react';
import DashboardLayout from '../_components/DashboardLayout';
import { getPopularVendors } from '@/app/service/vendor';
import VendorsCard from '@/app/_components/VendorsCard';
import ProductCardSkeleton from '@/app/skeleton/ProductCardSkeleton';

const Vendors = () => {
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
        <DashboardLayout>
              <h1 className="my-2 text-2xl font-semibold">Vendors</h1>
            <section>
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
            </section>
        </DashboardLayout>
    );
};

export default Vendors;
