
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

export const restaurantApi = {
    searchRestaurants: async ({ location, type, page = 0, size = 10, sortBy = "id" }) => {
        const response = await axios.get(`${API_BASE_URL}/restaurants/search`, {
            params: { location, type, page, size, sortBy }
        });
        return response.data;
    },

    addRestaurant: async (restaurantData) => {
        const response = await axios.post(`${API_BASE_URL}/restaurants`, restaurantData);
        return response.data;
    },

    deleteRestaurant: async (id) => {
        try {
            const response = await axios.delete(`${API_BASE_URL}/restaurants/${id}`);
            return response.data;
        } catch (error) {
            console.error('Delete error:', error);
            throw error;
        }
    },

    getTopRestaurants: async (location) => {
        const response = await axios.get(`${API_BASE_URL}/restaurants/top/${location}`);
        return response.data;
    }
};