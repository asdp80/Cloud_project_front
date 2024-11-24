import React, { useState, useEffect, useCallback } from 'react';  // useCallback 추가
import axios from 'axios';

export const RestaurantDetail = ({ restaurant, onClose }) => {
    const [reviews, setReviews] = useState([]);
    const [showReviewForm, setShowReviewForm] = useState(false);

    //리뷰 가져오는 함수
    const fetchReviews = useCallback(async () => {
        if (!restaurant?.id) return;
        try {
            console.log('Fetching reviews for restaurant:', restaurant.id);
            const response = await axios.get(`/api/restaurants/${restaurant.id}/reviews`);
            console.log('Review fetch response:', response.data);

            if (response.data && response.data.success) {
                const reviewData = response.data.data;
                console.log('Setting reviews:', reviewData);
                setReviews(Array.isArray(reviewData) ? reviewData : []);
            }
        } catch (error) {
            console.error('리뷰 조회 실패:', error);
            setReviews([]);
        }
    }, [restaurant?.id]);

    // 단일 useEffect로 통합
    useEffect(() => {
        if (restaurant?.id) {
            fetchReviews();
        }
    }, [restaurant?.id, fetchReviews]);

    // 리뷰 작성 처리
    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = {
                comment: e.target.content.value,
                rating: parseInt(e.target.rating.value)
            };

            console.log('Submitting review:', formData);
            const response = await axios.post(
                `/api/restaurants/${restaurant.id}/reviews`,
                formData
            );
            console.log('Review submission response:', response.data);

            if (response.data && response.data.success) {
                await fetchReviews();
                setShowReviewForm(false);
            } else {
                throw new Error('리뷰 저장에 실패했습니다.');
            }
        } catch (error) {
            console.error('리뷰 작성 실패:', error);
            alert('리뷰 작성에 실패했습니다.');
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                {/* 헤더 */}
                <div className="flex justify-between items-center mb-4 pb-3 border-b">
                    <h2 className="text-2xl font-bold">{restaurant.name}</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        ✕
                    </button>
                </div>

                {/* 기본 정보 */}
                <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center">
                        <span className="text-lg text-gray-600">
                            {restaurant.location}
                            {restaurant.locationDetail && ` - ${restaurant.locationDetail}`}
                        </span>
                        <div className="flex items-center">
                            <span className="text-yellow-400 mr-1 text-xl">⭐</span>
                            <span className="text-lg font-medium">
                                {restaurant.rating ? restaurant.rating.toFixed(1) : 'N/A'}
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="px-3 py-1 text-sm font-medium text-gray-600 bg-gray-100 rounded-full">
                            {restaurant.type}
                        </span>
                    </div>
                </div>



                {/* 상세 정보 */}
                <div className="space-y-6">
                    {/* 상세 주소 */}
                    {restaurant.locationDetail && (
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">상세 주소</h3>
                            <p className="text-gray-600">{restaurant.locationDetail}</p>
                        </div>
                    )}

                    {/* 리뷰 섹션 */}
                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold text-gray-800">
                                리뷰 {reviews.length > 0 && `(${reviews.length})`}
                            </h3>
                            <button
                                onClick={() => setShowReviewForm(true)}
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            >
                                리뷰 작성
                            </button>
                        </div>

                        {/* 리뷰 목록 */}
                        <div className="space-y-4">
                            {reviews && reviews.length > 0 ? (
                                reviews.map((review) => (
                                    <div key={review.id} className="p-4 border rounded-lg">
                                        <div className="flex justify-between items-center mb-2">
                                            <div className="flex items-center">
                                                <span className="text-yellow-400 mr-1">⭐</span>
                                                <span className="font-medium">
                        {review.rating}
                    </span>
                                            </div>
                                        </div>
                                        <p className="text-gray-700">{review.comment}</p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-center text-gray-500">아직 작성된 리뷰가 없습니다.</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* 리뷰 작성 */}
                {showReviewForm && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg p-6 w-full max-w-md">
                            <h3 className="text-xl font-bold mb-4">리뷰 작성</h3>
                            <form onSubmit={handleReviewSubmit}>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        평점
                                    </label>
                                    <input
                                        type="number"
                                        name="rating"
                                        min="1"
                                        max="5"
                                        step="0.5"
                                        defaultValue="5"
                                        className="w-full p-2 border rounded"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        리뷰 내용
                                    </label>
                                    <textarea
                                        name="content"
                                        className="w-full p-2 border rounded"
                                        rows="4"
                                        required
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
        </div>
    );
};