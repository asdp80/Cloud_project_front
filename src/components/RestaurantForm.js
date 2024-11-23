import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {restaurantApi} from '../api/restaurant';

//식당 정보 입력받음
export const RestaurantForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        location: 'Seoul',
        locationDetail: '',
        type: '',
        rating: '',
        comment: ''

    });


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await restaurantApi.addRestaurant({
                name: formData.name,
                location: formData.location,
                type: formData.type,
                locationDetail: formData.locationDetail,
                rating: parseFloat(formData.rating) || 0,
                comment : formData.comment
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

        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">리뷰 작성</h1>
                    <p className="mt-2 text-gray-600">새로운 맛집/카페를 등록해주세요</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            가게 이름
                            <span className="text-red-500 ml-1">*</span>
                        </label>
                        <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                            placeholder="가게 이름을 입력하세요"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            장소
                        </label>
                        <select
                            value={formData.location}
                            onChange={(e) => setFormData({...formData, location: e.target.value})}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 bg-white"
                        >
                            <option value="Seoul">서울</option>
                            <option value="Gyeonggi">경기</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            상세 주소
                        </label>
                        <input
                            type="text"
                            value={formData.locationDetail}
                            onChange={(e) => setFormData({...formData, locationDetail: e.target.value})}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                            placeholder="예: 경기도 구리시"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            식당 / 카페
                            <span className="text-red-500 ml-1">*</span>
                        </label>
                        <select
                            required
                            value={formData.type}
                            onChange={(e) => setFormData({...formData, type: e.target.value})}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 bg-white"
                        >
                            <option value="">음식점 종류를 선택하세요</option>
                            <option value="Restaurant">식당</option>
                            <option value="Cafe">카페</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            별점
                        </label>
                        <div className="flex items-center space-x-2">
                            <input
                                type="number"
                                min="0"
                                max="5"
                                step="0.1"
                                value={formData.rating}
                                onChange={(e) => setFormData({...formData, rating: e.target.value})}
                                className="w-24 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                            />

                            <span className="text-sm text-gray-500">/ 5.0</span>

                        </div>

                    </div>

                    <div className="flex justify-end space-x-4 pt-6">
                        <button
                            type="button"
                            onClick={() => navigate('/')}
                            className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition duration-200"
                        >
                            취소하기
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition duration-200"
                        >
                            리뷰 작성
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RestaurantForm;