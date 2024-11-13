// src/components/DataComponent.jsx
import React, { useEffect, useState } from 'react';
import { dataApi } from '../api/data';

const DataComponent = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        dataApi.getData()
            .then(response => {
                console.log("API 응답 데이터:", response.data);
                setData(response.data);  // .data 중첩 제거
            })
            .catch(error => {
                console.error('API 호출 에러:', error);
            });
    }, []);

    return (
        <div>
            <h1>API로 받은 데이터</h1>
            <ul>
                {Array.isArray(data) && data.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </div>
    );
};

export default DataComponent;
