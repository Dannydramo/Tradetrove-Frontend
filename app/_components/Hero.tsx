import React from 'react';

const Hero = () => {
    return (
        <section className="flex items-center justify-end bg-[url('/girl-background.png')] min-h-[80vh] w-full bg-no-repeat bg-cover bg-center rounded-2xl">
            <div className="p-6 lg:px-8 xl:px-12 w-full sm:w-[80%] md:w-[70%] text-[#F6F8FF] lg:w-1/2">
                <h1 className="font-bold text-2xl sm:text-3xl lg:text-4xl xl:text-5xl">
                    Discover Limitless Shopping Possibilities at Tradetrove
                </h1>
                <p className="text-sm sm:text-base my-4">
                    Welcome to the ultimate destination for online shopping! At
                    Tradetrove, the possibilities are endless as you explore a
                    curated selection of products from a diverse community of
                    sellers.
                </p>
            </div>
        </section>
    );
};

export default Hero;
