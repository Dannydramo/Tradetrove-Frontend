import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

const ProductDetailsSkeleton = () => {
    return (
        <div className="flex gap-4 flex-col md:flex-row">
            <div className="">
                <Skeleton className="h-[60vh] md:w-[400px] lg:w-[500px] bg-slate-200 rounded-md" />
            </div>
            <div className="flex flex-col space-y-6 mt-12">
                <Skeleton className="h-5 w-80 my-2 bg-gray-200" />
                <div className="flex gap-4">
                    <Skeleton className="h-5 w-16 rounded-full bg-gray-200" />
                    <Skeleton className="h-5 w-16 rounded-full bg-gray-200" />
                </div>
                <Skeleton className="h-5 w-80 my-2 bg-gray-200" />
                <Skeleton className="h-5 w-80 my-2 bg-gray-200" />
                <Skeleton className="h-10 w-40 my-2 bg-gray-200" />
            </div>
        </div>
    );
};

export default ProductDetailsSkeleton;
