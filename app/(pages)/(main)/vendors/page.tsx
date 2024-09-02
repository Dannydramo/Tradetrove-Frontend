'use client';
import React, { useEffect, useState } from 'react';
import DashboardLayout from '../_components/DashboardLayout';
import { getPopularVendors } from '@/app/service/vendor';
import VendorsCard from '@/app/_components/VendorsCard';
import ProductCardSkeleton from '@/app/skeleton/ProductCardSkeleton';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

const Vendors = () => {
    const [vendors, setVendors] = useState<any[]>([]);
    const [filteredVendors, setFilteredVendors] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedState, setSelectedState] = useState('all');

    const states = [
        'Abia',
        'Adamawa',
        'Akwa Ibom',
        'Anambra',
        'Bauchi',
        'Bayelsa',
        'Benue',
        'Borno',
        'Cross River',
        'Delta',
        'Ebonyi',
        'Edo',
        'Ekiti',
        'Enugu',
        'Gombe',
        'Imo',
        'Jigawa',
        'Kaduna',
        'Kano',
        'Katsina',
        'Kebbi',
        'Kogi',
        'Kwara',
        'Lagos',
        'Nasarawa',
        'Niger',
        'Ogun',
        'Ondo',
        'Osun',
        'Oyo',
        'Plateau',
        'Rivers',
        'Sokoto',
        'Taraba',
        'Yobe',
        'Zamfara',
        'Abuja',
    ];

    useEffect(() => {
        const fetchAllVendors = async () => {
            try {
                const { status, message, data } = await getPopularVendors();
                if (status !== 200) {
                    setLoading(false);
                    return;
                }
                console.log(data);

                setVendors(data);
                setFilteredVendors(data);
                setLoading(false);
            } catch (error) {
                console.log('Error fetching vendors:', error);
                setLoading(false);
            }
        };
        fetchAllVendors();
    }, []);

    useEffect(() => {
        let results = vendors;

        if (searchTerm) {
            results = results.filter((vendor) =>
                vendor.businessName
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
            );
        }

        if (selectedState !== 'all') {
            results = results.filter(
                (vendor) =>
                    vendor.state.toLowerCase() === selectedState.toLowerCase()
            );
        }

        setFilteredVendors(results);
    }, [searchTerm, selectedState]);

    return (
        <DashboardLayout>
            <h1 className="my-2 text-2xl font-semibold">Vendors</h1>
            <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
                <div className="">
                    <input
                        type="text"
                        placeholder="Search vendors by business name"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="py-2 px-6 border w-full md:max-w-xs outline-none bg-transparent rounded-full"
                    />
                </div>
                <Select onValueChange={(value) => setSelectedState(value)}>
                    <SelectTrigger className="rounded-md md:w-64 outline-none bg-gray-300">
                        <SelectValue placeholder="Filter Vendors by State" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        {states.map((state) => (
                            <SelectItem key={state} value={state}>
                                {state}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <section>
                {!loading ? (
                    <>
                        {filteredVendors?.length > 0 ? (
                            <div className="grid grid-cols-2 gap-8 my-8 lg:grid-cols-3 xl:grid-cols-4">
                                {filteredVendors.map((vendor) => (
                                    <VendorsCard
                                        key={vendor?._id}
                                        vendor={vendor}
                                    />
                                ))}
                            </div>
                        ) : (
                            <p className="text-center text-gray-500 mt-20">
                                No vendors found.
                            </p>
                        )}
                    </>
                ) : (
                    <ProductCardSkeleton />
                )}
            </section>
        </DashboardLayout>
    );
};

export default Vendors;
