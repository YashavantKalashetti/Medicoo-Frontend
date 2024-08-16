// src/hooks/useFetch.js

import { fetchWithInterceptors } from '@/Interceptors/FetchInterceptors';

export const useFetch = () => {
    const fetchData = async (url, options = {}) => {
        try {
            const data = await fetchWithInterceptors(url, options);
            return data;
        } catch (error) {
            // Handle error if needed
            throw error;
        }
    };

    return { fetchData };
};
