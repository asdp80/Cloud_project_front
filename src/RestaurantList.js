import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RestaurantList = () => {
    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/restaurants')  // 백엔드에서 식당 데이터 가져오기
            .then(response => setRestaurants(response.data))
            .catch(error => console.error("식당 데이터 로딩 오류:", error));
    }, []);

    return (
        <div>
            <h1>식당 목록</h1>
            <ul>
                {restaurants.map((restaurant) => (
                    <li key={restaurant.id}>
                        <h2>{restaurant.name}</h2>
                        <p>위치: {restaurant.location}</p>
                        <p>종류: {restaurant.type}</p>
                        <button onClick={() => alert(`식당 ID: ${restaurant.id}`)}>리뷰 보기</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RestaurantList;
