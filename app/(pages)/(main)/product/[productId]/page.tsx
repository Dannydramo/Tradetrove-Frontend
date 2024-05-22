import Layout from '@/app/_components/Layout';
import { getProductDetails } from '@/app/service/product';
import { Metadata, ResolvingMetadata } from 'next';
import ProductComponent from './ProductComponent';

export async function generateMetadata({
    params,
    parent,
}: {
    params: { productId: string };
    parent: ResolvingMetadata;
}): Promise<Metadata> {
    const { data: productDetails } = await getProductDetails(params.productId);
    if (!productDetails) {
        return {
            title: 'Product Not Found',
            description: 'The product you are looking for does not exist.',
        };
    }
    const previousImages = (await parent).openGraph?.images || [];

    return {
        metadataBase: new URL('https://tradetrove.vercel.app'),
        title: productDetails.productName,
        description: productDetails.description,
        twitter: {
            card: 'summary_large_image',
            title: 'Tradetrove',
            description:
                'Welcome to Tradetrove - Your trusted marketplace for unique and valuable items.',
            images: [
                {
                    url: productDetails.images[0],
                    width: 800,
                    height: 600,
                    alt: productDetails.productName,
                },
            ],
        },
        openGraph: {
            title: productDetails.productName,
            description: productDetails.description,
            url: 'https://tradetrove.vercel.app',
            images: [
                ...previousImages,
                {
                    url: productDetails.images[0],
                    width: 800,
                    height: 600,
                    alt: productDetails.productName,
                },
            ],
            locale: 'en_US',
            type: 'website',
        },
    };
}

const ProductDetails = async ({
    params,
}: {
    params: { productId: string };
}) => {
    const {
        status,
        message,
        data: productDetails,
    } = await getProductDetails(params.productId);

    if (status !== 200) {
        return (
            <Layout>
                <div className="px-6 mt-6">
                    <p>Product not found.</p>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <ProductComponent productDetails={productDetails} />
        </Layout>
    );
};

export default ProductDetails;
