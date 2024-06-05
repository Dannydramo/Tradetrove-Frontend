'use client';
import React, { useState } from 'react';
import ProfileLayout from '../_components/ProfileLayout';
import { UserStore } from '@/store/userStore';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

const page = () => {
    const { user } = UserStore();
    const [isLoading, setIsLoading] = useState(false);

    return (
        <ProfileLayout>
            <section className="md:px-8 w-full">
                <h1 className="font-semibold text-base">Account Details</h1>
                <div className="w-full md:max-w-[400px] my-12">
                    <Avatar>
                        <AvatarFallback>
                            {user && user.username[0]}
                        </AvatarFallback>
                    </Avatar>
                    <form action="" className="">
                        <div className="mb-6 mt-8">
                            <Label className="mb-2 text-sm">User Name</Label>
                            <Input
                                value={user?.username}
                                className="text-sm outline-none bg-transparent"
                            />
                        </div>
                        <div className="mb-4">
                            <Label className="mb-2 text-sm">Email</Label>
                            <Input
                                readOnly
                                value={user?.email}
                                className="text-sm outline-none bg-transparent"
                            />
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
                                'Save Changes'
                            )}
                        </Button>
                    </form>
                </div>
            </section>
        </ProfileLayout>
    );
};

export default page;
