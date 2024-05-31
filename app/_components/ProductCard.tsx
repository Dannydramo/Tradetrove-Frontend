import { ProductProps } from '../interface/product';
import Link from 'next/link';
import Image from 'next/image';
import Wishlist from './Wishlist';

const ProductCard = ({ product }: { product: ProductProps }) => {
    return (
        <div className="">
            <div className="bg-gray-300 rounded-sm py-8 px-4 group relative">
                <Link href={`/product/${product._id}`}>
                    {product.images && product.images.length > 0 && (
                        <Image
                            src={product.images[0]}
                            alt="product_img"
                            width={200}
                            height={200}
                            className="sm:w-[200px] sm:h-[200px] block m-auto"
                        />
                    )}
                </Link>
                <div className="absolute top-4 right-4 hidden z-50 group-hover:block transition duration-150">
                    <Wishlist productId={product._id} />
                </div>
            </div>
            <div className="mt-4">
                <h3 className="text-xs font-medium text-gray-900 sm:text-sm md:text-base">
                    {product.productName}
                </h3>
                <div className="mt-2 flex items-center gap-4">
                    <p className="border-2 text-sm px-4 py-1 rounded-full">
                        {product.inStock === true ? 'Instock' : 'Out of stock'}
                    </p>
                    <p className="text-xs font-medium text-gray-900 sm:text-sm md:text-base">
                        ₦{product.price}
                    </p>
                </div>
                {product.vendorDetails && (
                    <Link
                        href={`/vendor/${product.vendorDetails.businessName}`}
                        className="my-4 text-xs font-semibold"
                    >
                        Product By: {product.vendorDetails.businessName}
                    </Link>
                )}
            </div>
        </div>
    );
};

export default ProductCard;
