'use client';
import React, { useEffect, useState } from 'react';
import { getAllWishlist, removeFromWishlist } from '@/app/service/wishlist';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'sonner';
import DashboardLayout from '../_components/DashboardLayout';

const page = () => {
    const [wishlistData, setWishlistData] = useState<any[]>([]);
    const fetchWishlist = async () => {
        try {
            const { status, message, data } = await getAllWishlist();
            if (status !== 200) {
                console.log(message);
                return;
            }

            setWishlistData(data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };
    useEffect(() => {
        fetchWishlist();
    }, []);
    const handleRemoveWishlist = async (productId: string) => {
        try {
            const { status, message } = await removeFromWishlist(productId);
            if (status === 200) {
                toast.success('Product removed from wishlist');
                fetchWishlist();
            } else {
                toast.error(message);
            }
        } catch (error) {
            console.error('Error removing product from wishlist:', error);
            toast.error('Failed to remove product from wishlist');
        }
    };
    const formatDateToWords = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };
    return (
        <DashboardLayout>
            <h1 className="my-2 mb-6 text-2xl font-semibold">Wishlist</h1>
            {wishlistData.length > 0 ? (
                <div className="w-full">
                    {' '}
                    {wishlistData.map((wishlist) => (
                        <div
                            key={wishlist._id}
                            className="flex space-x-6 justify-between items-center h-fit pb-4 w-full lg:w-[90%] xl:w-[70%] even:mt-4 odd:border-b"
                        >
                            <div className="flex gap-6 items-center">
                                <div className="bg-gray-200 p-4 rounded-sm w-fit relative">
                                    <Image
                                        src={wishlist.product.images[0]}
                                        alt="Product image"
                                        height={50}
                                        width={50}
                                        className="h-[30px] w-[30px] lg:w-[50px] lg:h-[50px]"
                                    />
                                    <div className="absolute sm:hidden top-0 right-0">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="w-4 h-4"
                                            onClick={() =>
                                                handleRemoveWishlist(
                                                    wishlist.product._id
                                                )
                                            }
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M6 18 18 6M6 6l12 12"
                                            />
                                        </svg>
                                    </div>
                                </div>
                                <div className="flex flex-col space-y-1">
                                    <p>{wishlist.product.productName}</p>
                                    <Link
                                        href={`/product/${wishlist.product._id}`}
                                        className="border sm:hidden mt-4 text-xs rounded-md p-3 sm:py-3 sm:px-6"
                                    >
                                        View Product Details
                                    </Link>
                                    <div className="hidden sm:flex sm:flex-col space-y-1">
                                        {' '}
                                        <p>
                                            Added on:{' '}
                                            {formatDateToWords(
                                                wishlist.createdAt
                                            )}
                                        </p>
                                        <p
                                            className="font-semibold cursor-pointer"
                                            onClick={() =>
                                                handleRemoveWishlist(
                                                    wishlist.product._id
                                                )
                                            }
                                        >
                                            Remove item
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="hidden sm:flex items-center gap-6">
                                <p> ₦{wishlist.product.price}</p>
                                <Link
                                    href={`/product/${wishlist.product._id}`}
                                    className="border rounded-md py-3 px-6"
                                >
                                    View Product Details
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <>
                    {' '}
                    <div className="md:border-l px-6 w-full">
                        {' '}
                        <div className="text-center mx-auto mt-12 h-full flex flex-col justify-center items-center">
                            <Image
                                src="/empty-state.svg"
                                alt="Empty State"
                                width={100}
                                height={100}
                                className="mx-auto block my-4"
                            />
                            <p>
                                Your wishlist history is waiting to be filled.
                            </p>
                        </div>
                    </div>
                </>
            )}
        </DashboardLayout>
    );
};

export default page;
