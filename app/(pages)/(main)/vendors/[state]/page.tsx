'use client';
import Layout from '@/app/_components/Layout';
import VendorsCard from '@/app/_components/VendorsCard';
import { VendorProps } from '@/app/interface/vendor';
import { getVendorsByState } from '@/app/service/vendor';
import ProductCardSkeleton from '@/app/skeleton/ProductCardSkeleton';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const Page = ({ params }: { params: { state: string } }) => {
    const [vendors, setVendors] = useState<VendorProps[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAllVendor = async () => {
            try {
                const { status, message, data } = await getVendorsByState(
                    params.state
                );
                if (status !== 200) {
                    setLoading(false);
                    return;
                }
                setVendors(data);
                setLoading(false);
            } catch (error) {
                console.log('Error fetching vendor');
                setLoading(false);
            }
        };
        fetchAllVendor();
    }, []);

    return (
        <Layout>
            {!loading ? (
                <>
                    {vendors.length === 0 ? (
                        <div className="text-center my-8">
                            <p className="my-4">No vendors from this state.</p>

                            <Link
                                href={'/'}
                                className="bg-blue-500 text-white px-12 py-2 rounded-md mt-4"
                            >
                                Back
                            </Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 gap-8 my-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {vendors.map((vendor) => (
                                <VendorsCard
                                    key={vendor?._id}
                                    vendor={vendor}
                                />
                            ))}
                        </div>
                    )}
                </>
            ) : (
                <>
                    <ProductCardSkeleton />
                </>
            )}
        </Layout>
    );
};

export default Page;
