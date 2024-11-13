import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(true);  // 로딩 상태 추가
    const [error, setError] = useState(null);  // 오류 상태 추가
    const location = 'Seoul';  // location을 'Seoul'로 설정

    useEffect(() => {
        console.log("useEffect 호출됨");  // useEffect 호출 여부 확인
        axios.get(`http://localhost:8080/api/restaurants?location=${location}`)
            .then(response => {
                console.log("응답 데이터:", response.data);  // 데이터 출력 확인
                setRestaurants(response.data);
                setLoading(false);  // 데이터 로딩 완료
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setError(error);  // 오류 처리
                setLoading(false);  // 로딩 종료
            });
    }, [location]);

    if (loading) {
        return <div>Loading...</div>;  // 로딩 중일 때 메시지 표시
    }

    if (error) {
        return <div>Error: {error.message}</div>;  // 오류 발생 시 메시지 표시
    }

    return (
        <div>
            <h1>Top 5 Restaurants in {location}</h1>
            {/* restaurants 배열이 비었을 때 메시지 표시 */}
            {restaurants.length === 0 ? (
                <p>No restaurants found.</p>  // 데이터가 없을 때 표시되는 메시지
            ) : (
                <ul>
                    {restaurants.map(restaurant => (
                        <li key={restaurant.id}>
                            <h2>{restaurant.name}</h2>
                            <p>Location: {restaurant.location}</p>
                            <p>Type: {restaurant.type}</p>
                            <p>Rating: {restaurant.rating || 'No rating available'}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default App;
