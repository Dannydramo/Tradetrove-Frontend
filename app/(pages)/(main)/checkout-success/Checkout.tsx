'use client';

import { Button } from '@/components/ui/button';
import useCartStore from '@/store/cartStore';
import Image from 'next/image';
import { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

const Checkout = () => {
    const searchParams = useSearchParams();
    const { clearVendorCart }: any = useCartStore();
    const router = useRouter();

    useEffect(() => {
        const vendorId = searchParams.get('vendorId');
        clearVendorCart(vendorId);
    }, [searchParams, clearVendorCart]);

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <div>
                <div className="text-center mx-auto mt-12">
                    <div className="mb-8">
                        <Image
                            src={'/successful-payment.svg'}
                            alt="Successful Payment"
                            width={100}
                            height={100}
                            className="mx-auto block my-4"
                        />
                        <h1 className="text-2xl my-4 font-semibold">
                            Thank you for shopping
                        </h1>
                        <p>
                            Your order has been successfully placed and is now
                            being processed.
                        </p>
                    </div>
                    <div className="flex justify-center mt-8">
                        <Button
                            onClick={() => {
                                router.replace('/');
                            }}
                            className="px-6 bg-[#4F80E1] flex items-center gap-2 text-sm rounded-sm hover:bg-[#4F80E1] text-white py-3"
                        >
                            <span>Continue shopping</span>
                            <span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-4 h-4"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
                                    />
                                </svg>
                            </span>
                        </Button>
                    </div>
                </div>
            </div>
        </Suspense>
    );
};

export default Checkout;
