// src/components/DataComponent.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DataComponent = () => {
    const [data, setData] = useState([]);  // 상태를 저장할 변수

    useEffect(() => {
        // Spring Boot API 호출
        axios.get('http://localhost:8080/api/data')  // API 경로
            .then(response => {
                setData(response.data);  // API로부터 받은 데이터를 상태에 저장
            })
            .catch(error => {
                console.error('API 호출 에러:', error);  // 에러 처리
            });
    }, []);  // 컴포넌트가 마운트될 때 한 번만 호출

    return (
        <div>
            <h1>API로 받은 데이터</h1>
            <ul>
                {data.map((item, index) => (
                    <li key={index}>{item}</li>  // 데이터 목록을 화면에 출력
                ))}
            </ul>
        </div>
    );
};

export default DataComponent;
