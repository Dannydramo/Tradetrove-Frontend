'use client';
import Layout from '@/app/_components/Layout';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();
    return (
        <Layout>
            <section className="mt-6 text-sm">
                <div className="bg-white rounded-md my-6 p-4 md:p-8 overflow-x-auto min-h-[80vh]">
                    <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row w-full">
                        <div className="md:min-w-60 md:max-w-64 pr-8 flex flex-row md:flex-col md:space-y-6 font-semibold h-full">
                            <Link
                                href={'/profile/orders'}
                                className={`flex items-center font-medium text-xs sm:text-sm md:text-base hover:bg-[#F6F8FF] hover:text-[#4F80E1] space-x-2 px-6 py-3 rounded-md  ${
                                    pathname.includes('/orders') &&
                                    'bg-[#F6F8FF] text-[#4F80E1]'
                                }`}
                            >
                                <span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-5 h-5"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                                        />
                                    </svg>
                                </span>
                                <span> Orders</span>
                            </Link>
                            <Link
                                href={'/profile/wishlist'}
                                className={`flex items-center font-medium text-xs sm:text-sm md:text-base hover:bg-[#F6F8FF] hover:text-[#4F80E1] space-x-2 px-6 py-3 rounded-md  ${
                                    pathname === '/profile/wishlist' &&
                                    'bg-[#F6F8FF] text-[#4F80E1]'
                                }`}
                            >
                                <span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-5 h-5"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                                        />
                                    </svg>
                                </span>
                                <span>Wishlist</span>
                            </Link>
                            <Link
                                href={'/profile/password'}
                                className={`flex items-center font-medium text-xs sm:text-sm md:text-base hover:bg-[#F6F8FF] hover:text-[#4F80E1] space-x-2 px-6 py-3 rounded-md  ${
                                    pathname === '/profile/password' &&
                                    'bg-[#F6F8FF] text-[#4F80E1]'
                                }`}
                            >
                                <span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-5 h-5"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z"
                                        />
                                    </svg>
                                </span>
                                <span> Password</span>
                            </Link>
                            <Link
                                href={'/profile/account'}
                                className={`flex items-center font-medium text-xs sm:text-sm md:text-base hover:bg-[#F6F8FF] hover:text-[#4F80E1] space-x-2 px-6 py-3 rounded-md  ${
                                    pathname === '/profile/account' &&
                                    'bg-[#F6F8FF] text-[#4F80E1]'
                                }`}
                            >
                                <span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-5 h-5"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                        />
                                    </svg>
                                </span>
                                <span> Account Detail</span>
                            </Link>
                        </div>
                        <hr className="h-full" />
                        {children}
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default ProfileLayout;
