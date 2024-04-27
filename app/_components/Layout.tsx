'use client';
import useCartStore from '@/store/cartStore';
import { UserStore } from '@/store/userStore';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { getUserDetails } from '../service/onboarding';

const Layout = ({ children }: { children: React.ReactNode }) => {
    const { totalProducts }: any = useCartStore();
    const { user, setUser } = UserStore();
    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const { message, data, status } = await getUserDetails();
                if (status !== 200) {
                    console.log(message);
                }

                setUser(data);
            } catch (error) {
                console.log('Unable to fetch user details');
            }
        };
        fetchUserDetails();
    }, []);

    return (
        <div className="w-[95%] sm:w-[90%] mx-auto max-w-9xl">
            <nav className="py-6">
                <div className="flex justify-between items-center">
                    <Link href={'/'}>
                        <div className="flex space-x-2 text-[#4F80E1]">
                            <div className="relative">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                                    />
                                </svg>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-6 h-6 absolute -top-2 left-2 z-50"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
                                    />
                                </svg>
                            </div>
                            <h1>Tradetrove</h1>
                        </div>
                    </Link>
                    <div className="flex space-x-8 items-center">
                        <Link href={'/cart'} className="relative">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                                />
                            </svg>
                            <span className="text-xs text-white bg-[#4F80E1] p-1 rounded absolute -top-4 -right-4">
                                {totalProducts}
                            </span>
                        </Link>
                        {user ? (
                            <Link href="/profile/orders">
                                {' '}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                    />
                                </svg>
                            </Link>
                        ) : (
                            <div className="flex space-x-4 items-center">
                                <Link
                                    href={'/login'}
                                    className="bg-[#4F80E1] text-white py-2 px-8 rounded-full transition"
                                >
                                    Login
                                </Link>
                                <Link href={'/signup'} className="">
                                    Signup
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
            <main className="mt-2"> {children}</main>
        </div>
    );
};

export default Layout;
