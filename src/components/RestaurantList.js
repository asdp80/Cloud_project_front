
import React, {useEffect, useState, useCallback} from 'react';
import {restaurantApi} from '../api/restaurant';
import {RestaurantCard} from './RestaurantCard';
import {RestaurantDetail} from './RestaurantDetail';
import {useNavigate} from 'react-router-dom';

export const RestaurantList = () => {
    const navigate = useNavigate();
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [location, setLocation] = useState('Seoul');
    const [type, setType] = useState('RESTAURANT');
    const [sortBy, setSortBy] = useState('id');
    const [selectedRestaurant, setSelectedRestaurant] = useState(null);  // 선택된 레스토랑 상태 추가

    // useCallback을 사용하여 레스토랑 데이터를 가져오는 함수 정의
    const fetchRestaurants = useCallback(async () => {
        try {
            setLoading(true);
            const response = await restaurantApi.searchRestaurants({
                location,
                type,
                page: 0,
                size: 10,
                sortBy
            });
            console.log('API 응답:', response);
            if (response.success) {
                setRestaurants(response.data.content);
                setError(null);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [location, type, sortBy]);

    useEffect(() => {
        fetchRestaurants();
    }, [fetchRestaurants]);

    // 가게 삭제 핸들러
    const handleDelete = async (id) => {
        try {
            const response = await restaurantApi.deleteRestaurant(id);
            if (response.success) {
                fetchRestaurants();
            }
        } catch (error) {
            console.error('Error deleting restaurant:', error);
            alert('삭제 중 오류가 발생했습니다.');
        }
    };

    // 리뷰 클릭 핸들러
     const handleCardClick = (restaurant) => {
        setSelectedRestaurant(restaurant);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            {/* 제목과 리뷰 추가 버튼 */}
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">김다인의 맛집 탐방</h1>
                <button
                    onClick={() => navigate('/restaurant/new')}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg"
                >
                    리뷰 추가하기
                </button>
            </div>

            {/* 필터링 옵션 */}
            <div className="flex gap-4 mb-6">
                <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="border p-2 rounded-md w-[180px]"
                >
                    <option value="Seoul">서울</option>
                    <option value="Gyeonggi">경기</option>
                </select>

                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border p-2 rounded-md w-[180px]"
                >
                    <option value="id">최신순</option>
                    <option value="rating">별점순</option>
                </select>
            </div>

            {/* 식당/카페 선택 버튼 */}
            <div className="mb-6">
                <div className="grid grid-cols-2 gap-2 border rounded-lg overflow-hidden">
                    <button
                        className={`py-2 px-4 ${
                            type === 'RESTAURANT'
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-100 hover:bg-gray-200'
                        }`}
                        onClick={() => setType('RESTAURANT')}
                    >
                        식당
                    </button>
                    <button
                        className={`py-2 px-4 ${
                            type === 'CAFE'
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-100 hover:bg-gray-200'
                        }`}
                        onClick={() => setType('CAFE')}
                    >
                        카페
                    </button>
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin">로딩중...</div>
                </div>
            ) : error ? (
                <div className="text-red-500 text-center py-8">
                    Error: {error}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {restaurants.map(restaurant => (
                        <RestaurantCard
                            key={restaurant.id}
                            restaurant={restaurant}
                            onDelete={handleDelete}
                            onClick={handleCardClick}  // 클릭 핸들러 추가
                        />
                    ))}
                </div>
            )}

            {/* 상세 정보 */}
            {selectedRestaurant && (
                <RestaurantDetail
                    restaurant={selectedRestaurant}
                    onClose={() => setSelectedRestaurant(null)}
                />
            )}
        </div>
    );
};