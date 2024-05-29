import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';
import ProductCardSkeleton from './ProductCardSkeleton';

const VendorDetailsSkeleton = () => {
    return (
        <div className="space-y-4">
            <div className="">
                {' '}
                <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                    <Skeleton className="rounded-full h-[100px] w-[100px] md:h-[200px] md:w-[200px] bg-gray-200" />

                    <div>
                        <Skeleton className="h-5 w-40 my-2 bg-gray-200" />
                        <Skeleton className="h-5 w-40 my-2 bg-gray-200" />
                        <Skeleton className="h-5 w-40 my-2 bg-gray-200" />
                    </div>
                </div>
                <Skeleton className="h-5 w-72 my-2 bg-gray-200" />
                <Skeleton className="h-5 w-80 my-2 bg-gray-200" />
                <Skeleton className="h-5 w-80 my-2 bg-gray-200" />
                <Skeleton className="h-5 w-52 my-2 bg-gray-200" />
                <Skeleton className="h-5 w-80 my-2 bg-gray-200" />
            </div>
            <div className="">
                <Skeleton className="h-8 text-center w-80 mx-auto my-12 bg-gray-200" />
                <ProductCardSkeleton />
            </div>
        </div>
    );
};

export default VendorDetailsSkeleton;
