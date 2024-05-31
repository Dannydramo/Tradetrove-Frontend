'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { deleteCookie } from 'cookies-next';
import { getUserDetails, logoutUser } from '@/app/service/onboarding';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import useCartStore from '@/store/cartStore';
import { UserStore } from '@/store/userStore';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    const [mobileToggle, setMobileToggle] = useState(false);
    const { totalProducts }: any = useCartStore();
    const { user, setUser } = UserStore();
    const router = useRouter();
    const pathname = usePathname();
    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const { message, data, status } = await getUserDetails();
                if (status !== 200) {
                    console.log(message);
                    return;
                }

                setUser(data);
            } catch (error) {
                console.log('Unable to fetch user details');
            }
        };
        fetchUserDetails();
    }, []);
    const handleLogout = async () => {
        const { status, message } = await logoutUser();
        if (status !== 200) {
            return;
        }
        toast.success(message);
        deleteCookie('isLoggedIn');
        router.replace('/login');
    };
    return (
        <section className="flex w-full min-h-screen bg-[#F6F8FF]">
            <aside
                className={`z-20 lg:block top-0 left-0 lg:fixed w-64 p-4 h-full bg-white text-black ${
                    mobileToggle ? 'fixed' : 'hidden'
                }`}
            >
                <div className="flex flex-col flex-grow pt-4">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-5 h-5 absolute top-0 right-0 m-4 lg:hidden"
                        onClick={() => {
                            setMobileToggle(false);
                        }}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18 18 6M6 6l12 12"
                        />
                    </svg>
                    <div className="pl-4 flex space-x-2 text-[#4F80E1]">
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
                </div>
                <div className="mt-8">
                    <nav className="flex flex-col space-y-4">
                        <Link
                            href={'/market-place'}
                            className={`flex items-center font-medium text-xs sm:text-sm md:text-base hover:bg-[#F6F8FF] hover:text-[#4F80E1] space-x-2 px-6 py-3 rounded-md  ${
                                pathname === '/market-place' &&
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
                            <span> Marketplace</span>
                        </Link>
                        <Link
                            href={'/vendors'}
                            className={`flex items-center font-medium text-xs sm:text-sm md:text-base hover:bg-[#F6F8FF] hover:text-[#4F80E1] space-x-2 px-6 py-3 rounded-md  ${
                                (pathname === '/vendors' ||
                                    pathname.includes('vendor')) &&
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
                            <span> Vendors</span>
                        </Link>
                        <Link
                            href={'/orders'}
                            className={`flex items-center font-medium text-xs sm:text-sm md:text-base hover:bg-[#F6F8FF] hover:text-[#4F80E1] space-x-2 px-6 py-3 rounded-md  ${
                                pathname === '/orders' &&
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
                            href={'/wishlist'}
                            className={`flex items-center font-medium text-xs sm:text-sm md:text-base hover:bg-[#F6F8FF] hover:text-[#4F80E1] space-x-2 px-6 py-3 rounded-md  ${
                                pathname === '/wishlist' &&
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
                            href={'/chat'}
                            className={`flex items-center font-medium text-xs sm:text-sm md:text-base hover:bg-[#F6F8FF] hover:text-[#4F80E1] space-x-2 px-6 py-3 rounded-md  ${
                                pathname === '/chat' &&
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
                                        d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                                    />
                                </svg>
                            </span>
                            <span>Chat</span>
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
                    </nav>
                </div>
                <div className="absolute bottom-0">
                    <Button
                        className="bg-transparent text-black hover:bg-transparent flex gap-3 w-full"
                        onClick={handleLogout}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 18 18"
                            fill="none"
                            stroke="currentColor"
                        >
                            <path
                                id="Vector"
                                d="M11.8571 13V15.2857C11.8571 15.5888 11.7367 15.8796 11.5224 16.0938C11.3081 16.3081 11.0174 16.4286 10.7143 16.4286H2.71427C2.41116 16.4286 2.12047 16.3081 1.90615 16.0938C1.69182 15.8796 1.57141 15.5888 1.57141 15.2857V2.7143C1.57141 2.41119 1.69182 2.1205 1.90615 1.90618C2.12047 1.69185 2.41116 1.57144 2.71427 1.57144H10.7143C11.0174 1.57144 11.3081 1.69185 11.5224 1.90618C11.7367 2.1205 11.8571 2.41119 11.8571 2.7143V5.00001M8.42855 9.00001H16.4286M16.4286 9.00001L14.1428 6.7143M16.4286 9.00001L14.1428 11.2857"
                                strokeWidth="1.43"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            ></path>
                        </svg>
                        Logout
                    </Button>
                </div>
            </aside>
            <div className="w-full flex-1 lg:ml-64 overflow-x-hidden">
                <header className="flex items-center h-16 px-4 py-2 sm:py-4 sm:px-6 border-b w-full border-gray-200">
                    <div className="">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-5 h-5 mr-2 lg:hidden"
                            onClick={() => {
                                setMobileToggle(true);
                            }}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                            />
                        </svg>
                    </div>
                    <div className="flex w-full justify-between items-center">
                        <div className="">
                            <h1 className="text-sm sm:text-xl font-bold">
                                Welcome {user?.username}
                            </h1>
                        </div>
                        <div className="flex gap-4">
                            {' '}
                            <div className="">
                                {' '}
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
                                    <span className="text-[10px] text-white bg-[#4F80E1] p-[3px] rounded absolute -top-3 -right-2">
                                        {totalProducts}
                                    </span>
                                </Link>
                            </div>
                            <div className="">Monday 12th July</div>
                        </div>
                    </div>
                </header>

                <main className="m-6">{children}</main>
            </div>
        </section>
    );
};

export default DashboardLayout;
