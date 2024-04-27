import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';

const CartSkeleton = () => {
    return (
        <div>
            {[1, 2, 3].map((vendorId) => (
                <div key={vendorId}>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Product Image</TableHead>
                                <TableHead>Product Name</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead>Quantity</TableHead>
                                <TableHead>Total Price</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {[1, 2, 3].map((product) => (
                                <TableRow key={product}>
                                    <TableCell className="">
                                        <Skeleton className="h-[40px] w-[40px] my-2 bg-gray-200" />
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton className="h-5 w-24 my-2 bg-gray-200" />
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton className="h-5 w-24 my-2 bg-gray-200" />
                                    </TableCell>
                                    <TableCell className="flex mt-3 space-x-4 items-center">
                                        <Skeleton className="h-5 w-24 my-2 bg-gray-200" />
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton className="h-5 w-24 my-2 bg-gray-200" />
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton className="h-5 w-24 my-2 bg-gray-200" />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            ))}
        </div>
    );
};

export default CartSkeleton;
