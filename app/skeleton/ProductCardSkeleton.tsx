import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

const ProductCardSkeleton = () => {
    return (
        <div className="grid grid-cols-2 gap-8 my-8 lg:grid-cols-3 xl:grid-cols-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((card) => (
                <div key={card}>
                    <Skeleton className="w-full h-[200px] md:h-[300px] md:w-[250px] bg-gray-200" />
                    <Skeleton className="h-5 w-40 my-2 bg-gray-200" />
                    <div className="flex gap-4">
                        <Skeleton className="h-5 w-16 rounded-full bg-gray-200" />
                        <Skeleton className="h-5 w-16 rounded-full bg-gray-200" />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProductCardSkeleton;
