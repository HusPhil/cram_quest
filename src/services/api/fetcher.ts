// src/services/api/fetcher.ts
import { axiosInstance } from '../../lib/axios/axiosInstance';

// Fetcher function using axiosInstance
export async function fetcher(url: string) {
	try {
		const response = await axiosInstance.get(url);
		return response; // Return the response data
	} catch (error: any) {
		const errorMessage =
			error?.response?.data?.detail || 'Failed to fetch data';
		throw new Error(errorMessage);
	}
}
