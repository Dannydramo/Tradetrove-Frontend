'use client';
import Layout from '@/app/_components/Layout';
import VendorsCard from '@/app/_components/VendorsCard';
import { VendorProps } from '@/app/interface/vendor';
import {
    getVendorsByState,
    getVendorsByStateAndProduct,
} from '@/app/service/vendor';
import ProductCardSkeleton from '@/app/skeleton/ProductCardSkeleton';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { ChangeEvent, useEffect, useState } from 'react';
const options = ['mew', 'mewtwo', 'pikachu'];
const Page = ({ params }: { params: { state: string } }) => {
    const [vendors, setVendors] = useState<VendorProps[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [searchTerm, setSearchTerm] = useState('');
    const fetchVendors = async () => {
        try {
            const state = params.state;
            const category = searchParams.get('category');
            const { status, message, data } = !category
                ? await getVendorsByState(state)
                : await getVendorsByStateAndProduct(state, category);
            if (status !== 200) {
                setLoading(false);
                return;
            }
            setVendors(data);
            setLoading(false);
        } catch (error) {
            console.log('Error fetching vendors:', error);
            setLoading(false);
        }
    };

    const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value.trim());
    };

    const searchButtonClicked = () => {
        const current = new URLSearchParams(Array.from(searchParams.entries()));
        if (!searchTerm) {
            current.delete('category');
        } else {
            current.set('category', searchTerm);
        }
        const search = current.toString();
        const query = search ? `?${search}` : '';
        router.push(`${pathname}${query}`);
        fetchVendors();
    };
    useEffect(() => {
        fetchVendors();
    }, [params.state, searchParams]);

    return (
        <Layout>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 justify-end mb-4">
                <input
                    type="text"
                    placeholder="Search for a product..."
                    onChange={onSearchChange}
                    value={searchTerm}
                    className="border border-gray-300 rounded-md px-3 py-2"
                />
                <button
                    onClick={searchButtonClicked}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                    Search
                </button>
            </div>
            {!loading ? (
                <>
                    {vendors.length === 0 ? (
                        <div className="text-center my-8">
                            <p className="my-4">No vendors from this state.</p>

                            <Link
                                href={'/'}
                                className="bg-blue-500 text-white px-12 py-2 rounded-md mt-4"
                            >
                                Back
                            </Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 gap-8 my-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {vendors.map((vendor) => (
                                <VendorsCard
                                    key={vendor?._id}
                                    vendor={vendor}
                                />
                            ))}
                        </div>
                    )}
                </>
            ) : (
                <>
                    <ProductCardSkeleton />
                </>
            )}
        </Layout>
    );
};
export default Page;
