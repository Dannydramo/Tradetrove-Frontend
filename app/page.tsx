import Hero from './_components/Hero';
import Layout from './_components/Layout';
import Vendor from './_components/Vendor';
import VendorsRegion from './_components/VendorsRegion';

export default function Home() {
    return (
        <>
            <Layout>
                <div className="">
                    <Hero />
                    <Vendor />
                    <VendorsRegion />
                </div>
            </Layout>
        </>
    );
}
