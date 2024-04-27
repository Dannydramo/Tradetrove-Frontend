import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

const ProductCardSkeleton = () => {
    return (
        <div className="grid sm:grid-cols-2 gap-6 my-10 lg:mt-16 lg:gap-4 lg:grid-cols-4">
            <div className="">
                <Skeleton className="w-full h-[200px] md:h-[300px] md:w-[300px] bg-gray-200" />
                <Skeleton className="h-5 w-40 my-2 bg-gray-200" />
                <div className="flex gap-4">
                    <Skeleton className="h-5 w-16 rounded-full bg-gray-200" />
                    <Skeleton className="h-5 w-16 rounded-full bg-gray-200" />
                </div>
            </div>
            <div className="">
                <Skeleton className="w-full h-[200px] md:h-[300px] md:w-[300px] bg-gray-200" />
                <Skeleton className="h-5 w-40 my-2 bg-gray-200" />
                <div className="flex gap-4">
                    <Skeleton className="h-5 w-16 rounded-full bg-gray-200" />
                    <Skeleton className="h-5 w-16 rounded-full bg-gray-200" />
                </div>
            </div>
            <div className="">
                <Skeleton className="w-full h-[200px] md:h-[300px] md:w-[300px] bg-gray-200" />
                <Skeleton className="h-5 w-40 my-2 bg-gray-200" />
                <div className="flex gap-4">
                    <Skeleton className="h-5 w-16 rounded-full bg-gray-200" />
                    <Skeleton className="h-5 w-16 rounded-full bg-gray-200" />
                </div>
            </div>
            <div className="">
                <Skeleton className="w-full h-[200px] md:h-[300px] md:w-[300px] bg-gray-200" />
                <Skeleton className="h-5 w-40 my-2 bg-gray-200" />
                <div className="flex gap-4">
                    <Skeleton className="h-5 w-16 rounded-full bg-gray-200" />
                    <Skeleton className="h-5 w-16 rounded-full bg-gray-200" />
                </div>
            </div>
        </div>
    );
};

export default ProductCardSkeleton;
