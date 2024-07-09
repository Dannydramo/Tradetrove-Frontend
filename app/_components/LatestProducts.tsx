'use client';

import { useEffect, useState } from 'react';
import { ProductProps } from '../interface/product';
import { getLatestProducts } from '../service/product';
import Link from 'next/link';
import Image from 'next/image';
import ProductCardSkeleton from '../skeleton/ProductCardSkeleton';
import ProductCard from './ProductCard';
import { getCookie } from 'cookies-next';
import Wishlist from './Wishlist';
const LatestProducts = () => {
    const [products, setProducts] = useState<ProductProps[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const isLoggedIn = getCookie('isLoggedIn');
    useEffect(() => {
        const fetchLatestProducts = async () => {
            try {
                const { status, message, data } = await getLatestProducts();
                if (status !== 200) {
                    setLoading(false);
                    return;
                }

                setProducts(data);
                setLoading(false);
            } catch (error) {
                console.log('Error fetching vendor');
                setLoading(false);
                return;
            }
        };
        fetchLatestProducts();
    }, []);
    return (
        <div className="my-12">
            <h1 className="font-bold sm:text-xl uppercase">Latest Products</h1>
            {!loading ? (
                <>
                    {products?.length > 0 ? (
                        <div className="grid grid-cols-2 gap-8 my-8  lg:grid-cols-3 xl:grid-cols-4">
                            {products.map((product) =>
                                isLoggedIn ? (
                                   
                                        <ProductCard
                                            key={product._id}
                                            product={product}
                                        />
                                 
                                ) : (
                                    <>
                                        <Link href={'/login'} key={product._id}>
                                            <div className="">
                                                <div className="bg-gray-300 rounded-sm py-8 px-4 group relative">
                                                    <Link
                                                        href={`/product/${product._id}`}
                                                    >
                                                        {product.images &&
                                                            product.images
                                                                .length > 0 && (
                                                                <Image
                                                                    src={
                                                                        product
                                                                            .images[0]
                                                                    }
                                                                    alt="product_img"
                                                                    width={200}
                                                                    height={200}
                                                                    className="w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] block m-auto"
                                                                />
                                                            )}
                                                    </Link>
                                                    <div className="absolute top-4 right-4 hidden z-50 group-hover:block transition duration-150">
                                                        <Wishlist
                                                            productId={
                                                                product._id
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                                <div className="mt-4">
                                                    <h3 className="text-xs font-medium text-gray-900 sm:text-sm md:text-base">
                                                        {product.productName}
                                                    </h3>
                                                    <div className="mt-2 flex items-center gap-4">
                                                        <p className="border-2 text-sm px-4 py-1 rounded-full">
                                                            {product.inStock ===
                                                            true
                                                                ? 'Instock'
                                                                : 'Out of stock'}
                                                        </p>
                                                        <p className="text-xs font-medium text-gray-900 sm:text-sm md:text-base">
                                                            ₦{product.price}
                                                        </p>
                                                    </div>
                                                    {product.vendorDetails && (
                                                        <Link
                                                            href={`/vendor/${product?.vendor?.businessName}`}
                                                            className="my-4 text-xs font-semibold"
                                                        >
                                                            Product By:{' '}
                                                            {
                                                                product?.vendor
                                                                    ?.businessName
                                                            }
                                                        </Link>
                                                    )}
                                                </div>
                                            </div>
                                        </Link>
                                    </>
                                )
                            )}
                        </div>
                    ) : (
                        <p className="text-center text-gray-500 mt-8">
                            Latest Products not found
                        </p>
                    )}
                </>
            ) : (
                <ProductCardSkeleton />
            )}
        </div>
    );
};

export default LatestProducts;
