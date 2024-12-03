import axios from "axios";
import Cookies from "js-cookie";
import { ACCESS_TOKEN,GOOGLE_ACCESS_TOKEN } from "./tokens";

const baseURL = process.env.NEXT_PUBLIC_API_URL;
const axiosClient = axios.create({
  baseURL: baseURL,
  withCredentials: true, 
});

axiosClient.interceptors.request.use(
  (config) => {
    const token = Cookies.get("ACCESS_TOKEN");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
     const googleAccessToken = Cookies.get("GOOGLE_ACCESS_TOKEN");
     if (googleAccessToken) {
       config.headers["X-Google-Access-Token"] = googleAccessToken;
     }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = Cookies.get("REFRESH_TOKEN");
        if (!refreshToken) throw new Error("No refresh token available");
        
        const response = await axios.post(`${baseURL}/api/users/refresh/`, {
          refresh: refreshToken,
        });

        const { access } = response.data;

        // Save the new access token
        Cookies.set("ACCESS_TOKEN", access);

        // Retry the failed request with the new token
        originalRequest.headers.Authorization = `Bearer ${access}`;
        return axiosClient(originalRequest);
      } catch (refreshError) {
        // Handle refresh failure (e.g., logout the user)
        Cookies.remove("ACCESS_TOKEN");
        Cookies.remove("REFRESH_TOKEN");
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
