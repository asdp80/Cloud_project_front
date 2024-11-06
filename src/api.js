import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL || "http://localhost:8080", // 로컬 환경
});

export const fetchData = async () => {
    try {
        const response = await api.get("/api/data");
        return response.data;
    } catch (error) {
        console.error("API 호출 오류", error);
    }
};
