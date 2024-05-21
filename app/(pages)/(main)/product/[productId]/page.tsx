import Layout from '@/app/_components/Layout';
import { getProductDetails } from '@/app/service/product';
import { Metadata } from 'next';
import ProductComponent from './ProductComponent';

export async function generateMetadata({
    params,
}: {
    params: { productId: string };
}): Promise<Metadata> {
    const { data: productDetails } = await getProductDetails(params.productId);

    if (!productDetails) {
        return {
            title: 'Product Not Found',
            description: 'The product you are looking for does not exist.',
        };
    }

    return {
        title: productDetails.productName,
        description: productDetails.description,
        openGraph: {
            title: productDetails.productName,
            description: productDetails.description,
            images: [
                {
                    url: productDetails.images[0],
                    width: 800,
                    height: 600,
                    alt: productDetails.productName,
                },
            ],
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
