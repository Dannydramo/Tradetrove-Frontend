'use client';
import React, { useEffect, useState } from 'react';
import DashboardLayout from '../_components/DashboardLayout';
import { getProducts } from '@/app/service/product';
import ProductCardSkeleton from '@/app/skeleton/ProductCardSkeleton';
import ProductCard from '@/app/_components/ProductCard';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

const MarketPlace = () => {
    const [products, setProducts] = useState<any[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const categories = [
        'Beauty',
        'Fragrances',
        'Furniture',
        'Groceries',
        'Home Decoration',
        'kitchen Accessories',
        'Laptops',
        'Mens Shirts',
        'Mens Shoes',
        'Mens Watches',
        'Mobile Accessories',
        'Motorcycle',
        'Skin Care',
        'Smartphones',
        'Sports Accessories',
        'Sunglasses',
        'Tablets',
        'Tops',
        'Vehicle',
        'Womens Bags',
        'Womens Dresses',
        'Womens Jewellery',
        'Womens Shoes',
        'Womens Watches',
    ];

    useEffect(() => {
        const fetchAllProducts = async () => {
            try {
                const { status, message, data } = await getProducts();
                if (status !== 200) {
                    setLoading(false);
                    return;
                }

                setProducts(data);
                setFilteredProducts(data);
                setLoading(false);
            } catch (error) {
                console.log('Error fetching products:', error);
                setLoading(false);
            }
        };
        fetchAllProducts();
    }, []);

    useEffect(() => {
        let results = products;

        if (searchTerm) {
            results = results.filter((product) =>
                product.productName
                    ?.toLowerCase()
                    .includes(searchTerm.toLowerCase())
            );
        }

        if (selectedCategory !== 'all') {
            results = results.filter(
                (product) =>
                    product.category.toLowerCase() ===
                    selectedCategory.toLowerCase()
            );
        }

        setFilteredProducts(results);
    }, [searchTerm, selectedCategory, products]);

    return (
        <DashboardLayout>
            <h1 className="my-2 text-2xl font-semibold">Marketplace</h1>
            <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
                <div className="">
                    <input
                        type="text"
                        placeholder="Search products by name"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="py-2 px-6 border w-full md:max-w-xs outline-none border-gray-300 bg-transparent rounded-full"
                    />
                </div>
                <Select onValueChange={(value) => setSelectedCategory(value)}>
                    <SelectTrigger className="rounded-md md:w-64 outline-none bg-gray-300">
                        <SelectValue placeholder="Filter Products by Category" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                                {category}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <section>
                {!loading ? (
                    <>
                        {filteredProducts.length > 0 ? (
                            <div className="grid grid-cols-2 gap-8 my-8 lg:grid-cols-3 xl:grid-cols-4">
                                {filteredProducts.map((product) => (
                                    <ProductCard
                                        key={product._id}
                                        product={product}
                                    />
                                ))}
                            </div>
                        ) : (
                            <p className="text-center text-gray-500 mt-8">
                                No products found.
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

export default MarketPlace;
