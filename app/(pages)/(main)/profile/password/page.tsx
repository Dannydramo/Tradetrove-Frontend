import PasswordForm from '../_components/PasswordForm';
import DashboardLayout from '../../_components/DashboardLayout';

const page = () => {
    return (
        <DashboardLayout>
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
        </DashboardLayout>
    );
};

export default page;
