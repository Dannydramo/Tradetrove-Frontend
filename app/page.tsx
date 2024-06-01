import Hero from './_components/Hero';
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
                    <Subscribe />
                </div>
            </Layout>
        </>
    );
}
