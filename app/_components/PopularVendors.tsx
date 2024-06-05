'use client';
import React, { useEffect, useState } from 'react';
import { getPopularVendors } from '../service/vendor';
import ProductCardSkeleton from '../skeleton/ProductCardSkeleton';
import Link from 'next/link';
import Image from 'next/image';
import { getCookie } from 'cookies-next';
import VendorsCard from './VendorsCard';
const PopularVendors = () => {
    const [vendors, setVendors] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const isLoggedIn = getCookie('isLoggedIn');
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
            <h1 className="font-bold sm:text-xl uppercase">Popular Vendors</h1>
            {!loading ? (
                <>
                    {vendors.length > 0 ? (
                        <div className="grid grid-cols-2 gap-8 my-8  lg:grid-cols-3 xl:grid-cols-4">
                            {vendors.map((vendor) =>
                                isLoggedIn ? (
                                    <>
                                        {' '}
                                        <VendorsCard
                                            key={vendor?._id}
                                            vendor={vendor}
                                        />
                                    </>
                                ) : (
                                    <>
                                        <div className="">
                                            {' '}
                                            <Link
                                                key={vendor?._id}
                                                href={`/login`}
                                            >
                                                <div className="bg-gray-200 rounded-sm py-8 px-2 sm:px-4">
                                                    {' '}
                                                    <Image
                                                        src={vendor.logo}
                                                        alt="vendor_logo"
                                                        width={200}
                                                        height={200}
                                                        className="w-[100px] h-[100px] sm:w-[150px] sm:h-[200px] block m-auto"
                                                    />
                                                </div>
                                                <h1 className="mt-4 font-semibold text-base">
                                                    {vendor?.businessName}
                                                </h1>
                                            </Link>
                                        </div>
                                    </>
                                )
                            )}
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
