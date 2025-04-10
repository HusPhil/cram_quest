// src/lib/axios/api.ts
import axios from "axios";
import { BASE_URL } from "../../data/api";

// Create and export an Axios instance with default settings
export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
