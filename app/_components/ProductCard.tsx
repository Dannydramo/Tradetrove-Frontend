import React from 'react';
import { ProductProps } from '../interface/product';
import Link from 'next/link';
import Image from 'next/image';

const ProductCard = ({ product }: { product: ProductProps }) => {
    return (
        <Link href={`/product/${product._id}`}>
            <div className="bg-gray-300 rounded-sm py-8 px-4">
                {product.images && product.images.length > 0 && (
                    <Image
                        src={product.images[0]}
                        alt="product_img"
                        width={200}
                        height={200}
                        className="w-[150px] h-[200px] block m-auto"
                    />
                )}
            </div>
            <div className="mt-4">
                <h3 className="text-xs font-medium text-gray-900 sm:text-sm md:text-base">
                    {product.productName}
                </h3>
                <div className="mt-2 flex items-center gap-4">
                    <p className="border-2 px-4 py-1 rounded-full">
                        {product.inStock === true ? 'Instock' : 'Out of stock'}
                    </p>
                    <p className="text-xs font-medium text-gray-900 sm:text-sm md:text-base">
                        ₦{product.price}
                    </p>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;
