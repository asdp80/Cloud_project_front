
import axios from 'axios';

const API_BASE_URL = '/api';

//식당 검색
export const restaurantApi = {
    searchRestaurants: async ({ location, type, page = 0, size = 10, sortBy = "id", sortDir = 'DESC' }) => {
        const response = await axios.get(`${API_BASE_URL}/restaurants/search`, {
            params: { location, type, page, size, sortBy }
        });
        return response.data;
    },
//식당 추가
    addRestaurant: async (restaurantData) => {
        const response = await axios.post(`${API_BASE_URL}/restaurants`, restaurantData);
        return response.data;
    },
//식당 삭제
    deleteRestaurant: async (id) => {
        try {
            const response = await axios.delete(`${API_BASE_URL}/restaurants/${id}`);
            return response.data;
        } catch (error) {
            console.error('Delete error:', error);
            throw error;
        }
    },

};