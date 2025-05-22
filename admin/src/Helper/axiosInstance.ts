import axios from 'axios'
import { toast } from 'sonner'

const BASE_URL = "http://localhost:8000/api/v1"
// const BASE_URL = "https://server.profilegenie.in/api/v1"

const axiosInstance = axios.create()

axiosInstance.defaults.baseURL = BASE_URL
axiosInstance.defaults.withCredentials = true


axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (
            error.response &&
            error.response.status === 401 &&
            error.response.data.message === "Invalid Access Token!"
        ) {

            try {
                const { data } = await axios.get(
                    `${BASE_URL}/auth/refresh-token`,
                    { withCredentials: true }
                );

                originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
                return axios(originalRequest);
            } catch (refreshError) {
                console.error("Error refreshing token:", refreshError);
                return Promise.reject(refreshError);
            }
        } else {
            toast.error(error.response.data.message)
        }
    }
);

export { axiosInstance }