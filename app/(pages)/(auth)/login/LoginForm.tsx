'use client';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { loginValidationSchema } from '@/app/validators/onboarding';
import React, {
    ChangeEvent,
    ChangeEventHandler,
    FormEvent,
    useState,
} from 'react';
import { LoginProps } from '@/app/interface/onboarding';
import * as Yup from 'yup';
import { toast } from 'sonner';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { loginUser } from '@/app/service/onboarding';
import { setCookie } from 'cookies-next';

const LoginForm = () => {
    const [formData, setFormData] = useState<LoginProps>({
        email: '',
        password: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const [togglePassword, setTogglePassword] = useState<boolean>(false);
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
            await loginValidationSchema.validate(formData, {
                abortEarly: false,
            });

            setErrors({});
            try {
                setIsLoading(true);
                const { status, message, data } = await loginUser(formData);
                if (status !== 200) {
                    toast.error(message);
                    setIsLoading(false);
                    return;
                }
                toast.success(message);
                setIsLoading(false);
                setCookie('isLoggedIn', 'true', {
                    maxAge: 30 * 24 * 60 * 60,
                    path: '/',
                });
                router.replace('/market-place');
            } catch (error) {
                toast.error('Unable to process form submission');
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
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
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
                <div className="">
                    <Label className="mb-2 text-sm">Password</Label>
                    <div className="flex">
                        <Input
                            type={togglePassword ? 'text' : 'password'}
                            name="password"
                            placeholder="Enter Password"
                            className="text-sm outline-none bg-transparent"
                            value={formData.password}
                            onChange={handleValueChange}
                        />

                        <div className="flex justify-end">
                            <span
                                className="absolute mr-[1rem] mt-[1rem] text-sm cursor-pointer"
                                onClick={() =>
                                    setTogglePassword(!togglePassword)
                                }
                            >
                                {togglePassword ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="w-4 h-4"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="w-4 h-4"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                                        />
                                    </svg>
                                )}
                            </span>
                        </div>
                    </div>

                    {errors.password && (
                        <span className="text-red-500 text-xs">
                            {errors.password}
                        </span>
                    )}
                </div>
                <div className="mt-2 text-xs underline">
                    <Link href="/forgot-password">Forgot Password</Link>
                </div>
                <Button
                    variant="outline"
                    type="submit"
                    disabled={isLoading}
                    className="w-full mt-6 h-12 bg-[#4F80E1] hover:bg-[#4F80E1] hover:text-white text-white"
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
                        'Login'
                    )}
                </Button>
            </form>
        </div>
    );
};

export default LoginForm;
