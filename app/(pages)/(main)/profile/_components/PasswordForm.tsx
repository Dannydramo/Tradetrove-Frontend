'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React, { ChangeEvent, ChangeEventHandler, useState } from 'react';
import { changePasswordValidationSchema } from '@/app/validators/onboarding';
const PasswordForm = () => {
    const [formData, setFormData] = useState({
        password: '',
        newPassword: '',
        confirmNewPassword: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    // const router = useRouter();

    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleValueChange: ChangeEventHandler<HTMLInputElement> = (
        event: ChangeEvent<HTMLInputElement>
    ) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        changePasswordValidationSchema
            .validate(formData, { abortEarly: false })
            .then(async () => {
                setErrors({});
            })
            .catch((validationErrors) => {
                const errorsObj: { [key: string]: string } = {};
                validationErrors.inner.forEach(
                    (error: { path: string | number; message: string }) => {
                        errorsObj[error.path] = error.message;
                    }
                );
                setErrors(errorsObj);
            });
    };
    return (
        <form onSubmit={handleSubmit}>
            <div className="">
                <Label className="mb-3 text-sm">Old Password</Label>
                <Input
                    type="password"
                    name="password"
                    placeholder="Enter Old Password"
                    className="text-sm mt-1 outline-none w-full sm:w-96 bg-transparent"
                    value={formData.password}
                    onChange={handleValueChange}
                />
                {errors.password && (
                    <span className="text-red-500 text-sm">
                        {errors.password}
                    </span>
                )}
            </div>
            <div className="mt-6">
                <Label className="mb-3 text-sm">New Password</Label>
                <Input
                    type="password"
                    name="newPassword"
                    placeholder="Enter New Password"
                    className="text-sm mt-1 outline-none w-full sm:w-96 bg-transparent"
                    value={formData.newPassword}
                    onChange={handleValueChange}
                />
                {errors.newPassword && (
                    <span className="text-red-500 text-sm">
                        {errors.newPassword}
                    </span>
                )}
            </div>
            <div className="mt-6">
                <Label className="mb-3 text-sm">Confirm New Password</Label>
                <Input
                    type="password"
                    name="confirmNewPassword"
                    placeholder="Enter Confirm New Password"
                    className="text-sm mt-1 outline-none w-full sm:w-96 bg-transparent"
                    value={formData.newPassword}
                    onChange={handleValueChange}
                />
                {errors.confirmNewPassword && (
                    <span className="text-red-500 text-sm">
                        {errors.confirmNewPassword}
                    </span>
                )}
            </div>
            <Button
                variant="outline"
                type="submit"
                disabled={isLoading}
                className="w-full sm:w-96 mt-6 h-12 bg-[#4F80E1] hover:bg-[#4F80E1] hover:text-white text-white"
            >
                {isLoading ? (
                    <svg
                        className="w-5 h-5 text-white animate-spin"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        ></circle>
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                    </svg>
                ) : (
                    'Change Password'
                )}
            </Button>
        </form>
    );
};

export default PasswordForm;
