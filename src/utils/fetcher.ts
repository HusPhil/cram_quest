    import axios from 'axios';
import { BASE_URL } from '../data/api';

    // You can get your token from your app's state, localStorage, or context
    export const getAuthToken = () => {
        // Example: retrieve the auth token from localStorage or any other secure source
        return localStorage.getItem('auth_token'); // Replace this with your actual logic
    };

    // Create an Axios instance with default settings (optional)
    const axiosInstance = axios.create({
        baseURL: BASE_URL, // Base URL can be added here or use the one passed in the request
        headers: {
            'Content-Type': 'application/json',
        },
    });


    // Axios fetcher with auth token handling
    export const fetcher = async (url: string) => {
        const token = getAuthToken(); // Get the auth token
        
        try {
            const response = await axiosInstance.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
                }
            });

            console.log(url)

            return response.data;
        } catch (error: any) {
            console.error('Error fetching data:', error);

            const errorMessage = error?.response?.data?.detail || 'Failed to fetch data';

            throw new Error(errorMessage);
        }
    };

    export default fetcher;
