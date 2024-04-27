import Hero from './_components/Hero';
import Layout from './_components/Layout';
import Vendor from './_components/Vendor';

export default function Home() {
    return (
        <>
            <Layout>
                <div className="">
                    <Hero />
                    <Vendor />
                </div>
            </Layout>
        </>
    );
}
