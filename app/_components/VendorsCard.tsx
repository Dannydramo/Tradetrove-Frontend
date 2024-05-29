import React from 'react';
import { VendorProps } from '../interface/vendor';
import Image from 'next/image';
import Link from 'next/link';

const VendorsCard = ({ vendor }: { vendor: VendorProps }) => {
    return (
        <Link href={`/vendor/${vendor?.businessName}`}>
            <div className="bg-gray-200 rounded-sm py-8 px-2 sm:px-4">
                {' '}
                <Image
                    src={vendor.logo}
                    alt="vendor_logo"
                    width={200}
                    height={200}
                    className="w-[100px] h-[100px] sm:w-[150px] sm:h-[200px] block m-auto"
                />
            </div>
            <h1 className="mt-4 font-semibold text-base">
                {vendor?.businessName}
            </h1>
        </Link>
    );
};

export default VendorsCard;
