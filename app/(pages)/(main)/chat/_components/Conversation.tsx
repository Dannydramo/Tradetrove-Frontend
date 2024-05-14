import { VendorProps } from '@/app/interface/vendor';
import { getVendorDetailsById } from '@/app/service/vendor';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

const Conversation = ({
    conversation,
    currentUser,
}: {
    conversation: any;
    currentUser: string;
}) => {
    const [vendor, setVendor] = useState<VendorProps>();
    useEffect(() => {
        const vendorId = conversation.members.find(
            (memeberId: string) => memeberId !== currentUser
        );
        const fetchVendorDetails = async () => {
            const { status, message, data } = await getVendorDetailsById(
                vendorId
            );
            if (status !== 200) {
                return;
            }
            setVendor(data);
        };
        fetchVendorDetails();
    }, []);
    return (
        <>
            <div className="m-4 cursor-pointer">
                {vendor && (
                    <div className="flex items-center text-sm gap-2">
                        <Image
                            src={vendor.logo}
                            width={50}
                            height={50}
                            className="w-[40px] h-[40px] rounded-[95%] sm:rounded-full"
                            alt={vendor?.businessName}
                        />
                        <p className="text-medium truncate">
                            {vendor.businessName}
                        </p>
                    </div>
                )}
            </div>
        </>
    );
};

export default Conversation;
