import React from 'react';
import ProfileLayout from '../_components/ProfileLayout';
import OrderTable from './OrderTable';

const page = () => {
    return (
        <ProfileLayout>
            <OrderTable />
        </ProfileLayout>
    );
};

export default page;
