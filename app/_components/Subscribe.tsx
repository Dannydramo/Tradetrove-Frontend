import React from 'react';

const Subscribe = () => {
    return (
        <div className="my-16 text-base lg:text-lg rounded-3xl py-12 px-6 bg-gray-300">
            <div className="">
                <div className="lg:w-1/2">
                    <h3 className="mb-6 font-bold text-2xl sm:text-3xl lg:text-4xl xl:text-5xl">
                        Subscribe to our news article
                    </h3>

                    <div className="flex justify-start ">
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            className="outline-none rounded-md w-full max-w-96 text-black border-none py-2 px-4"
                        />
                    </div>
                    <button className="py-2 mt-2 w-full max-w-96 rounded-md px-6 text-center bg-[#2672D4]">
                        Subscribe
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Subscribe;
