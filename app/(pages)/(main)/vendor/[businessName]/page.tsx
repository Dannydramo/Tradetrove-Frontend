import Layout from '@/app/_components/Layout';
import { getVendorDetailsByBusinessName } from '@/app/service/vendor';
import type { Metadata, ResolvingMetadata } from 'next';
import Image from 'next/image';
import VendorProducts from '@/app/_components/VendorProducts';

export const generateMetadata = async ({
    params,
}: {
    params: { businessName: string };
}) => {
    const { businessName } = params;
    const { status, data } = await getVendorDetailsByBusinessName(businessName);

    if (status !== 200) {
        return {
            title: 'Vendor Not Found',
            description: 'No vendor found with the specified business name',
            openGraph: {
                title: 'Vendor Not Found',
                description: 'No vendor found with the specified business name',
            },
        };
    }

    return {
        metadataBase: new URL('https://tradetrove.vercel.app'),
        title: `${data.businessName}`,
        description: data.description,
        twitter: {
            card: 'summary_large_image',
            title: 'Tradetrove',
            description:
                'Welcome to Tradetrove - Your trusted marketplace for unique and valuable items.',
            url: 'https://tradetrove.vercel.app',
            images: [
                {
                    url: data.logo,
                    width: 800,
                    height: 600,
                    alt: `${data.businessName} Logo`,
                },
            ],
        },
        openGraph: {
            title: `${data.businessName}`,
            description: data.description,
            url: 'https://tradetrove.vercel.app',
            images: [
                {
                    url: data.logo,
                    width: 800,
                    height: 600,
                    alt: `${data.businessName} Logo`,
                },
            ],
            locale: 'en_US',
            type: 'website',
        },
    };
};

export default async function VendorDetailsPage({
    params,
}: {
    params: { businessName: string };
}) {
    const { businessName } = params;
    const { status, data: vendorDetails } =
        await getVendorDetailsByBusinessName(businessName);

    if (status !== 200) {
        return (
            <Layout>
                <div>Vendor not found</div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                    <div>
                        {vendorDetails.logo && (
                            <Image
                                src={vendorDetails.logo}
                                alt={`${vendorDetails.businessName} logo`}
                                width={200}
                                height={200}
                                className="h-[100px] w-[100px] md:h-[200px] rounded-full md:w-[200px]"
                            />
                        )}
                    </div>
                    <div>
                        <h1>{vendorDetails.businessName}</h1>
                        <a
                            href={`mailto:${vendorDetails.email}`}
                            className="flex gap-2 items-center text-sm my-2"
                        >
                            <span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-4 h-4"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                                    />
                                </svg>
                            </span>
                            <span>{vendorDetails.email}</span>
                        </a>
                        <a
                            href={`tel:+234${vendorDetails.phoneNumber.slice(
                                1
                            )}`}
                            className="flex gap-2 items-center text-sm my-2"
                        >
                            <span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-4 h-4"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                                    />
                                </svg>
                            </span>
                            <span>{vendorDetails.phoneNumber}</span>
                        </a>
                        <p>{vendorDetails.description}</p>
                    </div>
                </div>
                <div className="mt-4">
                    <p className="flex items-center gap-2 text-sm my-2">
                        <span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-4 h-4"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                                />
                            </svg>
                        </span>
                        <span>{`${vendorDetails.address}, ${vendorDetails.city}, ${vendorDetails.country}`}</span>
                    </p>
                </div>
                <section className="my-12">
                    <h1 className="font-bold text-center text-xl uppercase">
                        Products By Vendor {vendorDetails.businessName}
                    </h1>
                    <VendorProducts vendorId={vendorDetails._id} />
                </section>
            </div>
        </Layout>
    );
}
