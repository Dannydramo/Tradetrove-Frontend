import React from 'react';
import OrderTable from './OrderTable';
import DashboardLayout from '../_components/DashboardLayout';

const page = () => {
    return (
        <DashboardLayout>
            <OrderTable />
        </DashboardLayout>
    );
};

export default page;
