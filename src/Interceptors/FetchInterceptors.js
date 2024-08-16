import { AuthContext } from '@/context/AuthContext';
// import * as fetchIntercept from 'fetch-intercept';
import { useContext } from 'react';
// import crypto  from 'crypto'


export const fetchWithInterceptors = async (url, options = {}) => {
    
    const user = JSON.parse(localStorage.getItem('user'));

    // console.log("user: ", user)


    const modifiedOptions = {
        ...options,
        headers: {
            ...options.headers,
            'Authorization': `Bearer ${user?.access_token}`,
            'Content-Type': 'application/json',
        }
    };

    try {
        const response = await fetch(url, modifiedOptions);
        
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data?.message || 'Failed to fetch data');
        }

        return data;

    } catch (error) {
        throw new Error(error.message);
    }
};