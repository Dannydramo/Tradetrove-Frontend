'use client';
import React, { useEffect, useState } from 'react';
import { getProductReviews } from '../service/review';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import ReviewForm from './ReviewForm';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import StarRating from './StarRating';
import { UserStore } from '@/store/userStore';

const Reviews = ({ productId }: { productId: string }) => {
    const [reviews, setReviews] = useState<any[]>([]);
    const [showReviewForm, setShowReviewForm] = useState(false);
    const toggleReviewForm = () => {
        setShowReviewForm(true);
    };
    const { user } = UserStore();
    useEffect(() => {
        const fetchProductReviews = async () => {
            try {
                const { status, message, data } = await getProductReviews(
                    productId
                );
                if (status !== 200) {
                    return;
                }
                setReviews(data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchProductReviews();
    }, [reviews]);
    const formatDateToWords = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };
    return (
        <div>
            <p>Reviews</p>
            {reviews.length > 0 && user && (
                <Button
                    className="mt-4 bg-transparent text-black border py-4 px-6 hover:bg-transparent"
                    onClick={toggleReviewForm}
                >
                    Write Review
                </Button>
            )}
            <hr className="w-full mt-4" />
            {reviews.length > 0 ? (
                <div>
                    {reviews.map((review) => (
                        <div key={review._id}>
                            <div className="flex justify-between my-4 text-sm">
                                <div className="flex gap-6">
                                    {' '}
                                    <div className="">
                                        <Avatar>
                                            <AvatarFallback>
                                                {review.user.username[0]}
                                            </AvatarFallback>
                                        </Avatar>
                                    </div>
                                    <div className="">
                                        <p>{review.user.username}</p>
                                        <p>
                                            {formatDateToWords(
                                                review.createdAt
                                            )}
                                        </p>
                                        <p className="mt-4">{review.comment}</p>
                                    </div>
                                </div>
                                <div className="">
                                    <StarRating rating={review.rating} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center mt-8">
                    <Image
                        src="/empty-state.svg"
                        alt="Empty State"
                        width={100}
                        height={100}
                        className="mx-auto block my-4"
                    />
                    <p>
                        No reviews yet! Be the first to share your thought about
                        this product.
                    </p>
                    <Button
                        className="mt-4 bg-transparent text-black border py-4 px-6 hover:bg-transparent"
                        onClick={toggleReviewForm}
                    >
                        Write Review
                    </Button>
                </div>
            )}
            {showReviewForm && (
                <ReviewForm
                    setShowReviewForm={setShowReviewForm}
                    productId={productId}
                    setReviews={setReviews}
                />
            )}
        </div>
    );
};

export default Reviews;
