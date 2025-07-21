// src/lib/axios/interceptors.ts
import { axiosInstance } from './axiosInstance';
import { refreshSession, setAuthHeader } from './token';

// Add interceptors to handle token refresh on 401 errors
let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
	failedQueue.forEach((prom) => {
		if (token) {
			prom.resolve(token);
		} else {
			prom.reject(error);
		}
	});
	failedQueue = [];
};

axiosInstance.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;
		// Skip refresh for refresh endpoint itself or non-401s
		if (error.response?.status !== 401 || originalRequest._retry) {
			return Promise.reject(error);
		}
		console.error('error: ', error);
		originalRequest._retry = true;

		if (isRefreshing) {
			// Wait for the refresh to complete if already in progress
			return new Promise((resolve, reject) => {
				failedQueue.push({
					resolve: (token: string) => {
						originalRequest.headers.Authorization = `Bearer ${token}`;
						resolve(axiosInstance(originalRequest));
					},
					reject: (err: any) => reject(err),
				});
			});
		}

		isRefreshing = true;

		try {
			const { access_token: newToken } = await refreshSession();

			setAuthHeader(newToken); // update axiosInstance default
			originalRequest.headers.Authorization = `Bearer ${newToken}`; // update the retry request

			processQueue(null, newToken);
			return axiosInstance(originalRequest); // retry with new token
		} catch (refreshError) {
			const error = refreshError as Error;

			if (error.message.toLowerCase().includes('session expired')) {
				window.location.href = 'cramquest/auth/'; // or your login route
				return;
			}

			processQueue(refreshError, null);
			return Promise.reject(refreshError);
		} finally {
			isRefreshing = false;
		}
	}
);
