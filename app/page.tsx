import Hero from './_components/Hero';
import LatestProducts from './_components/LatestProducts';
import Layout from './_components/Layout';
import PopularVendors from './_components/PopularVendors';
import Subscribe from './_components/Subscribe';

export default function Home() {
    return (
        <>
            <Layout>
                <div className="">
                    <Hero />
                    <PopularVendors />
                    <LatestProducts/>
                    <Subscribe />
                </div>
            </Layout>
        </>
    );
}
