import axios from "axios";

const BASE_URL = "http://localhost:8000/api/v1/wa/user";
// const BASE_URL = "https://profile-genie-2-0-server.onrender.com/api/v1";
// const BASE_URL = "https://server.profilegenie.in/api/v1/wa/user";

const axiosInstance = axios.create();

axiosInstance.defaults.baseURL = BASE_URL;
axiosInstance.defaults.withCredentials = true;

// axiosInstance.interceptors.response.use(
//     (response) => response,
//     async (error) => {
//         const originalRequest = error.config;

//         if (
//             error.response &&
//             error.response.status === 401 &&
//             error.response.data.message === "Invalid Access Token!"
//         ) {

//             try {
//                 const { data } = await axios.get(
//                     "http://localhost:8000/api/v1/auth/refresh-token",
//                     { withCredentials: true }
//                 );

//                 originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
//                 return axios(originalRequest);
//             } catch (refreshError) {
//                 console.error("Error refreshing token:", refreshError);
//                 return Promise.reject(refreshError);
//             }
//         }

//         // // Queue failed requests while refreshing
//         // return new Promise((resolve) => {
//         //     refreshSubscribers.push((newAccessToken) => {
//         //         originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
//         //         resolve(axios(originalRequest));
//         //     });
//         // });

//     }
// );

export { axiosInstance };
