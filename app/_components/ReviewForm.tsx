import { Button } from '@/components/ui/button';
import { UserStore } from '@/store/userStore';
import React, { useState } from 'react';
import { toast } from 'sonner';
import { getProductReviews, postReview } from '../service/review';

interface ReviewFormProps {
    setShowReviewForm: React.Dispatch<React.SetStateAction<boolean>>;
    productId: string;
}

const ReviewForm: React.FC<ReviewFormProps> = ({
    setShowReviewForm,
    productId,
}) => {
    const [clickedStars, setClickedStars] = useState(new Array(5).fill(false));
    const [formData, setFormData] = useState({
        comment: '',
        rating: 0,
        productId: productId,
    });
    const [loading, setLoading] = useState(false);
    const { user } = UserStore();
    const handleStarClick = (index: number) => {
        const newClickedStars = [...clickedStars];

        setFormData({
            ...formData,
            rating: index + 1,
        });

        for (let i = 0; i < newClickedStars.length; i++) {
            if (i <= index) {
                newClickedStars[i] = true;
            } else {
                newClickedStars[i] = false;
            }
        }

        setClickedStars(newClickedStars);
    };

    const handleReviewSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (formData.comment.trim() === '' || formData.rating <= 0) {
            toast.error('Please fill in all required field');
            return;
        }
        if (!user) {
            toast.error('Please login to submit a review');
            setShowReviewForm(false);
            return;
        }
        try {
            setLoading(true);
            const { status, message, data } = await postReview(formData);
            if (status !== 200) {
                toast.error(message);
                setLoading(false);
                return;
            }
            setLoading(false);
            toast.success(message);
            getProductReviews(productId);
            setShowReviewForm(false);
        } catch (error) {
            toast.error('Unable to submit review.Please try again later.');
        }
    };

    return (
        <section>
            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
                <div
                    className="absolute bg-black opacity-30 inset-0 z-0"
                    onClick={() => {
                        setShowReviewForm(false);
                    }}
                ></div>
                <div className="w-[95%] max-w-xl p-4 lg:p-8 relative mx-auto my-auto rounded-lg shadow-lg bg-white">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="font-bold text-xl">Write Review</h1>
                        <p>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                onClick={() => {
                                    setShowReviewForm(false);
                                }}
                                stroke="currentColor"
                                className="w-5 h-5 cursor-pointer"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18 18 6M6 6l12 12"
                                />
                            </svg>
                        </p>
                    </div>
                    <hr />
                    <div className="my-4 text-sm underline">
                        <p>
                            <span>You are logged in as </span>
                            <span>{user?.email}</span>
                        </p>
                    </div>
                    <form onSubmit={handleReviewSubmit}>
                        <div className="my-4">
                            <div className="flex my-4">
                                {clickedStars.map((clicked, index) => (
                                    <svg
                                        key={index}
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill={clicked ? '#000000' : 'none'}
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke={'#000000'}
                                        className="w-6 h-6"
                                        onClick={() => handleStarClick(index)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                                        />
                                    </svg>
                                ))}
                            </div>
                        </div>
                        <div className="grid md:text-base text-sm">
                            <label htmlFor="review" className="">
                                Review
                            </label>
                            <textarea
                                name="review"
                                id="review"
                                className="h-[200px] p-2 outline-none border mt-2 rounded-md"
                                placeholder="Enter Review"
                                value={formData.comment}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        comment: e.target.value,
                                    })
                                }
                            ></textarea>
                        </div>
                        <Button
                            disabled={loading}
                            className="w-full mt-6 h-12 bg-[#4F80E1] hover:bg-[#4F80E1] hover:text-white text-white"
                        >
                            {loading ? (
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
                                'Submit'
                            )}
                        </Button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default ReviewForm;
