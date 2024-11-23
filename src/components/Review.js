// components/Review.js
import React, { useState } from 'react';
import axios from 'axios';

export const Review = ({ restaurantId }) => {
    const [reviews, setReviews] = useState([]);
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [newReview, setNewReview] = useState({
        rating: 5,
        content: ''
    });

    // 리뷰 목록 조회
    const fetchReviews = async () => {
        try {
            const response = await axios.get(`/api/restaurants/${restaurantId}/reviews`);
            setReviews(response.data.data);
        } catch (error) {
            console.error('리뷰 조회 실패:', error);
        }
    };

    // 리뷰 작성 처리
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`/api/restaurants/${restaurantId}/reviews`, newReview);
            setShowReviewForm(false);
            fetchReviews();
            setNewReview({ rating: 5, content: '' });
        } catch (error) {
            console.error('리뷰 작성 실패:', error);
        }
    };

    useEffect(() => {
        if (restaurantId) {
            fetchReviews();
        }
    }, [restaurantId]);

    return (
        <div className="mt-8">
            {/* 리뷰 제목과 작성 버튼 */}
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">리뷰</h3>
                <button
                    onClick={() => setShowReviewForm(true)}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    리뷰 작성
                </button>
            </div>

            {/* 리뷰 목록 */}
            <div className="space-y-4">
                {reviews.map((review) => (
                    <div key={review.id} className="p-4 border rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                            <div className="flex items-center">
                                <span className="text-yellow-400 mr-1">⭐</span>
                                <span className="font-medium">{review.rating.toFixed(1)}</span>
                            </div>
                            <span className="text-sm text-gray-500">
                                {new Date(review.createdAt).toLocaleDateString()}
                            </span>
                        </div>
                        <p className="text-gray-700">{review.content}</p>
                    </div>
                ))}
            </div>

            {/* 리뷰 작성 폼 */}
            {showReviewForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <h3 className="text-xl font-bold mb-4">리뷰 작성</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    평점
                                </label>
                                <input
                                    type="number"
                                    min="1"
                                    max="5"
                                    step="0.5"
                                    value={newReview.rating}
                                    onChange={(e) => setNewReview({...newReview, rating: parseFloat(e.target.value)})}
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    리뷰 내용
                                </label>
                                <textarea
                                    value={newReview.content}
                                    onChange={(e) => setNewReview({...newReview, content: e.target.value})}
                                    className="w-full p-2 border rounded"
                                    rows="4"
                                />
                            </div>
                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => setShowReviewForm(false)}
                                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                                >
                                    취소
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                >
                                    작성완료
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};