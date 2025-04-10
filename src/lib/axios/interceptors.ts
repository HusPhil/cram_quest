  // src/lib/axios/interceptors.ts

  import { refreshToken } from '../../services/api/crud/auth/refreshToken';
  import { axiosInstance } from './axiosInstance';
  import { setAuthHeader, updateAuthHeaderFromContext } from './token';

  // Add interceptors to handle token refresh on 401 errors
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      console.log(originalRequest);  

      // Retry request if 401 and we haven't retried yet
      if (error.response?.status === 401) {

        try {
          const newToken = await refreshToken(); // Refresh the token
          setAuthHeader(newToken);
          console.log('Got new token, retrying request..'); 

          return axiosInstance(originalRequest); // Retry the original request
        
        } catch (err) {
          console.error('Auto-refresh failed');
          return Promise.reject(err);
        }

      }

      return Promise.reject(error);
    }
  );
