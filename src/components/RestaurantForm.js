// src/components/RestaurantForm.js
import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import { restaurantApi } from '../api/restaurant';

export const RestaurantForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        location: 'Seoul',
        locationDetail: '',
        type: '',
        rating: ''
    });

    // RestaurantForm.js의 handleSubmit 수정
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await restaurantApi.addRestaurant({
                name: formData.name,
                location: formData.location,
                type: formData.type,
                locationDetail: formData.locationDetail,
                rating: parseFloat(formData.rating) || 0
            });

            if (response.success) {
                navigate('/');
                window.location.reload();
            } else {
                alert('레스토랑 추가에 실패했습니다.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('레스토랑 추가 중 오류가 발생했습니다.');
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            <h1 className="text-3xl font-bold mb-8">Add New Restaurant</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Restaurant Name
                    </label>
                    <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full p-2 border rounded-md"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Location
                    </label>
                    <select
                        value={formData.location}
                        onChange={(e) => setFormData({...formData, location: e.target.value})}
                        className="w-full p-2 border rounded-md"
                    >
                        <option value="서울">서울</option>
                        <option value="경기">경기</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        상세 주소
                    </label>
                    <input
                        type="text"
                        value={formData.locationDetail}
                        onChange={(e) => setFormData({...formData, locationDetail: e.target.value})}
                        className="w-full p-2 border rounded-md"
                        placeholder="예: 강남구 역삼동"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Type
                    </label>
                    <select
                        required
                        value={formData.type}
                        onChange={(e) => setFormData({...formData, type: e.target.value})}
                        className="w-full p-2 border rounded-md"
                    >
                        <option value="">Select Type</option>
                        <option value="Restaurant">Restaurant</option>
                        <option value="Cafe">Cafe</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Rating
                    </label>
                    <input
                        type="number"
                        min="0"
                        max="5"
                        step="0.1"
                        value={formData.rating}
                        onChange={(e) => setFormData({...formData, rating: e.target.value})}
                        className="w-full p-2 border rounded-md"
                    />
                </div>

                <div className="flex gap-4">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg"
                    >
                        Add Restaurant
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate('/')}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-lg"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};