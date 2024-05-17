'use client';
import { getRecentOrder } from '@/app/service/orders';
import useCartStore from '@/store/cartStore';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const CheckOutSuccess = () => {
    const searchParams = useSearchParams();
    const { clearVendorCart }: any = useCartStore();
    const [recentOrder, setRecentOrder] = useState();
    useEffect(() => {
        const vendorId = searchParams.get('vendorId');
        clearVendorCart(vendorId);
        const fetchUserRecentOrder = async () => {
            try {
                const { status, message, data } = await getRecentOrder(
                    vendorId!
                );
                if (status !== 200) {
                    console.log(message);
                    return;
                }
                setRecentOrder(data);
            } catch (error) {
                console.log('Error fetching recent order details');
            }
        };
        fetchUserRecentOrder();
    }, []);
    return <div>CheckOutSuccess</div>;
};

export default CheckOutSuccess;
