'use client';
import useCartStore from '@/store/cartStore';
import React, { useState } from 'react';
import { toast } from 'sonner';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import TabsComponent from '@/app/_components/TabsComponent';
import Wishlist from '@/app/_components/Wishlist';
const ProductComponent = ({ productDetails }: { productDetails: any }) => {
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const addToCart = useCartStore((state: any) => state.addToCart);
    const handleImageClick = (index: number) => {
        setSelectedImageIndex(index);
    };

    const handleQuantityIncrease = () => {
        setQuantity(quantity + 1);
    };

    const handleQuantityDecrease = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const handleAddToCart = () => {
        if (productDetails) {
            addToCart(productDetails.vendor._id, {
                id: productDetails._id,
                name: productDetails.productName,
                price: productDetails.price,
                image: productDetails.images[0],
                quantity: quantity,
            });

            toast.success('Product added to cart');
        }
    };
    return (
        <section className="lg:col-span-1 px-6 mt-6">
            <div className="flex flex-col md:flex-row gap-8 md:justify-between py-4">
                <>
                    {productDetails && (
                        <>
                            <div className="w-full md:w-1/2">
                                <div className="h-[50vh] sm:h-[65vh] bg-gray-200 px-8 flex justify-center items-center">
                                    <Image
                                        src={
                                            productDetails?.images[
                                                selectedImageIndex
                                            ]
                                        }
                                        alt=""
                                        width={500}
                                        height={500}
                                        className="w-[300px] h-[300px]"
                                    />
                                </div>

                                <div className="flex space-x-4 mt-6">
                                    {productDetails?.images.map(
                                        (image: string, index: number) => (
                                            <div
                                                key={index}
                                                onClick={() =>
                                                    handleImageClick(index)
                                                }
                                            >
                                                <div
                                                    className={`h-[70px] w-[70px] sm:h-[100px] sm:w-[100px] rounded-xl border ${
                                                        selectedImageIndex ===
                                                        index
                                                            ? 'border-blue-500'
                                                            : ''
                                                    }`}
                                                >
                                                    <Image
                                                        src={image}
                                                        height={500}
                                                        width={500}
                                                        className="h-full w-full rounded-xl"
                                                        alt={`Product Image ${index}`}
                                                    />
                                                </div>
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>

                            <div className="w-full md:w-1/2 mt-6">
                                <h1 className="font-bold text-xl mt-4">
                                    {productDetails?.productName}
                                </h1>

                                <div className="mt-2 mb-6 flex gap-4">
                                    {' '}
                                    <p className="text-xs bg-gray-200 rounded-full px-6 py-2">
                                        {productDetails?.category}
                                    </p>
                                    <p className="border-2 px-6 py-2 rounded-full text-xs">
                                        {productDetails.inStock === true
                                            ? 'Instock'
                                            : 'Out of stock'}
                                    </p>
                                </div>
                                <p className="text-xl font-semibold">
                                    ₦{productDetails?.price}
                                </p>

                                <div className="flex items-center space-x-8 my-4 border-2 w-fit px-6 py-2 rounded-sm">
                                    <span>
                                        <svg
                                            onClick={handleQuantityDecrease}
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="w-6 h-6 cursor-pointer"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M5 12h14"
                                            />
                                        </svg>
                                    </span>

                                    <span>{quantity}</span>

                                    <span>
                                        {' '}
                                        <svg
                                            onClick={handleQuantityIncrease}
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="w-6 h-6 cursor-pointer"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M12 4.5v15m7.5-7.5h-15"
                                            />
                                        </svg>
                                    </span>
                                </div>
                                <div className="flex gap-2 items-center">
                                    <Button
                                        onClick={handleAddToCart}
                                        disabled={!productDetails.inStock}
                                        className="bg-[#4F80E1] text-white hover:bg-[#4F80E1] px-6 py-4 rounded-sm mt-4 w-64"
                                    >
                                        Add to cart
                                    </Button>
                                    <div className="border px-4 pt-[9px] rounded-sm mt-4 h-10">
                                        <Wishlist
                                            productId={productDetails._id}
                                        />
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </>
            </div>

            {productDetails && (
                <TabsComponent
                    description={productDetails.description}
                    productId={productDetails._id}
                />
            )}
        </section>
    );
};

export default ProductComponent;
