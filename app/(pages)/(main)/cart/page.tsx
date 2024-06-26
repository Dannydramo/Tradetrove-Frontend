'use client';
import useCartStore from '@/store/cartStore';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { getVendorCartDetails } from '@/app/service/vendor';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { startConversation } from '@/app/service/chat';
import { useRouter } from 'next/navigation';
import CartSkeleton from '@/app/skeleton/CartSkeleton';
import { UserStore } from '@/store/userStore';
import Link from 'next/link';
import DashboardLayout from '../_components/DashboardLayout';
import MessageVendor from '../_components/MessageVendor';

const Cart = () => {
    const { cart, addToCart, removeFromCart }: any = useCartStore();
    const [vendorDetails, setVendorDetails] = useState<any>({});
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const { user } = UserStore();

    const fetchVendorDetails = async (vendorId: string) => {
        try {
            const { status, message, data } = await getVendorCartDetails(
                vendorId
            );
            if (status !== 200) {
                setLoading(false);
                return;
            }

            setVendorDetails((prevDetails: any) => ({
                ...prevDetails,
                [vendorId]: data,
            }));
            setLoading(false);
        } catch (error) {
            console.log('Error fetching vendor details');
            setLoading(false);
            return;
        }
    };

    useEffect(() => {
        Object.keys(cart).forEach((vendorId) => {
            fetchVendorDetails(vendorId);
        });
    }, [cart]);

    const decreaseQuantity = (vendorId: string, productId: string) => {
        const product = cart[vendorId][productId];
        if (product.quantity === 1) {
            return;
        }
        addToCart(vendorId, {
            ...product,
            quantity: -1,
        });
    };

    const increaseQuantity = (vendorId: string, productId: string) => {
        const product = cart[vendorId][productId];
        addToCart(vendorId, {
            ...product,
            quantity: 1,
        });
    };

    const calculateTotalPrice = (vendorId: string) => {
        const products = Object.values(cart[vendorId]);
        return products.reduce(
            (total: any, product: any) =>
                total + product.price * product.quantity,
            0
        );
    };

    const handleProceedToCheckout = (vendorId: string) => {
        if (!user) {
            router.push('/login');
            return;
        }
        const product = cart[vendorId];
        const cartItem = [];

        for (const key in product) {
            if (product.hasOwnProperty(key)) {
                cartItem.push(product[key]);
            }
        }

        axios
            .post(
                `https://tradetrove-backend.onrender.com/api/v1/payment/create-checkout-session`,
                {
                    userId: user?._id,
                    cartItem,
                    vendorId,
                }
            )
            .then((response: { data: { url: string } }) => {
                if (response.data.url) {
                    window.location.href = response.data.url;
                }
            })
            .catch((err: { message: any }) => console.log(err.message));
    };

    const handleStartConversation = async (vendorId: string) => {
        if (!user) {
            router.push('/login');
            return;
        }
        try {
            const { status, message, data } = await startConversation(
                vendorId,
                user?._id
            );
            if (status !== 200) {
                return;
            }

            router.push('/chat');
        } catch (error) {
            console.error('Error starting conversation:', error);
        }
    };

    return (
        <DashboardLayout>
            {' '}
            {loading && !vendorDetails ? (
                <>
                    <CartSkeleton />
                </>
            ) : (
                <>
                    {Object.keys(cart).length === 0 ? (
                        <>
                            <div className="">
                                <h1 className="my-4 font-semibold">
                                    Your Cart
                                </h1>
                                <hr />
                            </div>
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
                                    <p>Your cart is currently empty.</p>
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
                    ) : (
                        <>
                            {' '}
                            {Object.keys(cart).map((vendorId) => (
                                <div key={vendorId}>
                                    <p className="font-bold">
                                        <span>Products from </span>
                                        {vendorDetails[vendorId] && (
                                            <span>
                                                {
                                                    vendorDetails[vendorId]
                                                        .businessName
                                                }
                                            </span>
                                        )}
                                    </p>
                                    <Table>
                                        <TableCaption>
                                            Total Price for &nbsp;
                                            {
                                                vendorDetails[vendorId]
                                                    ?.businessName
                                            }
                                            : ₦{calculateTotalPrice(vendorId)}.
                                        </TableCaption>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>
                                                    Product Image
                                                </TableHead>
                                                <TableHead>
                                                    Product Name
                                                </TableHead>
                                                <TableHead>Price</TableHead>
                                                <TableHead>Quantity</TableHead>
                                                <TableHead>
                                                    Total Price
                                                </TableHead>
                                                <TableHead>Actions</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {Object.values(cart[vendorId]).map(
                                                (product: any) => (
                                                    <TableRow key={product.id}>
                                                        <TableCell className="">
                                                            <div className="bg-gray-200 p-2 rounded-sm w-fit">
                                                                {' '}
                                                                <Image
                                                                    src={
                                                                        product.image
                                                                    }
                                                                    alt="Product image"
                                                                    height={50}
                                                                    width={50}
                                                                    className="h-[30px] w-[30px]"
                                                                />
                                                            </div>
                                                        </TableCell>
                                                        <TableCell>
                                                            {product.name}
                                                        </TableCell>
                                                        <TableCell>
                                                            ₦{product.price}
                                                        </TableCell>
                                                        <TableCell className="flex mt-3 space-x-4 items-center">
                                                            <span
                                                                onClick={() =>
                                                                    decreaseQuantity(
                                                                        vendorId,
                                                                        product.id
                                                                    )
                                                                }
                                                            >
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    fill="none"
                                                                    viewBox="0 0 24 24"
                                                                    strokeWidth={
                                                                        1.5
                                                                    }
                                                                    stroke="currentColor"
                                                                    className="w-4 h-4 cursor-pointer"
                                                                >
                                                                    <path
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        d="M5 12h14"
                                                                    />
                                                                </svg>
                                                            </span>

                                                            <span>
                                                                {' '}
                                                                {
                                                                    product.quantity
                                                                }
                                                            </span>

                                                            <span
                                                                onClick={() =>
                                                                    increaseQuantity(
                                                                        vendorId,
                                                                        product.id
                                                                    )
                                                                }
                                                            >
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    fill="none"
                                                                    viewBox="0 0 24 24"
                                                                    strokeWidth={
                                                                        1.5
                                                                    }
                                                                    stroke="currentColor"
                                                                    className="w-4 h-4 cursor-pointer"
                                                                >
                                                                    <path
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        d="M12 4.5v15m7.5-7.5h-15"
                                                                    />
                                                                </svg>
                                                            </span>
                                                        </TableCell>
                                                        <TableCell>
                                                            ₦
                                                            {product.price *
                                                                product.quantity}
                                                        </TableCell>
                                                        <TableCell
                                                            onClick={() => {
                                                                removeFromCart(
                                                                    vendorId,
                                                                    product.id
                                                                );
                                                            }}
                                                        >
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                strokeWidth={
                                                                    1.5
                                                                }
                                                                stroke="currentColor"
                                                                className="w-4 h-4 cursor-pointer"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                                                />
                                                            </svg>
                                                        </TableCell>
                                                    </TableRow>
                                                )
                                            )}
                                        </TableBody>
                                    </Table>

                                    <div className="flex flex-col sm:flex-row gap-4 justify-between my-4">
                                        <Button
                                            onClick={() =>
                                                handleProceedToCheckout(
                                                    vendorId
                                                )
                                            }
                                            className="px-6 bg-[#4F80E1] hover:bg-[#4F80E1]"
                                        >
                                            Proceed to Checkout
                                        </Button>
                                        <MessageVendor vendorId={vendorId} />
                                    </div>
                                </div>
                            ))}
                        </>
                    )}
                </>
            )}
        </DashboardLayout>
    );
};

export default Cart;
