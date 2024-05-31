import Hero from './_components/Hero';
import Layout from './_components/Layout';
import PopularVendors from './_components/PopularVendors';

export default function Home() {
    return (
        <>
            <Layout>
                <div className="">
                    <Hero />
                    <PopularVendors />
                </div>
            </Layout>
        </>
    );
}
