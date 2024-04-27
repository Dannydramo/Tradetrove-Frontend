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
                <Table className="text-xs border-l">
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
                        {orderData.map((order, index) => (
                            <TableRow key={order._id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell className="font-medium">
                                    {order.vendor.businessName}
                                </TableCell>
                                <TableCell>
                                    {order.products.map((product) => (
                                        <div key={product._id}>
                                            {product.productName}
                                        </div>
                                    ))}
                                </TableCell>
                                <TableCell>
                                    {order.products.map((product: any) => (
                                        <Image
                                            src={product.images[0]}
                                            alt={product.productName}
                                            width={50}
                                            height={50}
                                            className="w-[40px] h-[40px] rounded-full"
                                        />
                                    ))}
                                </TableCell>
                                <TableCell>
                                    {order.products.map((product) => (
                                        <div key={product._id}>
                                            {product.price}
                                        </div>
                                    ))}
                                </TableCell>
                                <TableCell>
                                    {' '}
                                    {order.products.map((product: any) => (
                                        <div key={product._id}>
                                            {order.totalPrice / product.price}
                                        </div>
                                    ))}
                                </TableCell>

                                <TableCell>{order.paymentStatus}</TableCell>
                                <TableCell>
                                    ${order.totalPrice.toFixed(2)}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>

                    <TableFooter className="w-full">
                        <TableRow>
                            <TableCell colSpan={8}>
                                Total Order Amount
                            </TableCell>

                            <TableCell>
                                $
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
                    <div className="border-l px-6 w-full">
                        {' '}
                        <div className="text-center mx-auto mt-12 h-full flex flex-col justify-center items-center">
                            <Image
                                src="/empty-state.svg"
                                alt="Empty State"
                                width={100}
                                height={100}
                                className="mx-auto block my-4"
                            />
                            <p>Your order history is waiting to be filled.</p>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default OrderTable;
