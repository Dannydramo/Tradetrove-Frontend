import Hero from './_components/Hero';
import Layout from './_components/Layout';
import PopularVendors from './_components/PopularVendors';
import VendorsRegion from './_components/VendorsRegion';

export default function Home() {
    return (
        <>
            <Layout>
                <div className="">
                    <Hero />
                    <PopularVendors />
                    <VendorsRegion />
                </div>
            </Layout>
        </>
    );
}
