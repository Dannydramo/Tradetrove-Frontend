'use client';
import React, { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    TableFooter,
} from '@/components/ui/table';
import { Order } from '@/app/interface/order';
import Image from 'next/image';
import { getAllOrders } from '@/app/service/orders';
import Link from 'next/link';

const OrderTable = () => {
    const [orderData, setOrderData] = useState<Order[]>([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const { status, message, data } = await getAllOrders();
                if (status !== 200) {
                    console.log(message);
                    return;
                }

                setOrderData(data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };
        fetchOrders();
    }, []);

    return (
        <>
            {orderData.length > 0 ? (
                <Table className="text-xs">
                    <TableCaption>A list of your orders.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>S/N</TableHead>
                            <TableHead>Vendor Name</TableHead>
                            <TableHead>Product Name</TableHead>
                            <TableHead>Product Image</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Quantity</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Total Amount</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {orderData.map((order, orderIndex) =>
                            order.products.map((product, productIndex) => (
                                <TableRow key={`${order._id}-${product._id}`}>
                                    <TableCell>{orderIndex + 1}</TableCell>
                                    <TableCell className="font-medium">
                                        {order.vendor.businessName}
                                    </TableCell>
                                    <TableCell>{product.productName}</TableCell>
                                    <TableCell>
                                        <Image
                                            src={product.images[0]}
                                            alt={product.productName}
                                            width={50}
                                            height={50}
                                            className="w-[40px] h-[40px] rounded-full"
                                        />
                                    </TableCell>
                                    <TableCell> ₦{product.price}</TableCell>
                                    <TableCell>
                                        {order.totalPrice / product.price}
                                    </TableCell>
                                    {productIndex === 0 && (
                                        <>
                                            <TableCell
                                                rowSpan={order.products.length}
                                            >
                                                {order.paymentStatus}
                                            </TableCell>
                                            <TableCell
                                                rowSpan={order.products.length}
                                            >
                                                ₦{order.totalPrice.toFixed(2)}
                                            </TableCell>
                                        </>
                                    )}
                                </TableRow>
                            ))
                        )}
                    </TableBody>

                    <TableFooter className="w-full">
                        <TableRow>
                            <TableCell colSpan={7}>
                                Total Order Amount
                            </TableCell>

                            <TableCell>
                                ₦
                                {orderData
                                    .reduce(
                                        (total, order) =>
                                            total + order.totalPrice,
                                        0
                                    )
                                    .toFixed(2)}
                            </TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            ) : (
                <>
                    {' '}
                    <div className="text-center mx-auto mt-12">
                        <div className="mb-8">
                            {' '}
                            <Image
                                src="/empty-state.svg"
                                alt="Empty State"
                                width={100}
                                height={100}
                                className="mx-auto block my-4"
                            />
                            <p>Your order history is waiting to be filled.</p>
                        </div>
                        <div className="flex justify-center">
                            <Link
                                href={'/market-place'}
                                className="px-6 bg-[#4F80E1] flex items-center gap-2 text-sm rounded-sm hover:bg-[#4F80E1] text-white py-3"
                            >
                                <span>Start shopping</span>
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
                            </Link>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default OrderTable;
