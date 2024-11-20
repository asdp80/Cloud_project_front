import React, {useEffect, useState} from 'react';
import {restaurantApi} from '../api/restaurant';
import {RestaurantCard} from './RestaurantCard';
import {useNavigate} from 'react-router-dom';
import {useCallback} from 'react';

// RestaurantList.js의 순서를 수정
export const RestaurantList = () => {
    const navigate = useNavigate();
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [location, setLocation] = useState('Seoul');
    const [type, setType] = useState('');

    const fetchRestaurants = useCallback(async () => {
        try {
            setLoading(true);
            const response = await restaurantApi.searchRestaurants({
                location,
                type,
                page: 0,
                size: 10,
                sortBy: "id"
            });
            console.log('API 응답:', response); // 디버깅용 로그 추가
            if (response.success) {
                setRestaurants(response.data.content);
                setError(null);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [location, type]);

    useEffect(() => {
        fetchRestaurants();
    }, [fetchRestaurants]);

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
    return (
        <div className="container mx-auto px-4 py-8">

            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">OOO의 맛집 탐방</h1>
                <button
                    onClick={() => navigate('/restaurant/new')}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg"
                >
                    리뷰 추가하기
                </button>
            </div>

            <div className="flex gap-4 mb-6">
                <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="border p-2 rounded-md w-[180px]"
                >
                    <option value="Seoul">Seoul</option>
                    <option value="Busan">Busan</option>
                    <option value="Incheon">Incheon</option>
                </select>

                <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="border p-2 rounded-md w-[180px]"
                >
                    <option value="">All Types</option>
                    <option value="Korean">Korean</option>
                    <option value="Japanese">Japanese</option>
                    <option value="Chinese">Chinese</option>
                </select>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin">Loading...</div>
                </div>
            ) : error ? (
                <div className="text-red-500 text-center py-8">
                    Error: {error}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {restaurants.map(restaurant => (
                        <RestaurantCard key={restaurant.id} restaurant={restaurant}  onDelete={handleDelete}/>
                    ))}
                </div>
            )}
        </div>
    );
};