'use client';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { forgotPasswordValidationSchema } from '@/app/validators/onboarding';

import React, {
    ChangeEvent,
    ChangeEventHandler,
    FormEvent,
    useState,
} from 'react';
import { ForgotPasswordProps } from '@/app/interface/onboarding';
import * as Yup from 'yup';
import { toast } from 'sonner';
import { forgotPassword } from '@/app/service/onboarding';

const ForgotPasswordForm = () => {
    const [formData, setFormData] = useState<ForgotPasswordProps>({
        email: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleValueChange: ChangeEventHandler<HTMLInputElement> = (
        event: ChangeEvent<HTMLInputElement>
    ) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            await forgotPasswordValidationSchema.validate(formData, {
                abortEarly: false,
            });

            setErrors({});
            setIsLoading(true);

            try {
                const { status, message } = await forgotPassword(formData);
                if (status !== 200) {
                    toast.error(message);
                    setIsLoading(false);
                    return;
                }
                setMessage(message);
                setIsLoading(false);
                return;
            } catch (err) {
                console.log(err);
                toast.error(
                    'Unable to process form submission. Kindly check all your connection and try again'
                );
                setIsLoading(false);
                return;
            }
        } catch (validationErrors) {
            const errorsObj: { [key: string]: string } = {};
            if (validationErrors instanceof Yup.ValidationError) {
                validationErrors.inner.forEach((error: any) => {
                    errorsObj[error.path] = error.message;
                });
                setErrors(errorsObj);
            }
        }
    };
    return (
        <div className="w-80 sm:min-w-[450px]">
            {!message && (
                <form onSubmit={handleSubmit}>
                    <div className="">
                        <Label className="mb-2 text-sm">Email</Label>
                        <Input
                            type="email"
                            name="email"
                            placeholder="vendor@gmail.com"
                            className="text-sm outline-none bg-transparent"
                            value={formData.email}
                            onChange={handleValueChange}
                        />
                        {errors.email && (
                            <span className="text-red-500 text-xs">
                                {errors.email}
                            </span>
                        )}
                    </div>

                    <Button
                        variant="outline"
                        type="submit"
                        className="w-full mt-6 h-12 bg-[#4F80E1] hover:bg-[#4F80E1] hover:text-white text-white"
                        disabled={isLoading}
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
                            'Send Password Reset Link'
                        )}
                    </Button>
                </form>
            )}
            {message && <p className="mt-4">{message}</p>}
        </div>
    );
};

export default ForgotPasswordForm;
