import { toast } from "sonner";
import { axiosInstance } from "./axiosInstance";

const axiosBaseQuery = async <T extends { url: string; method: string; data: any }>(params: T) => {
    try {
        const response = await axiosInstance({
            url: params.url,
            method: params.method,
            data: params.data,
        });
        if (response?.data?.message) {
            toast.success(response?.data?.message);
        }
        return { data: response?.data };
    } catch (error: any) {
        toast.error(error.response.data.message)
        return {
            error: {
                status: error.response?.status,
                message: error.response?.data?.message || error.message,
            },
        };
    }
};

export default axiosBaseQuery