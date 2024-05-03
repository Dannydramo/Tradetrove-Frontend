import React from 'react';
import ProfileLayout from '../_components/ProfileLayout';
import PasswordForm from '../_components/PasswordForm';

const page = () => {
    return (
        <ProfileLayout>
            <main className="md:px-8 w-full md:border-l">
                <div className="border-b pb-4">
                    <h1 className="text-xl font-bold">Security</h1>
                </div>
                <div className="mt-4">
                    <p className="my-4 font-semibold text-lg">
                        Change Password
                    </p>
                    <PasswordForm />
                </div>
            </main>
        </ProfileLayout>
    );
};

export default page;
