// src/lib/axios/api.ts
import axios from 'axios';
import { BASE_URL } from '../../services/api/api';
import('./interceptors');

// Create and export an Axios instance with default settings
export const axiosInstance = axios.create({
	baseURL: BASE_URL,
	timeout: 15000, // Prevent requests from hanging indefinitely (e.g. offline)
	headers: {
		'Content-Type': 'application/json',
	},
});
