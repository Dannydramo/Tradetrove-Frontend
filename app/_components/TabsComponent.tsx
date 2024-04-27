import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Reviews from './Reviews';

const TabsComponent = ({
    description,
    productId,
}: {
    description: string;
    productId: string;
}) => {
    return (
        <div className="my-12">
            <Tabs
                defaultValue="description"
                className="flex flex-col md:flex-row md:space-x-16 my-12"
            >
                <TabsList className="flex flex-row md:flex-col justify-start bg-transparent gap-4 mb-12 min-w-72 max-w-[400px]">
                    <TabsTrigger
                        value="description"
                        className="w-full py-3 flex items-center gap-2"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-5 h-5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                            />
                        </svg>
                        <span> Description</span>
                    </TabsTrigger>
                    <TabsTrigger
                        value="review"
                        className="w-full py-3 flex items-center gap-2"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-5 h-5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                            />
                        </svg>
                        <span> Review</span>
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="description">{description}</TabsContent>
                <TabsContent value="review" className="w-full">
                    <Reviews productId={productId} />
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default TabsComponent;
