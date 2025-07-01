// src/lib/axios/api.ts
import axios from 'axios';
import { BASE_URL } from '../../services/api/api';
import('./interceptors');

// Create and export an Axios instance with default settings
export const axiosInstance = axios.create({
	baseURL: BASE_URL,
	headers: {
		'Content-Type': 'application/json',
	},
});
