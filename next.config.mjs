/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['res.cloudinary.com'],
    },
    reactStrictMode: true,
    env: {
        NEXT_BASE_URL: process.env.NEXT_PUBLIC_APP_API_URL,
    },
};

export default nextConfig;
