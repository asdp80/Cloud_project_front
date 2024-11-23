// import React, {useEffect, useState, useCallback} from 'react';
// import {restaurantApi} from '../api/restaurant';
// import {RestaurantCard} from './RestaurantCard';
// import {useNavigate} from 'react-router-dom';
//
// export const RestaurantList = () => {
//     const navigate = useNavigate();
//     const [restaurants, setRestaurants] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [location, setLocation] = useState('Seoul');
//     const [type, setType] = useState('RESTAURANT');
//     const [sortBy, setSortBy] = useState('id');
//
//     const fetchRestaurants = useCallback(async () => {
//         try {
//             setLoading(true);
//             const response = await restaurantApi.searchRestaurants({
//                 location,
//                 type,
//                 page: 0,
//                 size: 10,
//                 sortBy
//             });
//             console.log('API Response:', response);
//             console.log('Restaurants data:', response.data.content);
//             console.log('API 응답:', response);
//             if (response.success) {
//                 setRestaurants(response.data.content);
//                 setError(null);
//             }
//         } catch (err) {
//             setError(err.message);
//         } finally {
//             setLoading(false);
//         }
//     }, [location, type, sortBy]);
//
//     // useEffect 수정
//     useEffect(() => {
//         fetchRestaurants();
//     }, [fetchRestaurants]);
//
//     // 데이터 로깅을 위한 별도의 useEffect
//     useEffect(() => {
//         console.log('현재 restaurants 데이터:', restaurants);
//     }, [restaurants]);
//
//     const handleCardClick = (restaurant) => {
//         setSelectedRestaurant(restaurant);
//     };
//
//     return (
//         <div className="container mx-auto px-4 py-8">
//             {/* 기존 내용 */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {restaurants.map(restaurant => (
//                     <RestaurantCard
//                         key={restaurant.id}
//                         restaurant={restaurant}
//                         onDelete={handleDelete}
//                         onClick={handleCardClick}
//                     />
//                 ))}
//             </div>
//
//             {/* 상세 정보 모달 */}
//             {selectedRestaurant && (
//                 <RestaurantDetail
//                     restaurant={selectedRestaurant}
//                     onClose={() => setSelectedRestaurant(null)}
//                 />
//             )}
//         </div>
//     );
//
//     const handleDelete = async (id) => {
//         try {
//             const response = await restaurantApi.deleteRestaurant(id);
//             if (response.success) {
//                 fetchRestaurants();  // 삭제 후 목록 새로고침
//             }
//         } catch (error) {
//             console.error('Error deleting restaurant:', error);
//             alert('삭제 중 오류가 발생했습니다.');
//         }
//     };
//
//     return (
//         <div className="container mx-auto px-4 py-8">
//             <div className="flex justify-between items-center mb-8">
//                 <h1 className="text-3xl font-bold">OOO의 맛집 탐방</h1>
//                 <button
//                     onClick={() => navigate('/restaurant/new')}
//                     className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg"
//                 >
//                     리뷰 추가하기
//                 </button>
//             </div>
//
//             <div className="flex gap-4 mb-6">
//                 <select
//                     value={location}
//                     onChange={(e) => setLocation(e.target.value)}
//                     className="border p-2 rounded-md w-[180px]"
//                 >
//                     <option value="Seoul">서울</option>
//                     <option value="Gyeonggi">경기</option>
//                 </select>
//
//                 <select
//                     value={sortBy}
//                     onChange={(e) => setSortBy(e.target.value)}
//                     className="border p-2 rounded-md w-[180px]"
//                 >
//                     <option value="id">최신순</option>
//                     <option value="rating">별점순</option>
//                 </select>
//             </div>
//
//             <div className="mb-6">
//                 <div className="grid grid-cols-2 gap-2 border rounded-lg overflow-hidden">
//                     <button
//                         className={`py-2 px-4 ${
//                             type === 'RESTAURANT'
//                                 ? 'bg-blue-500 text-white'
//                                 : 'bg-gray-100 hover:bg-gray-200'
//                         }`}
//                         onClick={() => setType('RESTAURANT')}
//                     >
//                         식당
//                     </button>
//                     <button
//                         className={`py-2 px-4 ${
//                             type === 'CAFE'
//                                 ? 'bg-blue-500 text-white'
//                                 : 'bg-gray-100 hover:bg-gray-200'
//                         }`}
//                         onClick={() => setType('CAFE')}
//                     >
//                         카페
//                     </button>
//                 </div>
//             </div>
//
//             {loading ? (
//                 <div className="flex justify-center items-center h-64">
//                     <div className="animate-spin">로딩중...</div>
//                 </div>
//             ) : error ? (
//                 <div className="text-red-500 text-center py-8">
//                     Error: {error}
//                 </div>
//             ) : (
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                     {restaurants.map(restaurant => (
//                         <RestaurantCard
//                             key={restaurant.id}
//                             restaurant={restaurant}
//                             onDelete={handleDelete}
//                         />
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// };

import React, {useEffect, useState, useCallback} from 'react';
import {restaurantApi} from '../api/restaurant';
import {RestaurantCard} from './RestaurantCard';
import {RestaurantDetail} from './RestaurantDetail';  // RestaurantDetail import 추가
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

    // 카드 클릭 핸들러 추가
    const handleCardClick = (restaurant) => {
        console.log('선택된 레스토랑 데이터:', restaurant); // 데이터 확인
        setSelectedRestaurant(restaurant);
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

            {/* 상세 정보 모달 */}
            {selectedRestaurant && (
                <RestaurantDetail
                    restaurant={selectedRestaurant}
                    onClose={() => setSelectedRestaurant(null)}
                />
            )}
        </div>
    );
};